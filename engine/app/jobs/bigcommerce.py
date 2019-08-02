import hug
import sys
from datetime import datetime
from app.resources.BigCommerceSDK import BigCommerce
import json
import falcon
import os
import collections
import logging
import difflib
import urllib.parse
from pprint import pprint


from app.models import User, Cart, Cookie, Order
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.resources.CookieSDK import get_cookie, set_cookie, get_cookie_anon, set_cookie_anon, eat_cookie_anon
from app.components.database import DataBase


db = DataBase()

BC = BigCommerce()

#'/cart/bigcommerce/products/{id}'
# get ->  gets products, all
# get -> with id, there returns a single product


# retrieves current user's cart
@hug.get('/cart')
def get_user_cart(request, response, cors: hug.directives.cors="*"):

    '''retrieves current user cart'''

    user = get_cookie(request)

    if user is not None:

        if user.cart_id is not None:
            cart = BC.get_cart(user.cart_id)
            cart = cart.json()

        else:
            response.status = falcon.HTTP_404
            return {"Result": {
                "code": "404",
                "Response": "User Has No Cart"}
                   }

        return {"Result": {
            "code": "200",
            "Response": cart}
               }

    else:

        cart = get_cookie_anon(request)

        if cart:
            cart = BC.get_cart(cart.bc_id)
            cart = cart.json()

        else:
            response.status = falcon.HTTP_404
            return {"Result": {
                "code": "404",
                "Response": "User Has No Cart"}
                   }

        return {"Result": {
            "code": "200",
            "Response": cart}
               }


# TODO make this into / root
#    get -> returns the current cart
#    get -> with
# creates a cart for the user if none exists, otherwise adds items to cart
@hug.post('/cart')
def add_item(request, response, pid:int=None, quantity:int=None, options:str=None, cors: hug.directives.cors="*"):

    '''adds itme to current user cart, if no cart exists, creates one'''

    user = get_cookie(request)

    session = db.session

    if user:

        if user.cart_id is not None:

            if options:
                variant_id = BC.get_variant_id(pid, option_ids=urllib.parse.unquote(options).split(','))
                item = BC.add_product(pid, quantity, user.cart_id, variant_id)

            else:
                item = BC.add_product(pid, quantity, user.cart_id)

            item = item.json()

            return {"Result": {
                "code": "200",
                "Response": item}
            }

            stat = 'old_cart'
            logging.debug(stat)

        else:

            if options:
                variant_id = BC.get_variant_id(pid, option_ids=urllib.parse.unquote(options).split(','))
                cart_id = BC.create_cart(quantity, pid, variant_id)

            else:
                cart_id = BC.create_cart(quantity, pid)

            cart_id = cart_id.json().get('data').get('id')

            BC.add_cart_user(int(user.bc_id), cart_id)

            new_cart = Cart(
                uid=user.uid,
                active=True,
                bc_id=cart_id
            )

            user.cart_id = cart_id

            stat = 'new_cart'
            logging.debug(stat)

            session.add(user)
            session.add(new_cart)
            session.commit()
            session.close()

        return { "Result": {
            "code": "200",
            "Response": "Cart started"}
               }

    else:

        cart = get_cookie_anon(request)

        if cart:

            if options:
                variant_id = BC.get_variant_id(pid, option_ids=urllib.parse.unquote(options).split(','))
                item = BC.add_product(pid, quantity, cart.bc_id, variant_id)

            else:
                item = BC.add_product(pid, quantity, cart.bc_id)

            item = item.json()

            return {"Result": {
                "code": "200",
                "Response": item}
            }

        else:

            cookie = set_cookie_anon(response)

            if options:
                variant_id = BC.get_variant_id(pid, option_ids=urllib.parse.unquote(options).split(','))
                cart_id = BC.create_cart(quantity, pid, variant_id)

            else:
                cart_id = BC.create_cart(quantity, pid)

            logging.debug(cart_id)
            cart_id = cart_id.json().get('data').get('id')

            new_cart = Cart(
                anon_id=cookie,
                active=True,
                bc_id=cart_id
            )

            session.add(new_cart)
            session.commit()
            session.close()

        return { "Result": {
            "code": "200",
            "Response": "Cart started"}
               }


