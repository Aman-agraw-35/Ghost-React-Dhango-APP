from rest_framework import serializers
from django.contrib.auth.models import User

# Serializer used for user registration
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')  # Fields to be handled in registration
        extra_kwargs = {'password': {'write_only': True}}  # Hide password in response

    def create(self, validated_data):
        # Create user with hashed password using create_user()
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user

# Serializer used for returning user details (like in /api/me/ endpoint)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')  # Safe fields to return for authenticated user