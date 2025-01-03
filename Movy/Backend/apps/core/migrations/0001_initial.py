# Generated by Django 4.2 on 2024-12-31 10:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import multiselectfield.db.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Movie",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=255)),
                ("description", models.TextField()),
                ("rating", models.DecimalField(decimal_places=1, max_digits=2)),
                ("image", models.ImageField(upload_to="movie_images/")),
                ("release_date", models.DateField()),
                ("duration", models.DurationField()),
                (
                    "genres",
                    multiselectfield.db.fields.MultiSelectField(
                        blank=True,
                        choices=[
                            ("Action", "Action"),
                            ("Adventure", "Adventure"),
                            ("Comedy", "Comedy"),
                            ("Drama", "Drama"),
                            ("Fantasy", "Fantasy"),
                            ("Horror", "Horror"),
                            ("Mystery", "Mystery"),
                            ("Romance", "Romance"),
                            ("Sci-Fi", "Sci-Fi"),
                            ("Thriller", "Thriller"),
                            ("Western", "Western"),
                        ],
                        default=list,
                        max_length=84,
                        verbose_name=models.CharField(max_length=50),
                    ),
                ),
                ("is_active", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="Showtime",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("start_time", models.DateTimeField()),
                ("end_time", models.DateTimeField()),
                ("total_seats", models.IntegerField()),
                ("ticket_price", models.DecimalField(decimal_places=2, max_digits=6)),
                ("is_active", models.BooleanField(default=True)),
                (
                    "movie",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="core.movie"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Reservation",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "seat_numbers",
                    multiselectfield.db.fields.MultiSelectField(
                        choices=[
                            (1, "1"),
                            (2, "2"),
                            (3, "3"),
                            (4, "4"),
                            (5, "5"),
                            (6, "6"),
                            (7, "7"),
                            (8, "8"),
                            (9, "9"),
                            (10, "10"),
                            (11, "11"),
                            (12, "12"),
                            (13, "13"),
                            (14, "14"),
                            (15, "15"),
                            (16, "16"),
                            (17, "17"),
                            (18, "18"),
                            (19, "19"),
                            (20, "20"),
                            (21, "21"),
                            (22, "22"),
                            (23, "23"),
                            (24, "24"),
                            (25, "25"),
                            (26, "26"),
                            (27, "27"),
                            (28, "28"),
                            (29, "29"),
                            (30, "30"),
                            (31, "31"),
                            (32, "32"),
                            (33, "33"),
                            (34, "34"),
                            (35, "35"),
                            (36, "36"),
                            (37, "37"),
                            (38, "38"),
                            (39, "39"),
                            (40, "40"),
                            (41, "41"),
                            (42, "42"),
                            (43, "43"),
                            (44, "44"),
                            (45, "45"),
                            (46, "46"),
                            (47, "47"),
                            (48, "48"),
                            (49, "49"),
                            (50, "50"),
                            (51, "51"),
                            (52, "52"),
                            (53, "53"),
                            (54, "54"),
                            (55, "55"),
                            (56, "56"),
                            (57, "57"),
                            (58, "58"),
                            (59, "59"),
                            (60, "60"),
                            (61, "61"),
                            (62, "62"),
                            (63, "63"),
                            (64, "64"),
                            (65, "65"),
                            (66, "66"),
                            (67, "67"),
                            (68, "68"),
                            (69, "69"),
                            (70, "70"),
                            (71, "71"),
                            (72, "72"),
                            (73, "73"),
                            (74, "74"),
                            (75, "75"),
                            (76, "76"),
                            (77, "77"),
                            (78, "78"),
                            (79, "79"),
                            (80, "80"),
                            (81, "81"),
                            (82, "82"),
                            (83, "83"),
                            (84, "84"),
                            (85, "85"),
                            (86, "86"),
                            (87, "87"),
                            (88, "88"),
                            (89, "89"),
                            (90, "90"),
                            (91, "91"),
                            (92, "92"),
                            (93, "93"),
                            (94, "94"),
                            (95, "95"),
                            (96, "96"),
                            (97, "97"),
                            (98, "98"),
                            (99, "99"),
                            (100, "100"),
                        ],
                        default=list,
                        max_length=291,
                        verbose_name=models.IntegerField(),
                    ),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("pending", "Pending"),
                            ("confirmed", "Confirmed"),
                            ("cancelled", "Cancelled"),
                        ],
                        default="pending",
                        max_length=20,
                    ),
                ),
                ("total_amount", models.DecimalField(decimal_places=2, max_digits=10)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("successful_payment", models.BooleanField(default=False)),
                (
                    "showtime",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="core.showtime"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