# updates quantity/variance of an item in the cart
@hug.put('/cart')
def update_cart_product(request, response, body, pid:int=None, quantity:int=None, options:str=None, cors: hug.directives.cors="*"):

    '''updates quantity of an item in the cart'''

    user = get_cookie(request)

    data = body

    if user is not None:

        if user.cart_id is not None:

            if options:
                variant_id = BC.get_variant_id(pid, option_ids=urllib.parse.unquote(options).split(','))
                response = BC.update_cart_item(user.cart_id, pid, quantity, variant_id)

            else:
                BC.update_cart_item(user.cart_id, pid, quantity)

            response = response.json()

        else:
            response.status = falcon.HTTP_404
            return {"Result": {
                "code": "404",
                "Response": "No cart Exists"}
                   }

        return {"Result": {
            "code": "200",
            "Response": response}
               }
    else:

        cart = get_cookie_anon(request)

        if cart:

            if options:
                variant_id = BC.get_variant_id(pid, option_ids=urllib.parse.unquote(options).split(','))
                response = BC.update_cart_item(cart.bc_id, pid, quantity, variant_id)

            else:
                response = BC.update_cart_item(cart.bc_id, pid, quantity)

            response = response.json()

            return {"Result": {
                "code": "200",
                "Response": response}
                   }

        response.status = falcon.HTTP_404
        return {"Result": {
            "code": "404",
            "Response": "No cart Exists"}
               }


# deletes product in the cart
@hug.delete('/cart')
def delete_item(request, response, body, pid:int=None, cors: hug.directives.cors="*"):

    '''delets item in the cart'''

    user = get_cookie(request)

    data = body

    if user is not None:

        if user.cart_id is not None:
            resp = BC.delete_cart_product(pid, user.cart_id)

            if resp is None:

                session = db.session
                user.cart_id = None
                session.add(user)
                session.commit()

                response.status = falcon.HTTP_204
                return {"Result": {
                    "code": "204",
                    "Response": "cart is empty"}
                       }

            resp = resp.json()

        else:
            response.status = falcon.HTTP_404
            return {"Result": {
                "code": "404",
                "Response": "No cart Exists"}
                   }

        return {"Result": {
            "code": "200",
            "Response": resp}
               }
    else:

        cart = get_cookie_anon(request)

        if cart:
            resp = BC.delete_cart_product(pid, cart.bc_id)

            if resp is None:

                eat_cookie_anon(response)
                return {"Result": {
                    "code": "204",
                    "Response": "cart is empty"}
                       }

            resp = resp.json()

        else:
            response.status = falcon.HTTP_404
            return {"Result": {
                "code": "404",
                "Response": "No cart Exists"}
                   }

        return {"Result": {
            "code": "200",
            "Response": resp}
               }


# delete's user's whole cart
@hug.delete('/delete_cart')
def delete_user_cart(request, response, cors: hug.directives.cors="*"):

    '''deletes whole cart'''

    user = get_cookie(request)

    if user is not None:

        session = db.session
        response = BC.delete_cart(user.cart_id)

        user.cart_id = None

        session.add(user)
        session.commit()
        session.close()

        return {"Result": {
            "code": "200",
            "Response": "Your Cart Has Been Deleted " + str(response)}
               }
    response.status = falcon.HTTP_401
    return {"Result": {
        "code": "401",
        "Response": "Unauthorized"}
           }


