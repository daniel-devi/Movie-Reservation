import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './../components/NavBar';

const Home: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem('TOKEN');

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to ReactDJ!</h1>
                <p className="text-lg text-gray-600 mb-8 max-w-md">
                    This is a boilerplate project featuring Django and React with essential authentication functionalities.
                </p>
                <div className="space-x-4 mb-4">
                    <Link
                        to="/login"
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Sign Up
                    </Link>
                    <Link to='/movies' className='px-6 py-2 bg-blue-500 rounded hover:bg-blue-650 transition'>
                        Movies
                    </Link>
                </div>
                {isAuthenticated && (
                    <div>
                        <Link
                            to="/logout"
                            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Logout
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
