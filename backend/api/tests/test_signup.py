import json
from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework.authtoken.models import Token



class SignupViewTests(TestCase):
    # 成功注册测试
    def test_successful_registration(self):
        data = {'username': 'testuser', 'password': 'SecurePass123'}
        response = self.client.post(
            reverse('signup'),
            data=json.dumps(data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 201)
        self.assertIn('token', response.json())
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(Token.objects.count(), 1)
        self.assertTrue(User.objects.filter(username='testuser').exists())