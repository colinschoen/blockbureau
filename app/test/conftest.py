import pytest

from app import create_app

@pytest.fixture(scope='session')
def app():
    app = create_app('config.py')
    app.testing = True
    return app

@pytest.fixture
def client(app):
    """A test client for the app."""
    return app.test_client()
