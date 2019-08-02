#!/usr/bin/env python
import os
from datetime import datetime
import click
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy import Column, Sequence, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from werkzeug.security import generate_password_hash, check_password_hash

class Config(object):

    def __init__(self):
        self._site_version = os.getenv('SITE_VERSION')
        self._ROGUE_SHOPS_USER = os.getenv('ROGUE_SHOPS_USER')
        self._ROGUE_SHOPS_PASS = os.getenv('ROGUE_SHOPS_PASS')
        self._store_hash = os.getenv('store_hash')
        self._X_Auth_Client = os.getenv('X-Auth-Client')
        self._X_Auth_Token = os.getenv('X-Auth-Token')
        self._DOMAIN = os.getenv('DOMAIN')
        self._SEND_GRID_KEY = os.getenv('SEND_GRID_KEY')
        self._PAYMENT_METHOD = os.getenv('PAYMENT_METHOD')


    @property
    def site_version(self):
        return self._site_version

    @property
    def database_user(self):
        return self._ROGUE_SHOPS_USER

    @property
    def database_pass(self):
        return self._ROGUE_SHOPS_PASS

    @property
    def store_hash(self):
        return self._store_hash

    @property
    def auth_client(self):
        return self._X_Auth_Client

    @property
    def auth_token(self):
        return self._X_Auth_Token

    @property
    def domain(self):
        return self._DOMAIN

    @property
    def send_grid_key(self):
        return self._SEND_GRID_KEY

    @property
    def payment_method(self):
        return self._PAYMENT_METHOD
