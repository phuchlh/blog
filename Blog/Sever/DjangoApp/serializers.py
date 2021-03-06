from dataclasses import fields
from unicodedata import name
from rest_framework import serializers
from .models import Role, Account
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode


class RoleSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Role
        fields=('roleName_id', 'description')


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields=('id', 'email', 'first_name', 'last_name', 'username', 'password', 'is_staff', 'is_superuser','is_active', 'phone', 'gender', 'avatar', 'roleName_id', 'is_verified', 'auth_provider', 'date_joined')
        # extra_kwargs = {
        #     'password' : {'write_only': True}
        # }


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255,write_only=True)
    class Meta:
        model = Account
        fields = ('email', 'password', 'username')

    def validate(self, attrs):
        email = attrs.get('email', '')
        username = attrs.get('username', '')

        # if not username.isalnum():
        #     raise serializers.ValidationError(
        #         'The name should only contain alphanumeric character')
        return attrs

    def create(self, validated_data):
        return Account.objects.create_user(**validated_data)


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = Account
        fields = ['token']


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    username = serializers.CharField(max_length=255, min_length=3, read_only=True)
    tokens = serializers.SerializerMethodField()
    
    def get_tokens(self, obj):
        user = Account.objects.get(email=obj['email'])

        return {
            'refresh': user.tokens()['refresh'],
            'access': user.tokens()['access']
        }

    class Meta:
        model = Account
        fields = ['id','email', 'password', 'username', 'tokens']

    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password', '')
        filtered_user_by_email = Account.objects.filter(email=email)
        user = auth.authenticate(email=email, password=password)
        
        if filtered_user_by_email.exists() and filtered_user_by_email[0].auth_provider != 'email':
            raise AuthenticationFailed(
                detail='Please continue your login using ' + filtered_user_by_email[0].auth_provider)

        if not user:
            raise AuthenticationFailed('Invalid credentials, try again!')
        if not user.is_active:
            raise AuthenticationFailed('Your account has been locked, please contact Admin!')
        if not user.is_verified:
            raise AuthenticationFailed('This email is not verified!')
        
        return {
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'tokens': user.tokens
        }

        return super().validate(attrs)


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        fields = ['email']


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = Account.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()

            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
        return super().validate(attrs)


class LogoutSerializer (serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs.get('refresh')

        return attrs

    def save(self, **kwargs):

        try: 
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad_token')

class AccountSerializerEdit(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields=('id', 'is_active')
        