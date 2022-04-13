from django.urls import path
from . import views
from django.urls import re_path

urlpatterns = [
    re_path(r'post/get_list$', views.getPostAPI),
    re_path(r'post/post_list$', views.postPostAPI),
    re_path(r'post/update_list$', views.putPostAPI),
    path(r'post/delete_list/([0-9]+)$', views.deletePostAPI),
    re_path(r'post/search_by_title', views.searchPostByTitle.as_view()),
    re_path(r'post/search_by_user_id', views.searchPostByUserID.getPostByUserID),
    re_path(r'post/searchid', views.searchID.getByID),

    path(r'post/delete_post', views.deletePostAPI),


]