import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Button, Skeleton, Alert, CardMedia, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Navbar from '../components/NavBar';
import apiClient from '../utils/apiClient';

interface Movie {
    id: number;
    title: string;
    description: string;
    rating: string;
    image: string;
    release_date: string;
    duration: string;
    genres: string[];
}

const SkeletonMovieCard: React.FC = () => (
    <Card>
        <CardContent>
            <Skeleton variant="rectangular" height={140} />
            <Skeleton variant="text" height={30} width="80%" style={{ marginTop: '8px' }} />
            <Skeleton variant="text" height={20} width="60%" style={{ marginTop: '8px' }} />
            <Skeleton variant="text" height={20} width="40%" style={{ marginTop: '8px' }} />
            <Skeleton variant="rectangular" height={36} width="50%" style={{ marginTop: '16px' }} />
        </CardContent>
    </Card>
);

const ErrorMessage: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
    <Alert severity="error" action={
        <Button color="inherit" size="small" onClick={onRetry}>
            Retry
        </Button>
    }>
        {message}
    </Alert>
);

const BrowseMovies: React.FC = () => {
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedGenre, setSelectedGenre] = useState<string>(''); // Store selected genre
    const [genres, setGenres] = useState<string[]>([]); // Store available genres

    const fetchMovies = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get('core/v1/movies');
            setMovies(response.data);

            // Extract unique genres from the movies
            const uniqueGenres = Array.from(new Set(response.data.flatMap((movie: Movie) => movie.genres)));
            setGenres(uniqueGenres);
        } catch (err) {
            setError(`Failed to load movies. Please try again. ${err}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    // Filter movies based on selected genre
    const filteredMovies = selectedGenre
        ? movies?.filter((movie) => movie.genres.includes(selectedGenre))
        : movies;

    return (
        <>
            <Navbar />
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" fontWeight="bold" marginBottom={2}>
                    Browse Movies
                </Typography>

                {/* Genre Filter */}
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel>Filter by Genre</InputLabel>
                    <Select
                        value={selectedGenre}
                        label="Filter by Genre"
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        <MenuItem value="">All Genres</MenuItem>
                        {genres.map((genre) => (
                            <MenuItem key={genre} value={genre}>
                                {genre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {loading && (
                    <Grid container spacing={3}>
                        {[...Array(6)].map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <SkeletonMovieCard />
                            </Grid>
                        ))}
                    </Grid>
                )}

                {error && <ErrorMessage message={error} onRetry={fetchMovies} />}

                {!loading && filteredMovies && (
                    <Grid container spacing={3}>
                        {filteredMovies.map((movie) => (
                            <Grid item xs={12} sm={6} md={4} key={movie.id}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={movie.image}
                                        alt={movie.title}
                                        Width="200"
                                        sx={{ imageRendering: 'crisp-edges', maxWidth: '200px', maxHeight: '200px' }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold">
                                            {movie.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" marginTop={1}>
                                            {movie.description}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" display="block" marginTop={1}>
                                            Rating: {movie.rating} | Release Date: {new Date(movie.release_date).toLocaleDateString()}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" display="block" marginTop={1}>
                                            Duration: {movie.duration}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" display="block" marginTop={1}>
                                            Genres: {movie.genres.join(', ')}
                                        </Typography>
                                        <Button
                                            component={Link}
                                            to={`/movies/${movie.id}/showtimes`}
                                            variant="contained"
                                            color="primary"
                                            sx={{ marginTop: 2 }}
                                        >
                                            View Showtimes
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </>
    );
};

export default BrowseMovies;
