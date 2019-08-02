#!/usr/bin/env python
import hug
from app.jobs import user, bigcommerce


# <-------------- API Root -------------->
@hug.get('/')
def root():

    # @TODO have this function return an index for the secretary
    return "Ya got the root BOI"


# <--------- API Job Extentions ---------->
@hug.extend_api('/user')
def user():
    return [user]


@hug.extend_api('/shop/bigcommerce')
def shop_bigcommerce():
    return [bigcommerce]
