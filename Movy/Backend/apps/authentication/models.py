from django.db import models
from django.contrib.auth.models import AbstractUser # Gets the user model from django
from django.utils.timezone import now
from django.contrib.auth.hashers import make_password #? This function is used to hash passwords securely.
# Third party imports
from uuid import uuid4

# Create your models here.

#? User Model

class User(AbstractUser):
    uuid = models.UUIDField(default=uuid4, unique=True, blank=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=255, unique=True, blank=True)
    updated_at = models.DateTimeField(default=now, editable=True) # Using now() as a default value for the updated_at field.

    def __str__(self):
        return self.username
    
    def save(self, *args, **kwargs):
        if not self.username:  # Generate only if no username is provided
            random_code = uuid4().hex[:6]  # Generate a 6-character random code
            self.username = f"User{random_code}"
        super().save(*args, **kwargs)

# TODO: Add more fields as needed