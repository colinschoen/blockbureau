import pytest

from app import create_app as _create_app
from flask_testing import LiveServerTestCase
from selenium import webdriver

class WebdriverTestClass(LiveServerTestCase):

    def create_app(self):
        return _create_app('config.py')

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get(self.get_server_url() + '/login')

    def tearDown(self):
        self.driver.quit()

    def test_no_metamask(self):
        assert self.driver.find_element_by_class_name("metamask-not-installed").is_displayed()

class TestClass(object):

    def test_login(self, client):
        response = client.get('/login')
        assert response.status_code == 200
