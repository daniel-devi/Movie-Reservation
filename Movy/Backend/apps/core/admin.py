from django.contrib import admin
from .models import *

# Register your models here.

class MovieAdmin(admin.ModelAdmin):
    pass

admin.site.register(Movie, MovieAdmin)

class ShowTimeAdmin(admin.ModelAdmin):
    list_display = ('movie', 'start_time', 'end_time',)

admin.site.register(Showtime, ShowTimeAdmin)

admin.site.register(Reservation)
