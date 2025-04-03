from django.urls import path
from . import views

urlpatterns = [
    path('todos/', views.TodoListCreate.as_view(), name='todo-list-create'),
    path('todos/<int:pk>/', views.TodoRetrieveUpdateDestroy.as_view(), name='todo-update'),
    path('todos/<int:pk>/complete/', views.TodoToggleComplete.as_view(), name='todo-complete'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
]