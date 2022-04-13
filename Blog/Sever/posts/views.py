from urllib import request
from django import views
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework import generics, viewsets, filters
from rest_framework.pagination import LimitOffsetPagination
from DjangoApp import serializers
from .models import Post  # Role, Account
# RoleSerializer, AccountSerializer
from .serializers import PostDeletedSerializer, PostSerializer

# Create your views here.
@csrf_exempt
def getPostAPI(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        posts_serializer = PostSerializer(posts, many=True)  # convert to json format
        return JsonResponse(posts_serializer.data, safe=False)
    else:
        return JsonResponse('Can not find this method [GET]')


class searchPostByTitle(generics.ListCreateAPIView):
    search_fields = ['title']
    filter_backends = (filters.SearchFilter,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class searchPostByUserID(viewsets.ModelViewSet):
    def getPostByUserID(request):
        id = request.GET.get('id')
        if id != None:
            post=Post.objects.filter(idAccount = id)
            serializer = PostSerializer(post, many = True)
        return JsonResponse(serializer.data, safe = False)


@csrf_exempt
def deletePostAPI(request, id = 0):
    post_data = JSONParser().parse(request)
    print('post data', post_data)
    post = Post.objects.get(id=post_data['id'])
    post_serializer = PostDeletedSerializer(post, data=post_data)
    if post_serializer.is_valid():
        post_serializer.save()
        return JsonResponse({"resultCode" : 1 , "mess" :'Change status successfully'}, safe = False)
    return JsonResponse("Delete Failed", safe = False)

@csrf_exempt
def postPostAPI(request):
    if request.method == 'POST':
        posts_data = JSONParser().parse(request)
        posts_serializer = PostSerializer(data=posts_data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return JsonResponse({"resultCode" : 1, "mess" :'Successfully Added'}, safe=False)
        return JsonResponse({"resultCode" : 2, "mess" :'Image not to File URL'}, safe=False)
    else:
        return JsonResponse('Can not find this method [POST]')


@csrf_exempt
def putPostAPI(request):
    if request.method == 'PUT':
        post_data = JSONParser().parse(request)
        post = Post.objects.get(id=post_data['id'])
        posts_serializer = PostSerializer(post, data=post_data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return JsonResponse('Update successfully', safe=False)
        return JsonResponse('Update failed', safe=False)
    else:
        return JsonResponse('Can not find this method [PUT]')


class searchID(viewsets.ModelViewSet):
    def getByID(request):
        id = request.GET.get('id')
        if id != None:
            post = Post.objects.get(id=id)
            serializer = PostSerializer(post)
        return JsonResponse(serializer.data, safe=False)