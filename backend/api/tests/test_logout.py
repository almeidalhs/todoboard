import json
from django.contrib.auth.models import User
from django.test import TestCase, Client
from django.urls import reverse, resolve
from rest_framework.authtoken.models import Token

class LogoutTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='user7', password='123456')
        self.token = Token.objects.create(user=self.user)

    def test_successful_logout(self):
        response = self.client.post(
            reverse('logout'),
            HTTP_AUTHORIZATION=f'Token {self.token.key}'
        )
        self.assertEqual(response.status_code, 200)
        self.assertTrue(Token.objects.filter(user=self.user).exists())