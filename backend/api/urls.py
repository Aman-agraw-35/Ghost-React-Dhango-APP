from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import RegisterView, UserDetailView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),  # Register new user
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login -> get access & refresh token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh expired access token
    path('me/', UserDetailView.as_view(), name='user-detail'),  # Get authenticated user's data
]
