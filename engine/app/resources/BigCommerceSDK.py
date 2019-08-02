import requests
import json
import os
import logging
from pprint import pprint
from app.components.config import Config


class BigCommerce(object):

    def __init__(self):
        super(BigCommerce, self).__init__()
        self._config = Config()
        self._store_hash = Config().store_hash
        self._headers = {
                       'Accept': 'application/json',
                       'Content': 'application/json',
                       'X-Auth-Client': Config().auth_client,
                       'X-Auth-Token': Config().auth_token,
                       'Content-Type': 'application/json'
                       }

    # Creates a user
    def create_user(self, user):

        url = 'https://api.bigcommerce.com/stores/{0}/v2/customers'.format(self._store_hash)

        payload = {
            "company": "bitmotive",
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone": user.phone
        }

        payload = json.dumps(payload)

        response = requests.post(url, headers=self._headers, data=payload)

        return response

    # returns all users in big commerce system
    def get_all_users(self):

        url = 'https://api.bigcommerce.com/stores/{0}/v2/customers'.format(self._store_hash)
        payload = {}

        response = requests.get(url, headers=self._headers, data=payload)

    # get's info on a specific user
    def get_user(self, uid):

        url = 'https://api.bigcommerce.com/stores/{0}/v2/customers/{1}'.format(self._store_hash,uid)
        payload = {}

        response = requests.get(url, headers=self._headers, data=payload)

    # creates a product
    def create_product(self, pid):

        url = 'https://api.bigcommerce.com/stores/{0}/v3/catalog/products'.format(self._store_hash)
        payload = ""

        response = requests.post(url, headers=self._headers, data=payload)

    # gets all products
    def get_all_products(self, include:list=None, show_hidden=True):

        url = 'https://api.bigcommerce.com/stores/{0}/v3/catalog/products'.format(self._store_hash)
        payload = {}

        if include:
            url = url + '?include=' + ','.join(include)
        '''
        if show_hidden == True:
            url = url.replace('is_visible=true', '')
        '''

        print(url)
        response = requests.get(url, headers=self._headers, data=payload)

        return response

    def get_product(self, pid, include:list=None):

        url = 'https://api.bigcommerce.com/stores/{0}/v3/catalog/products/{1}'.format(self._store_hash, pid)
        payload = {}

        if include:
            url = url + '?include=' + ','.join(include)

        response = requests.get(url, headers=self._headers, data=payload)

        return response

    def get_product_names(self):

        url = 'https://api.bigcommerce.com/stores/{0}/v3/catalog/products'.format(self._store_hash)
        payload = {}

        # Defile product names and all product objects
        products = requests.get(url, headers=self._headers, data=payload).json()['data']
        product_names = []

        # Cycle over products and add their names to a list
        for product in products:

            # Add names to the list
            product_names.append(product['name'])

        return product_names

    def get_variant_id(self, pid, option_ids:list):

        # Get the list of all variants

        product = BigCommerce.get_product(self, pid=pid, include=['variants', 'options']).json()['data']
        variants = product['variants']
        variant_id = product['base_variant_id']


        # search through the variants
        for variant in variants:

            # Create a list of the option ids for that variant
            variant_option_values = []

            for value in variant['option_values']:# NOT MATCHING

                variant_option_values.append(value['id'])

            option_ids = list(map(int, option_ids))
            # Check if the ids match
            if set(variant_option_values) == set(option_ids):

                variant_id = variant['id']

        return variant_id


    # <==================categorie API's=========================================>

    # creates category for products to go into (products need a category)
    def create_category(self):

        url = 'https://api.bigcommerce.com/stores/{0}/v3/catalog/categories'.format(self._store_hash)
        payload = {

        }

        response = requests.post(url, headers=self._headers, data=payload)

    # gets all categories
    def get_all_categories(self):

        url = 'https://api.bigcommerce.com/stores/{0}/v3/catalog/categories'.format(self._store_hash)
        payload = {}

        response = requests.get(url, headers=self._headers, data=payload)

        return response

    # <============================CART API's=====================================================>

    # Creates a Cart, NO USER ATTATCHED (WE CAN MERGE SOME OF THESE API"S INTO ONE CALL)
    def create_cart(self, quantity, pid, variant_id=None):

        url = 'https://api.bigcommerce.com/stores/{0}/v3/carts'.format(self._store_hash)
        # Check if there is a variant id
        if variant_id:
            payload = {
                "line_items": [
                    {
                        "quantity": quantity,
                        "product_id": pid,
                        "variant_id": variant_id
                    }
                ]
            }

        else:
            payload = {
                "line_items": [
                    {
                        "quantity": quantity,
                        "product_id": pid,
                    }
                ]
            }

        payload = json.dumps(payload)

        response = requests.post(url, headers=self._headers, data=payload)

        logging.debug(response.text)

        return response

    # ADD PRODUCT TO CART
    def add_product(self, pid, quantity, cid, variant_id=None):

        url = 'https://api.bigcommerce.com/stores/{0}/v3/carts/{1}/items'.format(self._store_hash,cid)

        # Check if there is a variant id
        if variant_id:
            payload = {
                "line_items": [
                    {
                        "quantity": quantity,
                        "product_id": pid,
                        "variant_id": variant_id
                    }
                ]
            }

        else:
            payload = {
                "line_items": [
                    {
                        "quantity": quantity,
                        "product_id": pid,
                    }
                ]
            }

        pprint(payload)
        payload = json.dumps(payload)

        response = requests.post(url, headers=self._headers, data=payload)

        logging.debug(response.text)

        return response

    # ADD PRODUCT TO CART
    def get_product_images(self, pid):

        url = 'https://api.bigcommerce.com/stores/{0}/v3/catalog/products/{1}/images'.format(self._store_hash, pid)
        payload = {}

        payload = json.dumps(payload)

        response = requests.get(url, headers=self._headers, data=payload)

        return response

    # UPDATES PRODUCT OF A CART (like quantity)
    def update_cart_item(self, cart, pid, quantity, variant_id=None):

        current_cart = BigCommerce.get_cart(self, cart)

        current_cart = current_cart.json()

        x = 0

        for prods in current_cart['data']['line_items']['physical_items']:

            this_cart = current_cart['data']['line_items']['physical_items'][x]

            x += 1

            if this_cart['product_id'] == pid:

                item_id = this_cart['id']

                break

        if item_id is None:

            return 'no item found'

        url = 'https://api.bigcommerce.com/stores/{0}/v3/carts/{1}/items/{2}'.format(self._store_hash, cart, item_id)

        if variant_id:
            payload = {
                "line_item": {
                    "quantity": quantity,
                    "product_id": pid,
                    "variant_id": variant_id
                }
            }

        else:
            payload = {
                "line_item": {
                    "quantity": quantity,
                    "product_id": pid
                }
            }

        logging.debug(url)
        payload = json.dumps(payload)

        resp = requests.put(url, headers=self._headers, data=payload)

        logging.debug(resp.text)

        return resp

    # DELETES PRODUCT FROM CART
    def delete_cart_product(self, pid, cart):

        current_cart = BigCommerce.get_cart(self, cart)

        current_cart = current_cart.json()

        x = 0

        for prods in current_cart['data']['line_items']['physical_items']:

            current_cart = current_cart['data']['line_items']['physical_items'][x]

            x += 1

            if current_cart['product_id'] == pid:

                item_id = current_cart['id']

                break

        if item_id:

            pass

        else:
            return 'no item found'

        url = 'https://api.bigcommerce.com/stores/{0}/v3/carts/{1}/items/{2}'.format(self._store_hash, cart, item_id)
        payload = {
        "product_id": pid
        }

        response = requests.delete(url, headers=self._headers, data=payload)

        if response.status_code == 204:
            return None

        return response

    # GETS INFO ABOUT SPECIFIC CART
    def get_cart(self, cid):

        url = 'https://api.bigcommerce.com/stores/{0}/v3/carts/{1}'.format(self._store_hash, cid)
        payload = {}
        payload = json.dumps(payload)

        response = requests.get(url, headers=self._headers, data=payload)

        return response

    # DELETES CART
    def delete_cart(self, cid):

        url = 'https://api.bigcommerce.com/stores/{0}/v3/carts/{1}'.format(self._store_hash, cid)
        payload = {}

        response = requests.delete(url, headers=self._headers, data=payload)

        return response

    # ADDS A USER TO A CART /// IMPORTANT
    def add_cart_user(self, user, cart_id):

        url = 'https://api.bigcommerce.com/stores/{0}/v3/carts/{1}'.format(self._store_hash, cart_id)
        payload = {
                "customer_id": user
                }
        payload = json.dumps(payload)

        response = requests.put(url, headers=self._headers, data=payload)

        return response

    # STARTS CHECKOUT FOR CART (SAME AS CART REALLY)
    def get_checkout(self, cid):

        url = 'https://api.bigcommerce.com/stores/{0}/v3/carts/{1}'.format(self._store_hash, cid)
        payload = {}

        response = requests.get(url, headers=self._headers, data=payload)

    # ADDS BILLING ADDRESS FOR CART
    def add_billing(self, first_name, last_name, email, billing_address1, billing_address2, billing_city, billing_state, billing_state_code, billing_country_code, billing_postal_code, phone, cid):

        url = 'https://api.bigcommerce.com/stores/{0}/v3/checkouts/{1}/billing-address'.format(self._store_hash, cid)
        payload = {
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "address1": billing_address1,
                "address2": billing_address2,
                "city": billing_city,
                "state_or_province": billing_state,
                "state_or_province_code": billing_state_code,
                "country_code": 'US',
                "postal_code": billing_postal_code,
                "phone": phone
            }
        payload = json.dumps(payload)

        response = requests.post(url, headers=self._headers, data=payload)

        return response

    # UPDATES BILLING ADDRESS FOR CART
    def update_billing(self, cid, shipping_id):

        url = 'https://api.bigcommerce.com/stores/{0}/v3/checkouts/{1}/billing-address/{2}'.format(self._store_hash, cid, shipping_id)
        payload = {}

        response = requests.put(url, headers=self._headers, data=payload)

    # ADDS SHIPPING ADDRESS TO CART
    def add_shipping(self, first_name, last_name, email, address1, address2, city, state_or_province, state_or_province_code, country_code, postal_code, phone, cid):

        logging.debug(state_or_province)

        cart = BigCommerce.get_cart(self, cid)

        cart = cart.json()

        line_items = cart['data']['line_items']['physical_items']

        for i in range(len(cart['data']['line_items']['physical_items'])):

            product_id = line_items[i]['product_id']

            line_items[i]['item_id'] = product_id

        url = 'https://api.bigcommerce.com/stores/{0}/v3/checkouts/{1}/consignments?include=consignments.available_shipping_options'.format(self._store_hash, cid)
        payload = [{
            "shipping_address": {
                "first_name":str(first_name),
                "last_name":str(last_name),
                "email": str(email),
                "address1": str(address1),
                "address2": str(address2),
                "city":str(city),
                "state_or_province": str(state_or_province),
                "state_or_province_code": str(state_or_province_code),
                "country_code": str(country_code),
                "postal_code": str(postal_code),
                "phone": str(phone)
            },
            "line_items": line_items
        }]

        payload = json.dumps(payload)

        logging.debug(payload)

        response = requests.post(url, headers=self._headers, data=payload)

        return response

    # EDITS SHIPPING FOR CART
    def update_shipping(self, consignment_id, shipping_id, bcid):
        url = 'https://api.bigcommerce.com/stores/{0}/v3/checkouts/{1}/consignments/{2}'.format(self._store_hash, bcid, shipping_id)
        payload = {
            "shipping_option_id": consignment_id
        }
        payload = json.dumps(payload)

        response = requests.put(url, headers=self._headers, data=payload)

        return response

    # <==================================ORDER API's===============================================>

    # STARTS ORDER PROCESS FOR A CART (PREVIOUS STEPS REQUIRED TO START THIS PROCESS)
    def create_order(self, cid):

        url = 'https://api.bigcommerce.com/stores/{0}/v3/checkouts/{1}/orders'.format(self._store_hash, cid)
        payload = {}

        response = requests.post(url, headers=self._headers, data=payload)

        return response

    # GET SPECIFIC ORDER INFO
    def get_order(self, oid):

        url = 'https://api.bigcommerce.com/stores/{0}/v2/orders/{1}'.format(self._store_hash, oid)
        payload = {}
        payload = json.dumps(payload)

        response = requests.get(url, headers=self._headers, data=payload)

        response = response.json()

        return response

    # UPDATES AN ORDER
    def update_order(self, oid, updated_info):

        url = 'https://api.bigcommerce.com/stores/{0}/v3/checkouts/{1}/orders'.format(self._store_hash, oid)
        payload = {}

        response = requests.put(url, headers=self._headers, data=payload)

    # GET ALL ORDERS (status and all)
    def get_all_orders(self):

        url = 'https://api.bigcommerce.com/stores/{0}/v2/orders'.format(self._store_hash)
        payload = {}

        response = requests.get(url, headers=self._headers, data=payload)

    # CREATES PAYMENT ACCESS TOKEN FOR AN ORDER (USE NEW TOKEN FOR PAYMENT)
    def payment_token(self, oid):

        url = 'https://api.bigcommerce.com/stores/{0}/v3/payments/access_tokens'.format(self._store_hash)
        payload = {
            "order": {
                "id": oid,
                "is_recurring": False
              }
            }
        payload = json.dumps(payload)

        response = requests.post(url, headers=self._headers, data=payload)

        return response

    # GET ALL ACCEPTED PAYMENT METHODS
    def accepted_payment_methods(self):

        url = 'https://api.bigcommerce.com/stores/{0}/v2/payments/methods'.format(self._store_hash)
        payload = {}

        response = requests.get(url, headers=self._headers, data=payload)

    # GIVE IT THE PAYMENT TOKEN AND PAYMENT METHOD IN HEADER
    def process_payment(self, token, number,name,  month, year, value):

        url = 'https://payments.bigcommerce.com/stores/{0}/payments'.format(self._store_hash)
        payload = {
            "payment": {
                "instrument": {
                    "type": "card",
                    "number": number,
                    "cardholder_name": name,
                    "expiry_month": month,
                    "expiry_year": year,
                    "verification_value": value
                },
                "payment_method_id": Config().payment_method
            }
        }
        payload = json.dumps(payload)

        header = {
                 'Accept': 'application/vnd.bc.v1+json',
                 'Content': 'application/json',
                 'Content-Type': 'application/json',
                 'X-Auth-Client': self._config.auth_client,
                 'X-Auth-Token': self._config.auth_token,
                 'Authorization': 'PAT '+ str(token)
                 }

        response = requests.post(url, headers=header, data=payload)

        return response

    # get shipping methods
    def shipping_method(self, ship_method):

        url = 'https://api.bigcommerce.com/stores/{0}/v2/shipping/zones/{1}/methods'.format(self._store_hash, ship_method)
        payload = {}

        response = requests.get(url, headers=self._headers, data=payload)

    # should be done on admin page, everything needs to be added like accounts and such
    def create_shipping_method(self):

        url = 'https://api.bigcommerce.com/stores/{0}/v2/shipping/zones/1/methods'.format(self._store_hash)
        payload = "{}"

        response = requests.post(url, headers=self._headers, data=payload)
