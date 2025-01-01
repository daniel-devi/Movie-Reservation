from .models import *
from rest_framework import serializers

# Create your serializers here.

# Movie Serializer
class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'


    def get_image_url(self, obj):
            return obj.get_image_url()
    

    def get_genres(self, obj):
        return obj.get_genres()
    

# ShowTime Serializer
class ShowTimeSerializer(serializers.ModelSerializer):
    movie = serializers.SlugRelatedField(many=False, read_only=True, slug_field='title')
    class Meta:
        model = Showtime
        fields = ['id', 'movie', 'start_time', 'end_time', 'total_seats', 'ticket_price', 'is_active']


# Available Seats Serializer
class AvailableSeatsSerializer(serializers.ModelSerializer):
    available_seats = serializers.SerializerMethodField()

    class Meta:
        model = Showtime
        fields = ['id', 'movie', 'start_time', 'end_time', 'available_seats']

    def get_available_seats(self, obj):
        return obj.available_seats()


class MultiSelectFieldSerializer(serializers.Field):
    def to_representation(self, value):
        # Convert the internal list to JSON-friendly format
        return value

    def to_internal_value(self, data):
        # Validate that the input is a list of integers
        if not isinstance(data, list):
            raise serializers.ValidationError("Expected a list of seat numbers.")
        if not all(isinstance(item, int) for item in data):
            raise serializers.ValidationError("All items in the list must be integers.")
        return data
    
# Reservation Serializer
class ReservationSerializer(serializers.ModelSerializer):
    seat_numbers = MultiSelectFieldSerializer(required=True)
    showtime = serializers.SlugRelatedField(many=False, read_only=True, slug_field='start_time')
    class Meta:
        model = Reservation
        fields = ['id', 'showtime', 'seat_numbers', 'status', "user", 'created_at', "successful_payment"]