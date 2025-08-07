from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_world, name='hello'),
    path('login/admin/', views.admin_login, name='admin_login'),
    path('login/student/', views.student_login, name='student_login'),
    path('login/guest/', views.guest_login, name='guest_login'),
    path('logout/', views.logout_user, name='logout'),
]