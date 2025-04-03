from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from todo.models import Todo


class TodoAPITests(APITestCase):
    def setUp(self):
        # create user and Token
        self.user = User.objects.create_user(
            username='user7',
            password='123456'
        )
        self.token = Token.objects.create(user=self.user)

        # set auth header
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        # interface URL
        self.create_url = reverse('todo-list-create')


    def test_create_todo_authenticated(self):
        """
        test authenticated user can create Todo
        """
        data = {
            "title": "Note title",
            "memo": "Note description",
            "completed": False
        }

        response = self.client.post(self.create_url, data, format='json')

        # check http status
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # check db records
        self.assertEqual(Todo.objects.count(), 1)
        todo = Todo.objects.get()
        self.assertEqual(todo.title, data['title'])
        self.assertEqual(todo.user, self.user)

        # 验证响应数据
        self.assertIn('id', response.data)
        self.assertEqual(response.data['title'], data['title'])
        self.assertEqual(response.data['completed'], data['completed'])


    def test_complete_todo_authenticated(self):
        """
        test authenticated user can complete Todo
        """
        todo = Todo.objects.create(
            title="Original Todo",
            memo="Original description",
            completed=False,
            user=self.user
        )
        complete_url = reverse('todo-complete', kwargs={'pk': todo.id})
        response = self.client.patch(complete_url)

        # check http status
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # check db records
        self.assertTrue(Todo.objects.get(id = todo.id).completed, True)

    def test_get_list_authenticated(self):
        """
        authenticated user can check Todo list
        """
        todos = [
            Todo.objects.create(
                title=f"Todo {i}",
                memo=f"Description {i}",
                completed=(i % 2 == 0),
                user=self.user
            ) for i in range(1, 6)
        ]
        response = self.client.get(self.create_url)

        # check http status
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(response.data), 5)

        # check data structure and content
        first_item = response.data[0]
        self.assertIn('id', first_item)
        self.assertIn('title', first_item)
        self.assertIn('completed', first_item)
        self.assertIn('created_at', first_item)
