import React from 'react';

const Navbar: React.FC = () => {
    const user = localStorage.getItem('USER');
    const isAuthenticated = !!localStorage.getItem('TOKEN');

    return (
        <nav className="w-full bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">ReactDJ</h1>
                <div className="space-x-4">
                    {isAuthenticated ? (
                        <span>Hello, {user || 'Guest'}</span>
                    ) : (
                        <span>Welcome!</span>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
