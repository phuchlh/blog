from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
# Create your models here.
    
class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if username is None:
            raise TypeError('Users should have a name')
        if email is None:
            raise TypeError('Users should have a Email')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password=None):
        if password is None:
            raise TypeError('Password should not be none')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

class Role(models.Model):
    roleName = models.CharField(max_length=20, primary_key=True, null=False)
    description = models.CharField(max_length=50, null=False)

AUTH_PROVIDERS = {'facebook': 'facebook', 'google': 'google', 'twitter': 'twitter', 'email': 'email'}

class Account(AbstractUser, PermissionsMixin):
    email = models.EmailField(max_length=100, unique=True, db_index=True)
    username = models.CharField(max_length=100, unique=True, db_index=True)
    password = models.CharField(max_length=255)
    is_verified = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    phone = models.CharField(max_length=20, blank=True, null=True)
    gender = models.BooleanField(null=True, blank=True)
    avatar = models.URLField(null=True, blank=True)
    roleName = models.ForeignKey(Role, default="1", on_delete=models.CASCADE) # 1 = user, 0 = admin
    auth_provider = models.CharField(max_length=255, blank=False, null=False, default=AUTH_PROVIDERS.get('email'))

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
