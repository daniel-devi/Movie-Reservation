# Movie Reservation System

The **Movie Reservation System** is a backend service that allows users to reserve movie tickets. It includes features such as user authentication, movie and showtime management, seat reservation functionality, and reporting on reservations. The goal of this project is to implement complex business logic, data modeling, and relationships in a real-world application.

---

## Requirements

### User Authentication and Authorization
- Users can sign up and log in.
- Roles: Admin and Regular User.
  - Admins manage movies, showtimes, and generate reports.
  - Regular users can browse movies and reserve seats.
- Initial admin is created via seed data.

### Movie Management
- Admins can:
  - Add, update, and delete movies.
  - Assign genres to movies.
  - Manage showtimes for movies.

### Reservation Management
- Regular Users:
  - View movies and showtimes for a specific date.
  - Reserve and select available seats for a showtime.
  - View and cancel their upcoming reservations.
- Admins:
  - View all reservations, capacity, and revenue.

### Implementation Considerations
- Data model design and relationships between entities.
- Prevent overbooking and ensure proper seat reservation.
- Efficient scheduling and reporting mechanisms.
- User authentication and role-based authorization.

---

## Folder Structure

The project is structured as follows:

```
MOVIE RESERVATION
├── docs                 # Documentation for the project
├── Movy
│   ├── Backend          # Backend source code
│   │   ├── apps         # Django apps for various functionalities
│   │   ├── media        # Media files (e.g., movie posters)
│   │   ├── Movy         # Core Django project settings
│   │   ├── db.sqlite3   # SQLite database (for development)
│   │   ├── manage.py    # Django management script
│   │   └── requirements.txt  # Backend dependencies
│   └── Frontend         # Frontend source code
│       ├── src          # React source code
│       │   ├── components  # Reusable components
│       │   ├── css         # Styling files
│       │   ├── hooks       # Custom React hooks
│       │   ├── pages       # Page components
│       │   ├── utils       # Utility functions
│       │   ├── App.tsx     # Main App component
│       │   └── main.tsx    # Entry point for the React app
│       ├── index.html   # Main HTML file
│       ├── package.json # Frontend dependencies
│       └── tailwind.config.js # Tailwind CSS configuration
└── README.md            # Project documentation
```

---

## Get Started

Clone the repository:
```bash
git clone https://github.com/daniel-devi/Movie-Reservation.git
```

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Reference
This project is inspired by [roadmap.sh's Movie Reservation System](https://roadmap.sh/projects/movie-reservation-system).
