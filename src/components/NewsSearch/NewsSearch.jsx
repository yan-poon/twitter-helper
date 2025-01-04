import React, { useState, useEffect, useRef } from 'react';
import NewsSearchResult from '../NewsSearchResult/NewsSearchResult';
import './NewsSearch.css';

const API_KEY = process.env.REACT_APP_API_X_FUNCTIONS_KEY;
const API_BASE_URL=process.env.REACT_APP_API_BASE_URL;
const MIN_CHARACTERS = 6;

const NewsSearch = () => {
    const [query, setQuery] = useState('');
    const [summaryLanguage, setSummaryLanguage] = useState('English');
    const [tweetLanguage, setTweetLanguage] = useState('English');
    const [searchTextSuggestions, setSearchTextSuggestions] = useState([]);
    const [newsFeed, setNewsFeed] = useState([]);
    const isSelecting = useRef(false);

    useEffect(() => {
        if (query.length > MIN_CHARACTERS && !isSelecting.current && query.length % 3 === 0) {
            fetchSuggestions(query);
        }
        isSelecting.current = false;
    }, [query]);

    const fetchSuggestions = async (query) => {
        try {
            const response = await fetch(`${API_BASE_URL}/bing-autosuggest?q=${query}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-functions-key': API_KEY
                }
            });
            const data = await response.json();
            setSearchTextSuggestions(data.suggestions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        isSelecting.current = true;
        setQuery(suggestion);
        setSearchTextSuggestions([]);
    };

    const handleSearch = async () => {
        setSearchTextSuggestions([]); // Close the dropdown of suggestion text
        if (query.trim().length === 0) {
            alert('Please enter a search query');
            return;
        }
        setNewsFeed([]); // Clean up previous results
        try {
            const response = await fetch(`${API_BASE_URL}/bing-news-search?q=${query}&count=100`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-functions-key': API_KEY
                }
            });
            const data = await response.json();
            setNewsFeed(data.news_feed);
            if (data.count === 0) {
                alert('No news was found');
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="news-search-container">
            <h1>News Search</h1>
            <div className="input-group">
                <label htmlFor="summary-language">Summary Language</label>
                <input
                    type="text"
                    id="summary-language"
                    placeholder="Summary Language"
                    className="news-search-input"
                    value={summaryLanguage}
                    onChange={(e) => setSummaryLanguage(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="tweet-language">Tweet Language</label>
                <input
                    type="text"
                    id="tweet-language"
                    placeholder="Tweet Language"
                    className="news-search-input"
                    value={tweetLanguage}
                    onChange={(e) => setTweetLanguage(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="search-news">Search News</label>
                <input
                    type="text"
                    id="search-news"
                    placeholder="Search news..."
                    className="news-search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <button onClick={handleSearch} className="news-search-button">Search</button>
            {searchTextSuggestions.length > 0 && (
                <ul className="suggestions-list">
                    {searchTextSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="suggestion-item"
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
            <div>
                {newsFeed.map((news, index) => (
                    <NewsSearchResult key={index} news={news} summaryLanguage={summaryLanguage} tweetLanguage={tweetLanguage}/>
                ))}
            </div>
        </div>
    );
};

export default NewsSearch;