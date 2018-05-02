#!/usr/bin/env python3
import os
import pytest

from flask_script import Manager, Server, Command
from flask_script.commands import ShowUrls, Clean

from flask_migrate import Migrate, MigrateCommand

from app import create_app

# default to dev config
app = create_app('config.py')

manager = Manager(app)

class RunTests(Command):
    def run(self):
        pytest.main(['-x', 'app/test'])


manager.add_command("server", Server(host='localhost'))
manager.add_command("server-ssl", Server(host='localhost', ssl_crt='cert.pem', ssl_key='key.pem'))
manager.add_command("show-urls", ShowUrls())
manager.add_command('test', RunTests())

@manager.shell
def make_shell_context():
    """ Creates a python REPL with several default imports
        in the context of the app
    """
    return dict(app=app, db=db, User=User)

@manager.command
def seed():
    generate.seed()

@manager.command
def cacheflush():
    with app.app_context():
        cache.clear()
        print("Flushed")

@manager.command
def setup_default():
    print("Do some setup")

@manager.command
def createdb():
    """ Creates a database with all of the tables defined in
        your SQLAlchemy models
    """
    db.create_all()
    setup_default()


@manager.command
def dropdb():
    """ Creates a database with all of the tables defined in
        your SQLAlchemy models
    """
    if app.config['ENV'] != "prod":
        db.drop_all()

@manager.command
def resetdb():
    """ Drop & create a database with all of the tables defined in
        your SQLAlchemy models.
        DO NOT USE IN PRODUCTION.
    """
    if app.config['ENV'] != "prod":
        print("Dropping database...")
        db.drop_all()
        print("Seeding database...")
        createdb()
        seed()


if __name__ == "__main__":
    manager.run()
