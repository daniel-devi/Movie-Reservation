from .models import * 
from rest_framework import serializers

# Create your Model Serializers here.

#? UserModel Serializer
class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'uuid', 'email', 'username', 'password', 'date_joined', 'updated_at']

        extra_kwargs = {
            'password': {'write_only': True},
            "id": {'read_only': True},
            "date_joined": {'read_only': True},
            "updated_at": {'read_only': True},
            "uuid": {'read_only': True},
            }

    # Create Method
    def create(self, validated_data):
        '''
        Create and return a new `User` instance, given the validated data.
        '''
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    

#? UserModelEmail Serializer
class UserModelEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email']

# Add more serializers as needed