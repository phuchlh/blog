from django.urls import re_path, path
from .views import RegisterView, SetNewPasswordAPIView, VerifyEmail, LoginAPIView, PasswordTokenCheckAPI, RequestPasswordResetEmail, LogoutAPIView
from rest_framework_simplejwt.views import (TokenRefreshView,)
from DjangoApp import views

urlpatterns=[
    re_path(r'account/get_list$', views.getAccountApi),
    re_path(r'account/create$', views.postAccountApi),
    re_path(r'account/update$', views.updateAccountApi),
    re_path(r'account/delete$', views.deleteAccountApi),
    re_path(r'account/search', views.searchAccountAPI.as_view()),
    re_path(r'^account/get_account_by_id', views.searchAccountByID.getAccountByID), 
    re_path(r'^account/([0-9]+)$', views.getAccountApi),
    re_path(r'^account/update_account_status$', views.updateAccountStatus),
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', LoginAPIView.as_view(), name="login"),
    path('logout/', LogoutAPIView.as_view(), name="logout"),
    path('email-verify/', VerifyEmail.as_view(), name="email-verify"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(), name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/',PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete', SetNewPasswordAPIView.as_view(), name='password-reset-complete')
]