from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
# Django Apps Imports
from apps.authentication.serialiser import *
# Third Party Apps Imports
from rest_framework.generics import ListAPIView, CreateAPIView 
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


# Create your views here.

#? Register API View
class RegisterAPIView(CreateAPIView):
    '''
    This API View is used to register a new user.
    It uses the UserModelSerializer to serialize the data.
    '''
    serializer_class = UserModelSerializer
    permission_classes = []
    authentication_classes = []
    search_fields = ['username', 'email']
    ordering_fields = ['username', 'date_joined']


#? User List API View
class UserListAPIView(ListAPIView):
    '''
    This API View is used to list all the users.
    It uses the UserModelSerializer to serialize the data.
    '''
    serializer_class = UserModelSerializer
    permission_classes = []
    search_field_names = ["email"]
    ordering_fields = ['username', 'date_joined']

    def get_queryset(self):
        queryset = User.objects.all()
        # Get the email query from the URL
        email = self.request.query_params.get('email')
        # Filter the queryset based on the email query
        if email is not None:
            queryset = queryset.filter(email=email)
        return queryset
    

#? User Email API View
class UserEmailAPIView(ListAPIView):
    '''
    This API View is used to get the email of a user.
    It uses the UserModelSerializer to serialize the data.
    '''
    serializer_class = UserModelSerializer
    permission_classes = []
    queryset = User.objects.all()


#? User Profile API View
class UserProfileView(ListAPIView):
    '''
    This API View is used to get the details of a user.
    It uses the UserModelSerializer to serialize the data.
    '''
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # The user is available through the request.user attribute
        user = request.user
        serializer = UserModelSerializer(user)
        return Response(serializer.data)


#? Validate Email API View
@csrf_exempt  # Optional if using CSRF protection in production with tokens
def check_email_exists(request):
    if request.method == 'GET':
        email = request.GET.get('email', '').strip()  # Get email from query parameters
        
        # Validate email format
        if not email:
            return JsonResponse({'message': 'Email parameter is required.'}, status=400)
        
        # Check if email exists in the database
        if User.objects.filter(email=email).exists():
            return JsonResponse({'exists': True, 'message': 'Email already exists.'}, status=200)
        else:
            return JsonResponse({'exists': False, 'message': 'Email is available.'}, status=200)
    
    return JsonResponse({'message': 'Invalid request method.'}, status=405)
    
    
# Add more views as needed