import json
from django.contrib.auth.models import User
from django.test import TestCase, Client
from django.urls import reverse, resolve
from rest_framework.authtoken.models import Token


class LoginViewTests(TestCase):

    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username='user7', password='123456')
        self.token = Token.objects.create(user=self.user)

    def test_successful_login_with_existing_token(self):
        data = {'username': 'user7', 'password': '123456'}
        response = self.client.post(
            reverse('login'),
            data=json.dumps(data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['token'], self.token.key)