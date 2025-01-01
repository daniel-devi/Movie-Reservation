import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home, LoginPage, RegisterPage, Logout,NotFoundPage, BrowseMovies, Showtimes, ReserveSeat, SuccessPage} from '@/pages';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path='*' element={<NotFoundPage />} />
        {/* Movie Routes */}
        <Route path="/movies" element={<BrowseMovies />} />
        <Route path="/movies/:movieId/showtimes" element={<Showtimes />} />
        <Route path='/reserve/:showtimeId' element={<ReserveSeat />} />
        <Route path="/success/:id" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
};

export default App;
