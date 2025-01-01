import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Skeleton,
    Alert,
} from '@mui/material';
import Navbar from '../components/NavBar';
import { formatDate, apiClient } from '@/utils';

interface Showtime {
    id: number;
    movie: string;
    start_time: string;
    end_time: string;
    total_seats: number;
    ticket_price: string;
    is_active: boolean;
}

const fetchShowtimes = async (movieId: string) => {
    if (!movieId) {
        throw new Error('Invalid movie ID');
    }

    try {
        const response = await apiClient.get(`core/v1/showtimes/movie/${movieId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching showtimes:', error);
        throw new Error('Failed to fetch data');
    }
};

const Showtimes: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [showtimes, setShowtimes] = useState<Showtime[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error on new fetch
                const data = await fetchShowtimes(movieId!);
                setShowtimes(data);
            } catch (error) {
                setError('Failed to load showtimes. Please try again later.');
                console.error('There was an Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [movieId]);

    return (
        <>
            <Navbar />
            <Box sx={{ padding: 4, maxWidth: '800px', margin: '0 auto' }}>
                <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{ textAlign: 'center', fontWeight: 'bold' }}
                >
                    {loading ? 'Loading...' : `Showtimes`}
                </Typography>
                {loading ? (
                    <SkeletonLoader />
                ) : error ? (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                ) : showtimes.length === 0 ? (
                    <Alert severity="info" sx={{ mt: 2 }}>
                        No showtimes available for this movie.
                    </Alert>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {showtimes.map((showtime) => (
                            <Card
                                key={showtime.id}
                                sx={{
                                    boxShadow: 3,
                                    borderRadius: 2,
                                    backgroundColor: '#f9f9f9',
                                    '&:hover': { boxShadow: 5 },
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{ color: '#333', fontWeight: 'bold' }}
                                    >
                                        Movie: {showtime.movie}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: '#555', marginBottom: 2 }}
                                    >
                                        Start Time: {new Date(showtime.start_time).toLocaleString()}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: '#555', marginBottom: 2 }}
                                    >
                                        End Time: {new Date(showtime.end_time).toLocaleString()}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: '#555', marginBottom: 2 }}
                                    >
                                        Total Seats: {showtime.total_seats}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: '#555', marginBottom: 2 }}
                                    >
                                        Ticket Price: £{showtime.ticket_price}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: showtime.is_active ? 'green' : 'red',
                                            marginBottom: 2,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {showtime.is_active ? 'Active' : 'Inactive'}
                                    </Typography>
                                    {showtime.is_active && (
                                        <Button
                                            component={Link}
                                            to={`/reserve/${showtime.id}`}
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                                textTransform: 'none',
                                                fontWeight: 'bold',
                                                boxShadow: 2,
                                                '&:hover': {
                                                    backgroundColor: '#0056b3',
                                                },
                                            }}
                                        >
                                            Reserve Seat
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}
            </Box>
        </>
    );
};

export default Showtimes;

const SkeletonLoader: React.FC = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
        {Array.from({ length: 3 }).map((_, idx) => (
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
