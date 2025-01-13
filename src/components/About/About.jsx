import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const PageContent = () => {
    return (
        <div className="page-content">
            <div>Explore our features:
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
            <h1>About Twitter Helper</h1>
        <p>Welcome to <span class="highlight">Twitter Helper</span>, the revolutionary tool for <strong>automating your news discovery</strong> and <strong>enhancing your Twitter SEO</strong>. Our service is tailored for those who want to:</p>
        
        <ul>
            <li><strong>Stay Informed:</strong> Effortlessly find the latest news stories on the internet, tailored to your interests.</li>
            <li><strong>Boost Engagement:</strong> Automatically generate SEO-optimized tweets to increase visibility and engagement on Twitter.</li>
        </ul>
        
        <p>With Twitter Helper, you can:</p>
        <ul>
            <li>Discover trending news without the hassle of manual searches.</li>
            <li>Create tweets that are not only informative but also optimized for search engines, helping you reach a broader audience.</li>
        </ul>
        
        <p>Our mission is to transform the way you interact with news and Twitter, making it <strong>easier, faster</strong>, and more <strong>effective</strong>. Whether you're a journalist, marketer, or just love staying updated, Twitter Helper is your go-to solution.</p>
        
        
            {!isLoading && (isAuthenticated ?
                <PageContent /> : <p>Join us today and turn your Twitter feed into a powerhouse of relevant, engaging content!</p>)}
        </div>
    );
};

export default About;