from django.contrib import admin
from django.contrib.auth.admin import UserAdmin #? UserAdmin is a class provided by Django's auth app that provides a default admin interface for managing users.
from django.contrib.auth.hashers import make_password #? This function is used to hash passwords securely.
from .models import User


# Register your models here.

#? Custom User Admin

#---- Define Actions for the CustomUserAdmin interface -----

# ------ End of Actions -----

class CustomUserAdmin(UserAdmin):
    # Fields to display in the list view
    list_display = ('username', 'email', 'is_staff', 'is_active',)
    
    # Searchable fields
    search_fields = ('username', 'email')
    
    # Fields to filter by
    list_filter = ('is_staff', 'is_active', 'date_joined')
    
    # Fieldsets for organizing the user detail page
    fieldsets = ( 
        (None, {'fields': ('uuid', 'username', 'password')}), 
        ('Personal Info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'groups', 'user_permissions')}),
        ('Important Dates', {'fields': ('last_login', 'date_joined', 'updated_at' )}),
    )
    
    # Fieldsets for the Add User page
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'is_staff', 'is_active'),
        }),
    )
    
    # Enable ordering of the list view
    ordering = ('-date_joined',)

    # Add actions to the admin interface
    actions = []


#? Register the custom user model with its admin class
admin.site.register(User, CustomUserAdmin)
