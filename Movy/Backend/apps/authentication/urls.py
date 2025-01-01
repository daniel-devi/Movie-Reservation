from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your Urls here.

urlpatterns = [
    #  Register API View - POST - /api/auth/register/
    path("register/", RegisterAPIView.as_view(), name="register"),

    # Restframework Login View - POST - /api/auth/login
    path('login', TokenObtainPairView.as_view(), name='login'),

    #  User List API View - GET - /api/auth/user?email={email}
    path("user/", UserListAPIView.as_view(), name="list"),

    #  User Detail API View - GET - /api/auth/profile/
    path("profile/", UserProfileView.as_view(), name="profile"),

    # User Email API View - GET - /api/auth/user-email/
    path("user-email/", UserEmailAPIView.as_view(), name="user-email"),

    # Check Email API View - GET - /api/auth/check-email?email={email}
    path("check-email/", check_email_exists, name="check-email"),
    #? Add more urls as needed
]
