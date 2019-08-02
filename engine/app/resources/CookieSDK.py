import sqlalchemy.orm
import logging
import os
import string
import random
from app.models import User, Cart, Cookie
from app.components.database import DataBase
from app.components.config import Config


logging.basicConfig(level=logging.DEBUG)

db = DataBase()
conf = Config()


def set_cookie(response, uid):

    session = db.session
    new_token = random_string_generator()

    user = session.query(User)\
        .filter(User.uid == uid)\
        .one()

    user.current_token = str(new_token)
    try:
        update_old_token = session.query(Cookie)\
            .filter(Cookie.uid == uid, Cookie.active == True)\
            .one()
        update_old_token.active = False
        session.add(update_old_token)
        session.commit()

    except: pass

    token_params = Cookie(
        uid=uid,
        hash_token=str(new_token),
        active=True
    )

    session.add(token_params)
    session.add(user)
    session.commit()

    response.set_cookie('cookie', new_token, max_age=800, path='/')

    session.close()

    return 'success'


def set_cookie_anon(response):

    session = db.session
    new_token = random_string_generator()

    token_params = Cookie(
        anon_id=str(new_token),
        hash_token=str(new_token),
        active=True
    )

    session.add(token_params)
    session.commit()

    response.set_cookie('anon_cookie', new_token, max_age=800, path='/')

    session.close()

    return new_token


def get_cookie(request):

    session = db.session

    token = request.cookies

    logging.debug('cookies = ' + str(token))

    logging.debug(token)

    try:
        cookie = token['cookie']
    except:
        logging.debug('no cookies =(')
        return None

    try:
        ticket = session.query(Cookie)\
            .filter(Cookie.hash_token == cookie)\
            .one()
    except:
        return False

    if ticket.active is True:

        user = session.query(User)\
            .filter(User.uid == ticket.uid)\
            .one()

        session.close()

        return user
    else:
        return False


def get_cookie_anon(request):

    session = db.session

    token = request.cookies

    logging.debug('anon_cookies = ' + str(token))

    logging.debug(token)

    try:
        cookie = token['anon_cookie']
    except:
        logging.debug('no cookies =(')
        return None

    try:
        ticket = session.query(Cookie)\
            .filter(Cookie.hash_token == cookie)\
            .one()
    except:
        return False

    if ticket.active is True:

        cart = session.query(Cart)\
            .filter(Cart.anon_id == ticket.anon_id)\
            .one()

        session.close()

        return cart
    else:
        return False


def eat_cookie(response):

    response.set_cookie('cookie', 'None', max_age=800, path='/')


def eat_cookie_anon(response):

    response.set_cookie('anon_cookie', 'None', max_age=800, path='/')

def random_string_generator(stringLength=10):
    """Generate a random string of letters, digits and special characters """
    password_characters = string.ascii_letters + string.digits
    return ''.join(random.choice(password_characters) for i in range(stringLength))
