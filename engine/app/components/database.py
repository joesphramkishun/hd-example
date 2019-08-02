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

class DataBase(object):

    def __init__(self):
        self._engine = create_engine(
        'postgresql+psycopg2://{}:{}@pgdb:5432/rogue_shops'.format(
        os.getenv("ROGUE_SHOPS_USER"),
        os.getenv("ROGUE_SHOPS_PASS")),
        echo=False,
        echo_pool=False)
        self._base = declarative_base()
        self._session = sessionmaker()

    @property
    def engine(self):
        return self._engine

    @property
    def base(self):
        return self._base

    @property
    def session(self):
        self._session.configure(bind=self._engine)
        return self._session()

    def migrate(self):
        return self._base.metadata.create_all(self._engine)