# gives shipping/billing/payment info. and checks user out
@hug.post('/cart/order')
def order(request, response, body, cors: hug.directives.cors="*"):

    '''the checkout'''

    data = body
    user = get_cookie(request)

    session = db.session

    if user is not None:

        if user.cart_id is not None:

            try:
                cart = session.query(Cart) \
                    .filter(Cart.bc_id == user.cart_id) \
                    .one()
            except:
                response.status = falcon.HTTP_404
                return {"Result": {
                            "code": "404",
                            "Response": "cart not found"}
                        }

            user.address1 = data['address1']
            user.address2 = data['address2']
            user.city = data['city']
            user.state_or_province = data['state_or_province']
            user.state_or_province_code = data['state_or_province_code']
            user.country_code = data['country_code']
            user.postal_code = data['postal_code']
            user.billing_address1 = data['billing_address1']
            user.billing_address2 = data['billing_address2']
            user.billing_city = data['billing_city']
            user.billing_state = data['billing_state']
            user.billing_country_code = data['billing_country_code']
            user.billing_state_code = data['billing_state_code']
            user.billing_postal_code = data['billing_postal_code']
            user.phone = data['phone']
            card_number = data['card_number']
            card_holder_name = data['card_holder_name']
            expiry_month = data['expiry_month']
            expiry_year = data['expiry_year']
            verification_value = data['verification_value']

            BC.add_billing(user.first_name, user.last_name, user.email, user.billing_address1, user.billing_address2, user.billing_city, user.billing_state, user.billing_state_code, user.billing_country_code, user.billing_postal_code, user.phone, cart.bc_id)

            shipping_response = BC.add_shipping(user.first_name,user.last_name, user.email, user.address1, user.address2, user.city, user.state_or_province, user.state_or_province_code, user.country_code, user.postal_code, user.phone, cart.bc_id)

            shipping_response = shipping_response.json()

            logging.debug(shipping_response)

            try:
                shipping_id = shipping_response['data']['consignments'][0]['id']
                consignment_id = shipping_response['data']['consignments'][0]['available_shipping_options'][0]['id']

            except:
                response.status = falcon.HTTP_409
                return {"Result": {
                        "code": "409",
                        "Response": "No shipping options available"}
                       }

            cart.shipping_option_id = shipping_id
            cart.consignment_id = consignment_id

            BC.update_shipping(consignment_id, shipping_id, cart.bc_id)

            order_id = BC.create_order(cart.bc_id)
            order_id = order_id.json()
            order_id = order_id['data']['id']

            cart.order_id = order_id

            payment = BC.payment_token(order_id)
            payment = payment.json()
            payment = payment['data']['id']

            cart.payment_token = payment

            payment_response = BC.process_payment(payment, data['card_number'],
                    data['card_holder_name'], data['expiry_month'],
                     data['expiry_year'], data['verification_value'])

            payment_response = payment_response.json()

            logging.debug(payment_response)

            new_order = Order(
                uid=user.uid,
                bc_id=order_id,
                status=str(payment_response['title'])
            )

            session.add(user)
            session.add(cart)
            session.add(new_order)
            session.commit()
            session.close()

            return {"Result": {
                "code": "200",
                "Response": payment_response}
            }
        response.status = falcon.HTTP_404
        return {"Result": {
                "code": "404",
                "Response": "You Have No Cart"}
               }

    else:

        cart = get_cookie_anon(request)

        if cart:

            BC.add_billing(data['first_name'], data['last_name'], data['email'], data['billing_address1'], data['billing_address2'], data['billing_city'], data['billing_state'], data['billing_state_code'], data['billing_country_code'], data['billing_postal_code'], data['phone'], cart.bc_id)

            shipping_response = BC.add_shipping(data['first_name'],data['last_name'], data['email'], data['address1'], data['address2'], data['city'], data['state_or_province'], data['state_or_province_code'], data['country_code'], data['postal_code'], data['phone'], cart.bc_id)

            shipping_response = shipping_response.json()

            logging.debug(shipping_response)

            shipping_id = shipping_response['data']['consignments'][0]['id']
            consignment_id = shipping_response['data']['consignments'][0]['available_shipping_options'][0]['id']

            cart.shipping_option_id = shipping_id
            cart.consignment_id = consignment_id

            BC.update_shipping(consignment_id, shipping_id, cart.bc_id)

            order_id = BC.create_order(cart.bc_id)
            order_id = order_id.json()
            order_id = order_id['data']['id']

            cart.order_id = order_id

            payment = BC.payment_token(order_id)
            payment = payment.json()
            payment = payment['data']['id']

            cart.payment_token = payment

            payment_response = BC.process_payment(payment, data['card_number'],
                    data['card_holder_name'], data['expiry_month'],
                     data['expiry_year'], data['verification_value'])

            payment_response = payment_response.json()

            logging.debug(payment_response)

            new_order = Order(
                anon_id=cart.anon_id,
                bc_id=order_id,
                status=str(payment_response['title'])
            )

            session.add(cart)
            session.add(new_order)
            session.commit()
            session.close()

            return {"Result": {
                "code": "200",
                "Response": payment_response}
            }
        response.status = falcon.HTTP_404
        return {"Result": {
                "code": "404",
                "Response": "You Have No Cart"}
               }


