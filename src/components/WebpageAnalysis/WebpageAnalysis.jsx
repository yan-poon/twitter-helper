import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import NewsSearchResult from '../NewsSearchResult/NewsSearchResult';
import { fetchWebpages } from '../../services/ApiService';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import './WebpageAnalysis.css';

const WebpageAnalysis = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [query, setQuery] = useState('');
    const [summaryLanguage, setSummaryLanguage] = useState(localStorage.getItem('summaryLanguage') || 'English');
    const [tweetLanguage, setTweetLanguage] = useState(localStorage.getItem('tweetLanguage') || 'English');
    const [webpage, setWebpage]= useState(null);

    useEffect(() => {
        localStorage.setItem('summaryLanguage', summaryLanguage);
    }, [summaryLanguage]);

    useEffect(() => {
        localStorage.setItem('tweetLanguage', tweetLanguage);
    }, [tweetLanguage]);

    const handleAnalysis = async () => {
        if (query.trim().length === 0) {
            alert('Please enter a search query');
            return;
        }
        const dataObj={
            url: query,
            name: '',
            description: '',
            datePublished:''
        }
        setWebpage(dataObj);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAnalysis();
        }
    };

    return (
        <div className="news-search-container">
            <h1>Webpage Analysis</h1>
            <LanguageSelect
                label="Summary Language"
                value={summaryLanguage}
                onChange={(e) => setSummaryLanguage(e.target.value)}
            />
            <LanguageSelect
                label="Tweet Language"
                value={tweetLanguage}
                onChange={(e) => setTweetLanguage(e.target.value)}
            />
            <div className="input-group">
                <label htmlFor="search-news">Study Website</label>
                <input
                    type="text"
                    id="Search Topic"
                    placeholder="Search Webpage"
                    className="news-search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className="button-group">
                <button onClick={handleAnalysis} className="news-search-button">Analyse</button>
            </div>
            {webpage&& (
                <NewsSearchResult news={webpage} summaryLanguage={summaryLanguage} tweetLanguage={tweetLanguage} />
            )}
        </div>
    );
};

export default WebpageAnalysis;