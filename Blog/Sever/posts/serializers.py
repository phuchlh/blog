from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'status', 'image', 'createDate', 'deleteDate', 'idAccount')

class PostDeletedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'status', 'deleteDate')