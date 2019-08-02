import hug
import sys
from datetime import datetime
import json
import falcon
import os
import collections
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Sets path for import to the app dir
sys.path.insert(0, '../')

from app.resources.CookieSDK import get_cookie, set_cookie, random_string_generator, eat_cookie
from app.components.config import Config
from app.components.database import DataBase
from app.resources.BigCommerceSDK import BigCommerce
from app.models import User, Cart, Cookie
import sendgrid
from app.resources.SendGridSDK import send_sg_email

bc = BigCommerce()

db = DataBase()
config = Config()


@hug.get('/test')
def test(response, cors: hug.directives.cors="*"):

    return {"Result": {
        "code": "409",
        "Response": 'test success'}
    }


# registers user with our DB and assigns them a big_Commerce ID
@hug.post('/register')
def register(response, body, cors: hug.directives.cors="*"):

    session = db.session

    data = body
    # interesting thing, if this passes, we give a 409, otherwise we continue creating account, change needed
    try:
        user = session.query(User) \
            .filter(User.email == str(data['email'])) \
            .one()

        response.status = falcon.HTTP_409
        return {"Result": {
            "code": "409",
            "Response": str(user.email) + ' already exists'}
        }

    except:
        pass

    password_hash = generate_password_hash(str(data['password']))

    email = data['email']
    first_name = data['first_name']
    last_name = data['last_name']
    phone = data['phone']

    new_user = User(
        email=email,
        password_hash=str(password_hash),
        first_name=first_name,
        last_name=last_name,
        phone=phone
    )
    try:

        session.add(new_user)
        session.commit()
    except:
        session.rollback()

        response.status = falcon.HTTP_500
        return {"Result": {
            "code": "500",
            "Response": "Internal Sever Error"}
               }
    try:
        user = session.query(User) \
            .filter(User.email == str(data['email'])) \
            .one()
    except:
        response.status = falcon.HTTP_500
        return {"Result": {
            "code": "500",
            "Response": "Internal Sever Error, user not created"}
        }

    try:
        resp = bc.create_user(user)
        resp = resp.json().get('id')
    except:
        response.status = falcon.HTTP_500
        return {"Result": {
            "code": "500",
            "Response": "Internal Sever Error, BigCommerce failed, email may already exist"}
           }

    set_cookie(response, user.uid)

    user.bc_id = resp

    session.add(user)
    session.commit()
    session.close()

    return {"Result": {
        "code": "200",
        "bc_response": resp}
           }


# checks user's credentials and signs in user (cookies assigned)
@hug.post('/login')
def get_peep(response, body, cors: hug.directives.cors="*"):
    session = db.session

    data = body

    try:
        user = session.query(User) \
            .filter(User.email == str(data['email'])) \
            .one()
    except:
        response.status = falcon.HTTP_404
        return {"Result": {
            "code": "404",
            "Response": "No User Found"}
               }

    if check_password_hash(user.password_hash, str(data['password'])):
        set_cookie(response, user.uid)

        return {"Result": {
            "code": "200",
            "Response": "Logged In"}
               }
    else:
        response.status = falcon.HTTP_401
        return {"Result": {
            "code": "401",
            "Response": "Password Invalid"}
               }


@hug.get('/user_info')
def user_info(request, response, cors: hug.directives.cors="*"):

    user = get_cookie(request)

    if user is not None:

        response = {
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "address1": user.address1,
            "address2": user.address2,
            "phone": user.phone,
            "city": user.city,
            "state_or_province": user.state_or_province,
            "state_or_province_code": user.state_or_province_code,
            "postal_code": user.postal_code
        }

        return {"Result": {
            "code": "200",
            "Response": response}
            }
    else:
        response.status = falcon.HTTP_401
        return {"Result": {
            "code": "401",
            "Response": "unauthorized"}
            }


