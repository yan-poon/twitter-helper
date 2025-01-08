import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const PageContent = () => {
    return (
        <div className="page-content">
            <div>Visit our pages:
                <ul>
                    <li><Link to="/news-search">News Search</Link></li>
                    <li><Link to="/webpage-analysis">Webpage Analysis</Link></li>
                </ul>
            </div>
        </div>
    );
}

const About = ({ isAuthenticated, isLoading }) => {
    return (
        <div className="about-container">
            <h1>About Us</h1>
            <p>This is the About page of the Twitter Helper application.</p>
            {!isLoading && (isAuthenticated ?
                <PageContent /> : <p>Please log in to access more services.</p>)}
        </div>
    );
};

export default About;