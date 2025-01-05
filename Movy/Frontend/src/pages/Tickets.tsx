import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Skeleton,
    Alert,
} from '@mui/material';
import { apiClient } from '@/utils';

interface Reservation {
    id: number;
    showtime: string;
    seat_numbers: string[];
    status: string;
    user: number;
    created_at: string;
    successful_payment: boolean;
}

const fetchReservations = async (): Promise<Reservation[]> => {
    try {
        const response = await apiClient(`/core/v1/reservations/user/${localStorage.getItem("ID")}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reservations:', error);
        throw new Error('Failed to fetch reservations');
    }
};

const Reservations: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchReservations();
            setReservations(data);
        } catch (error) {
            setError('Failed to load reservations. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box sx={{ padding: 4, maxWidth: '800px', margin: '0 auto' }}>
            <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ textAlign: 'center', fontWeight: 'bold' }}
            >
                Tickets
            </Typography>
            {loading ? (
                <SkeletonLoader />
            ) : error ? (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Button variant="contained" onClick={fetchData}>
                            Retry
                        </Button>
                    </Box>
                </Alert>
            ) : reservations.length === 0 ? (
                <Alert severity="info" sx={{ mt: 2 }}>
                    No reservations found.
                </Alert>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {reservations.map((reservation) => (
                        <Card
                            key={reservation.id}
                            sx={{
                                boxShadow: 3,
                                borderRadius: 2,
                                backgroundColor: '#f9f9f9',
                                '&:hover': { boxShadow: 5 },
                                overflow: 'hidden',
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    sx={{ color: '#333', fontWeight: 'bold' }}
                                >
                                    Reservation ID: {reservation.id}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ color: '#555', marginBottom: 2 }}
                                >
                                    Showtime: {new Date(reservation.showtime).toLocaleString()}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ color: '#555', marginBottom: 2 }}
                                >
                                    Seats: {reservation.seat_numbers.join(', ')}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ color: reservation.status === 'confirmed' ? 'green' : 'orange', fontWeight: 'bold' }}
                                >
                                    Status: {reservation.status}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: reservation.successful_payment ? 'green' : 'red',
                                        marginBottom: 2,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Payment: {reservation.successful_payment ? 'Successful' : 'Pending'}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: '#777', marginBottom: 2 }}
                                >
                                    Created At: {new Date(reservation.created_at).toLocaleString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default Reservations;

const SkeletonLoader: React.FC = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
        {Array.from({ length: 2 }).map((_, idx) => (
            <Card
                key={idx}
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                }}
            >
                <Skeleton variant="text" width="60%" height={30} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="rectangular" width="30%" height={40} />
            </Card>
        ))}
    </Box>
);
