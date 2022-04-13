from django.db import models
from tkinter import CASCADE
from django.utils import timezone
from DjangoApp.models import Account
# Create your models here.


class Post(models.Model):
    createDate = models.DateTimeField(auto_now_add=True)
    deleteDate = models.DateField(null=True, blank=True)
    title = models.CharField(max_length=100, null=False)
    content = models.CharField(max_length=10000,  null=False)
    status = models.CharField(max_length=10, null=False, default='ACTIVE')
    image = models.URLField(null=True)
    idAccount = models.ForeignKey(to=Account, on_delete=models.CASCADE)