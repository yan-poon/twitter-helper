import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import './Header.css';

const Header = ({ isAuthenticated, isLoading }) => {
    return (
        <header className="header">
            <h1>Twitter Helper</h1>
            <nav>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    {!isLoading && isAuthenticated && (
                        <>
                            <li><Link to="/news-search">News Search</Link></li>
                            <li><Link to="/webpage-search">Webpage Search</Link></li>
                        </>
                    )}
                </ul>
            </nav>
            {!isLoading && (
                isAuthenticated ? <LogoutButton /> : <LoginButton />
            )}
        </header>
    );
};

export default Header;