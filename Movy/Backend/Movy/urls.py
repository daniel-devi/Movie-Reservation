"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView # Token Auth Views
from apps.core.views import home

'''
    Admin Panel Access Credentials
    # Username: admin
    # Password: admin@123
    # Email: admin@admin.com

    If you want to create a new user, you can use the following command:

       - python manage.py createsuperuser

    This will prompt you to enter a username, email, and password.
    After creating the superuser, you can log in to the admin panel using the credentials you provided.
    The admin panel is located at /admin/
'''
urlpatterns = [
    #? Django Admin Panel
    path('admin/', admin.site.urls),

    #? Token Get Views
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    #? Django Apps - Core & Account
    path('api/core/', include('apps.core.urls')),
    path('api/auth/', include('apps.authentication.urls')),

    #? Home 
    path('', home, name='home' )
    
    # Add your app urls here

]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)