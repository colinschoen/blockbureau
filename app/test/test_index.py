import pytest

class TestClass(object):

    def test_index(self, client):
        response = client.get('/')
        assert response.status_code == 200
        assert b"BlockBureau" in response.data
