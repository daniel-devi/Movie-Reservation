from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
# Third Party
import stripe
from rest_framework.generics import ListAPIView, ListCreateAPIView
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
# Current
from .models import *
from .serialiser import *

# Create your views here.

#? Home Page View
def home(request):
    return HttpResponse("Welcome to the Home Page of the Backend")

#? Movie Listing View
class MovieListingView(ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    authentication_classes = []
    permission_classes = []

    def get_queryset(self):
        queryset = Movie.objects.all()
        return queryset
    

#? Showtime Listing View
class ShowtimeListingView(ListAPIView):
    serializer_class = ShowTimeSerializer
    authentication_classes = []
    permission_classes = []

    def get_queryset(self):
        queryset = Showtime.objects.all()
        return queryset
    

#? Showtime Listing by Movie ID View
class ShowtimeListingByMovieIDView(ListAPIView):
    serializer_class = ShowTimeSerializer
    authentication_classes = []
    permission_classes = []

    def get_queryset(self):
        queryset = Showtime.objects.filter(movie_id=self.kwargs['movie_id'])
        return queryset
    


def get_available_seats(seats, reserved_seats):
    available_seats = []
    for seat in seats:
        for reserved_seat in reserved_seats:
            if seat == int(reserved_seat):
                break
        else:
            available_seats.append(seat)
    return available_seats


#? Available Seats View
class AvailableSeatsView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, showtime_id):
        try:
            showtime = Showtime.objects.get(id=showtime_id, is_active=True)

            total_seats = showtime.total_seats

            # Query confirmed reservations for the showtime and collect reserved seat numbers
            reserved_seats = set()
            reservations = Reservation.objects.filter(showtime=showtime, status='confirmed')
            for reservation in reservations:
                reserved_seats.update(reservation.seat_numbers)

            reserved_seats = list(reserved_seats)
        
        
            seats = list(range(1, total_seats + 1))
            available_seats = get_available_seats(seats, reserved_seats)

            ticket_price = showtime.ticket_price

            showtime = Showtime.objects.get(id=showtime_id, is_active=True).start_time,

            movie_name = Showtime.objects.get(id=showtime_id).movie.title

            # Construct response data
            response_data = {
                "available_seats": available_seats,
                "total_seats": total_seats,
                "ticket_price": ticket_price,
                "showtime": showtime,
                "movie_name": movie_name,
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Showtime.DoesNotExist:
            return Response({"error": "Showtime not found or inactive."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Initialize Stripe with the secret key
stripe.api_key = settings.STRIPE_SECRET_KEY

# Create a Checkout session
@csrf_exempt
def create_payment_intent(request):
    if request.method == 'GET':
        try:
            # Get the amount from the query parameter in the URL
            amount = request.GET.get('amount')

            if not amount:
                return JsonResponse({'error': 'Amount is required'}, status=400)

            amount = int(amount)  # Convert the amount to an integer

            # Create a PaymentIntent with the provided amount
            intent = stripe.PaymentIntent.create(
                amount=amount,  # The amount is passed as a query parameter (in cents)
                currency='gbp',  # You can adjust the currency as needed
            )

            return JsonResponse({
                'clientSecret': intent.client_secret
            })

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
        

# Reservation ListCreate View
class ReservationListCreateView(ListCreateAPIView):
    serializer_class = ReservationSerializer
    authentication_classes = []
    permission_classes = []

    def get_queryset(self):
        queryset = Reservation.objects.all()
        return queryset


class ReservationFilterView(ListAPIView):
    serializer_class = ReservationSerializer
    authentication_classes = []
    permission_classes = []

    def get_queryset(self):
        queryset = Reservation.objects.filter(id=self.kwargs['reservation_id'])
        return queryset