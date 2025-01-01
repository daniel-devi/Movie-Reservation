from django.db import models
# Import the User model from the authentication app
from apps.authentication.models import User
# Third-party imports
import PIL
from multiselectfield import MultiSelectField

# Create your models here.

GENRE = (
    ('Action', 'Action'),
    ('Adventure', 'Adventure'),
    ('Comedy', 'Comedy'),
    ('Drama', 'Drama'),
    ('Fantasy', 'Fantasy'),
    ('Horror', 'Horror'),
    ('Mystery', 'Mystery'),
    ('Romance', 'Romance'),
    ('Sci-Fi', 'Sci-Fi'),
    ('Thriller', 'Thriller'),
    ('Western', 'Western'),
)

# Movie model

class Movie(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    image = models.ImageField(upload_to='movie_images/')
    release_date = models.DateField()
    duration = models.DurationField()
    genres = MultiSelectField(models.CharField(max_length=50), blank=True, choices=GENRE, default=list)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def get_image_url(self):
        if self.image:
            return self.image.url
        return None 
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.image:
            img = PIL.Image.open(self.image.path)
            if img.height > 300 or img.width > 300:
                output_size = (300, 300)
                img.thumbnail(output_size)
                img.save(self.image.path)
                print("Image resized successfully.")

# Showtime model

class Showtime(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    total_seats = models.IntegerField()
    ticket_price = models.DecimalField(max_digits=6, decimal_places=2)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.movie.title} - {self.start_time} to {self.end_time}"
    

    def available_seats(self):
        reserved_seats = set()
        for reservation in self.reservation_set.filter(status='confirmed'):
            reserved_seats.update(reservation.seat_numbers)
        return list(set(range(1, self.total_seats + 1)) - reserved_seats)


# Reservation model

SEAT_NUMBER_CHOICES = [(i, str(i)) for i in range(1, 101)]

class Reservation(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    showtime = models.ForeignKey(Showtime, on_delete=models.CASCADE)
    seat_numbers = MultiSelectField(models.IntegerField(), choices=SEAT_NUMBER_CHOICES, default=list)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    successful_payment = models.BooleanField(default=False)

    def __str__(self):
        return f"Reservation {self.id} - {self.user.username}"