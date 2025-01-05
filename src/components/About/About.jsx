import React from 'react';
import { Link } from 'react-router-dom';

const About = ({ isAuthenticated }) => {
    return (
        <div>
            <h1>About Us</h1>
            <p>This is the About page of the Twitter Helper application.</p>
            {isAuthenticated ? <Link to="/news-search">Go to News Search</Link> : <p>Please log in to access the News Search page.</p>}
        </div>
    );
};

export default About;