@hug.get('/orders')
def orders(request, response, cors: hug.directives.cors="*"):

    '''retreives past orders for current user'''

    session = db.session
    user = get_cookie(request)

    try:
        orders = session.query(Order) \
            .filter(Order.uid == user.uid) \
            .all()
    except:
        response.status = falcon.HTTP_404
        return {"Result": {
                    "code": "404",
                    "Response": "no orders found"}
                }

    dict = []

    counter = 0

    for i in orders:

        current_order = orders[counter]

        dict.append({"order_id": current_order.bc_id,
                     "status": current_order.status,
                     "user": current_order.uid,
                     "created_date": current_order.created_date})

        counter += 1

    return {"Result": {
                    "code": "200",
                    "Response": dict}
            }


@hug.get('/get_order')
def get_order(body, response, cors: hug.directives.cors="*"):

    '''get specific order details'''

    data = body

    response = BC.get_order(data['order_id'])

    return {"Result": {
                    "code": "200",
                    "Response": response
                    }
                }


# <------ products task ------->
@hug.get('/products')
def products(request, response, body, id:int=None, categories:str=None, search:str=None, show_hidden:bool=None, cors: hug.directives.cors="*"):

    '''Returns a dictionary of all products for the store'''

    # Check if the id is present, or reroute it
    if id:

        # Get a list of all the products in the shop
        product = BC.get_product(pid=id, include=['images', 'options', 'variants']).json()['data']

        # Return the data as a json
        r = {'code': 200,
             'data': product}

        return r

    elif categories:

        # turn the category into a list
        categories_list = categories.split(',')

        # Get a list of all the products in the shop
        products = BC.get_all_products(include=['images', 'variants'], show_hidden= show_hidden if show_hidden else None).json()['data']

        # Sort through all the products
        for product in products:

            # Check across all categories included
            for category in categories_list:

                # Check if that product has the correct category
                if category not in product['categories']:

                    # Remove the product from products
                    products.remove(product)

        # Return the data as a json
        r = {'code': 200,
             'data': products}

        return r

    elif search:

        # Find the similar names and make a list of them
        search_results = difflib.get_close_matches(search, BC.get_product_names(), cutoff=0.0)

        pprint(search_results)
        products = BC.get_all_products(include=['images'], show_hidden= show_hidden if show_hidden else None).json()['data']
        product_results = []

        # Go over all the products
        for product in products:

            if product['name'] in search_results:
                product_results.append(product)


        # return the list of products from the search results
        r = {'code': 200,
             'data': product_results}

        return r


    else:

        # Get a list of all the products in the shop
        products = BC.get_all_products(include=['images', 'variants'], show_hidden= show_hidden if show_hidden else None).json()

        # Return the data as a json
        r = {'code': 200,
             'data': products}

        return r

@hug.get('/products/categories')
def products_categories(cors: hug.directives.cors="*"):

    categories = BC.get_all_categories()

    categories = categories.json()

    return categories
