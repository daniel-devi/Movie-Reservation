# Movie Reservation System

The **Movie Reservation System** is a backend service that allows users to reserve movie tickets. It includes features such as user authentication, movie and showtime management, seat reservation functionality, and reporting on reservations. The goal of this project is to implement complex business logic, data modeling, and relationships in a real-world application.
Built with ReactDj - ReactTS, Django and Django rest framework
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

## Get Started

Clone the repository:
```bash
git clone <repository-url>
```

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.
