from django.urls import path
from .views import *

# Create your URLS here.

urlpatterns = [
    #? Home Page URL - GET - 127.0.0.1:8000/
    path('', home, name='home'),

    #? Movie Listing URL - GET - 127.0.0.1:8000/api/core/v1/movies 
    path('v1/movies', MovieListingView.as_view(), name='movies'),

    #? Showtime Listing URL - GET - 127.0.0.1:8000/api/core/v1/showtimes
    path('v1/showtimes', ShowtimeListingView.as_view(), name='showtimes'),

    #? Showtime Listing by Movie ID URL - GET - 127.0.0.1:8000/api/core/v1/showtimes/movie/<int:movie_id>
    path('v1/showtimes/movie/<int:movie_id>', ShowtimeListingByMovieIDView.as_view(), name='showtimes_by_movie_id'),

    #? Available Seats URL - GET - 127.0.0.1:8000/api/core/v1/showtimes/available_seats/<int:showtime_id>
    path('v1/showtimes/available_seats/<int:showtime_id>', AvailableSeatsView.as_view(), name='available_seats'),

    #? Create Payment Session URL - POST - 127.0.0.1:8000/api/core/v1/create_payment
    path('v1/create_payment', create_payment_intent, name='create_payment'),

    #? Create Reservation URL - POST - 127.0.0.1:8000/api/core/v1/reservations
    path('v1/reservation', ReservationListCreateView.as_view(), name='reservations'),

    #? Reservation Get  URL - GET - 127.0.0.1:8000/api/core/v1/reservations/<int:reservation_id>
    path('v1/reservations/<int:reservation_id>', ReservationFilterView.as_view(), name='reservation_detail'),

    #? Reservation  Get  URL - GET - 127.0.0.1:8000/api/core/v1/reservations/user/<int:user_id>
    path('v1/reservations/user/<int:user_id>', ReservationUserFilterView.as_view(), name='reservation_user_detail'),

    # TODO: Add your URLS here.
]
