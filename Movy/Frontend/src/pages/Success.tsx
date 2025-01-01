import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button, Paper } from '@mui/material';
import { apiClient, formatDate } from '@/utils'; // Ensure apiClient is correctly configured

const SuccessPage = () => {
  const { id } = useParams(); // Get the 'id' from the URL
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const response = await apiClient.get(`/core/v1/reservations/${id}`); 
        if (response.status !== 200) {
          throw new Error('Failed to fetch reservation details');
        }
        console.log(response.data);
        setReservation(response.data[0]);
      } catch (error) {
        setError(error.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchReservationDetails();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h5" color="error" gutterBottom>
          Error: {error}
        </Typography>
        <Button variant="contained" color="primary" href="/">
          Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={3}>
      <Paper elevation={3} sx={{ width: '100%', maxWidth: 600, padding: 3 }}>
        <Typography variant="h4" align="center" color="success.main" gutterBottom>
          Success! Your Reservation is Confirmed
        </Typography>

        <Box marginBottom={3}>
          <Typography variant="h6">Transaction Details:</Typography>
          <Box sx={{ backgroundColor: '#f5f5f5', padding: 2, borderRadius: 1 }}>
            <Typography><strong>Reservation ID:</strong> #{reservation?.id}</Typography>
            <Typography><strong>Status:</strong> {reservation?.status}</Typography>
            <Typography><strong>Payment Successful:</strong> {reservation?.successful_payment ? 'Yes' : 'No'}</Typography>
            <Typography><strong>Created At:</strong> {reservation?.created_at ? new Date(reservation.created_at).toLocaleString() : 'N/A'}</Typography>
          </Box>
        </Box>

        <Box marginBottom={3}>
          <Typography variant="h6">Reservation Details:</Typography>
          <Box sx={{ backgroundColor: '#f5f5f5', padding: 2, borderRadius: 1 }}>
            <Typography><strong>Showtime:</strong> {formatDate(reservation.showtime) || 'N/A'}</Typography>
            <Typography>
              <strong>Seats Reserved:</strong>{' '}
              {reservation?.seat_numbers?.length > 1
                ? reservation.seat_numbers.join(', ')
                : reservation?.seat_numbers?.[0] || 'None'}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center">
          <Button variant="contained" color="primary" href="/">
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SuccessPage;
