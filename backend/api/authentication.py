from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

AdminUser = get_user_model()

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = AdminUser.objects.get(email=email)
        except AdminUser.DoesNotExist:
            return None

        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None
