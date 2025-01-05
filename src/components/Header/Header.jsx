import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const Header = ({ isAuthenticated, isLoading }) => {
    return (
        <header className="header">
            <h1>Twitter Helper</h1>
            {!isLoading && (
                isAuthenticated ? <LogoutButton /> : <LoginButton />
            )}
        </header>
    );
};

export default Header;