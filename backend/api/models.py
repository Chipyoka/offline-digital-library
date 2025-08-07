from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

# Custom Admin User (uses email instead of username)
class AdminUser(AbstractUser):
    email = models.EmailField(unique=True)

    groups = models.ManyToManyField(
        Group,
        related_name="adminuser_set",
        blank=True,
        help_text="The groups this user belongs to.",
        verbose_name="groups",
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name="adminuser_set",
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="user permissions",
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

# Student model
class Student(models.Model):
    student_id = models.CharField(max_length=20, unique=True)
    full_name = models.CharField(max_length=100)
    grade = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.grade}"

# Guest sessions
class GuestSession(models.Model):
    session_id = models.CharField(max_length=64, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.session_id