# NEEDS all user params, use get user to keep them the same
@hug.put('/update_user_info')
def update_user(request, response, body, cors: hug.directives.cors="*"):

    user = get_cookie(request)

    data = body

    if user is not None:

        session = db.session

        user.email = data['email']
        try:
            user.password = generate_password_hash(data['password'])
        except:
            pass
        user.first_name = data['first_name']
        user.last_name = data['last_name']
        user.address1 = data['address1']
        user.address2 = data['address2']
        user.phone = data['phone']
        user.state_or_province = data['state_or_province']
        user.state_or_province_code = data['state_or_province']
        user.city = data['city']
        user.postal_code = data['postal_code']

        session.add(user)
        session.commit()

        return {"Result": {
            "code": "200",
            "Response": "info has been updated"}
            }

    else:
        response.status = falcon.HTTP_401
        return {"Result": {
            "code": "401",
            "Response": "unauthorized"}
            }


# checks user's credentials and signs in user (cookies assigned)
@hug.post('/forgot_password')
def forgot_password(response, body, cors: hug.directives.cors="*"):

    session = db.session

    data = body

    user = session.query(User) \
        .filter(User.email == str(data['email'])) \
        .one()

    one_time_pass = random_string_generator()

    user.one_time_password = generate_password_hash(one_time_pass)

    msg = """
            Someone has requested to reset the password for your {0} account.
            If you made this request, you have one day to login with the following one-time use link and update your account information:
            {1}{2}/user/onetime-login

            use code: {3}

            After clicking the above link one time, it will no longer be valid, so make sure to update your password or you will need to reset it again!
            If you did not make this request, you may disregard this message.
            """.format(config.domain, 'https://', config.domain, one_time_pass)

    send_sg_email(user.email, config.domain, 'onetime login', msg)

    session.add(user)
    session.commit()

    return {"Result": {
            "code": "200",
            "Response": "email has been sent"}
            }


@hug.post('/onetime-login')
def one_time_login(response, body, cors: hug.directives.cors="*"):

    data = body
    session = db.session

    try:
        user = session.query(User) \
            .filter(User.email == str(data['email'])) \
            .one()
    except:
        response.status = falcon.HTTP_404
        return {"Result": {
            "code": "404",
            "Response": "email not found"}
        }

    if check_password_hash(user.one_time_password, str(data['password'])):

        user.one_time_password = ''

        session.add(user)
        session.commit()

        set_cookie(response, user.uid)

        return {"Result": {
            "code": "200",
            "Response": "Logged In"}
        }
    else:
        response.status = falcon.HTTP_401
        return {"Result": {
            "code": "401",
            "Response": "Password Invalid"}
        }


# checks to see if user is logged in and returns first name
@hug.get('/dashboard')
def dashboard(response, request, cors: hug.directives.cors="*"):

    logged_in = get_cookie(request)

    try:
        name = logged_in.first_name
    except:
        logged_in = None
        name = None

    if logged_in:
        return {"Result": {
            "code": "200",
            "Response": "hello {}".format(name)}
               }
    else:
        response.status = falcon.HTTP_401
        return {"Result": {
            "code": "401",
            "Response": "Unauthorized"}
               }


# takes cookie away from user and logs them out
@hug.get('/logout')
def call_logout(response, cors: hug.directives.cors="*"):

    eat_cookie(response)

    return {"Result": {
            "code": "200",
            "Response": "You Have Logged Out"}
            }


# gets info on specific user when given an email
@hug.get('/get_peep')
def get_peep(response, body, cors: hug.directives.cors="*"):

    session = db.session
    data = body

    try:
        user = session.query(User) \
            .filter(User.email == data['email']) \
            .one()
    except:
        response.status = falcon.HTTP_404
        return {"Result": {
            "code": "404",
            "Response": "No User Found"}
               }

    session.close()
    return {"Result": {
        "code": "200",
        "Response": "This user's BigCommerce ID: " + user.bc_id}
    }
