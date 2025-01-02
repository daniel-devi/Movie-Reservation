import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '@/utils/apiClient';
import { formatDate } from '@/utils';
import { Button, Typography, Paper, Grid } from '@mui/material';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

interface ShowtimeSeatsResponse {
    available_seats: number[];
    total_seats: number;
    ticket_price: number;
    movie_name: string;
    showtime: string;
}

const SeatReservationPage: React.FC = () => {
    const { showtimeId } = useParams<{ showtimeId: string }>();
    const [seats, setSeats] = useState<number[]>([]);
    const [totalSeats, setTotalSeats] = useState<number>(0);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [ticketPrice, setTicketPrice] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [movieName, setMovieName] = useState<string>('');
    const [showtime, setShowtime] = useState<string>('');
    const [successID, setSuccessID] = useState<string>(null);
    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();

    useEffect(() => {
        apiClient
            .get<ShowtimeSeatsResponse>(`/core/v1/showtimes/available_seats/${showtimeId}`)
            .then((response) => {
                setSeats(response.data.available_seats);
                setTotalSeats(response.data.total_seats);
                setTicketPrice(response.data.ticket_price);
                setMovieName(response.data.movie_name);
                setShowtime(response.data.showtime);
            })
            .catch((error) => {
                console.error('Error fetching seat data:', error);
            });
    }, [showtimeId]);

    const toggleSeatSelection = (seat: number): void => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    useEffect(() => {
        setTotalPrice(selectedSeats.length * ticketPrice);
    }, [selectedSeats, ticketPrice]);

    const initiatePayment = async (): Promise<void> => {
        if (!stripe || !elements) {
            return;
        }

        try {
            const paymentResponse = await apiClient.get(`core/v1/create_payment?amount=${totalPrice * 100}`);
            const { clientSecret } = paymentResponse.data;

            const cardElement = elements.getElement(CardElement);

            const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement!,
            });

            if (paymentMethodError) {
                throw new Error(paymentMethodError.message);
            }

            const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (paymentError) {
                throw new Error(paymentError.message);
            }

            // Create reservation
            const reservationResponse = await apiClient.post('/core/v1/reservation', {
                status: 'confirmed',
                total_amount: totalPrice,
                successful_payment: true,
                user: localStorage.getItem("ID"), 
                showtime: showtimeId,
                seat_numbers: selectedSeats,
            });

            alert('Reservation successful!');
            console.log('Reservation created:', reservationResponse.data);
            setSuccessID(reservationResponse.data.id);

            // Update UI with reservation
            console.log('Reservation created:', successID);
            navigate(`/success/${successID}`);
        } catch (error) {
            console.error('Error processing payment or reservation:', error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
            <Paper sx={{ padding: '24px', boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    {movieName} - Showtime
                </Typography>
                <Typography variant="h6" align="center" color="textSecondary">
                    {formatDate(showtime)}
                </Typography>

                <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 3 }}>
                    {Array.from({ length: totalSeats }).map((_, index) => {
                        const seatNumber = index + 1;
                        const isAvailable = seats.includes(seatNumber);
                        const isSelected = selectedSeats.includes(seatNumber);

                        return (
                            <Grid item key={seatNumber}>
                                <Button
                                    onClick={() => toggleSeatSelection(seatNumber)}
                                    disabled={!isAvailable}
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: isSelected
                                            ? 'green'
                                            : isAvailable
                                            ? 'lightgray'
                                            : 'red',
                                        color: 'white',
                                        fontSize: '1.2em',
                                    }}
                                >
                                    {seatNumber}
                                </Button>
                            </Grid>
                        );
                    })}
                </Grid>
            </Paper>

            <Paper sx={{ marginTop: 3, padding: '24px', backgroundColor: '#f9f9f9', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Selection Summary
                </Typography>
                <Typography variant="body1">
                    <strong>Movie:</strong> {movieName}
                </Typography>
                <Typography variant="body1">
                    <strong>Showtime:</strong> {formatDate(showtime)}
                </Typography>
                <Typography variant="body1">
                    <strong>Ticket Price:</strong> £{ticketPrice.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                    <strong>Selected Seats:</strong> {selectedSeats.join(', ') || 'None'}
                </Typography>
                <Typography variant="body1">
                    <strong>Total Price:</strong> £{totalPrice.toFixed(2)}
                </Typography>

                <CardElement options={{ style: { base: { fontSize: '18px' } } }} />

                <Button
                    onClick={initiatePayment}
                    disabled={selectedSeats.length === 0}
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                >
                    Proceed to Payment
                </Button>
            </Paper>
        </div>
    );
};

export default SeatReservationPage;
