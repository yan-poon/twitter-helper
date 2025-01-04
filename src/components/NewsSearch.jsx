import React, { useState, useEffect, useRef } from 'react';
import NewsSearchResult from './NewsSearchResult';

const API_KEY = process.env.REACT_APP_API_X_FUNCTIONS_KEY;
const MIN_CHARACTERS = 6;

const NewsSearch = () => {
    const [query, setQuery] = useState('');
    const [searchTextSuggestions, setSearchTextSuggestions] = useState([]);
    const [newsFeed, setNewsFeed] = useState([]);
    const isSelecting = useRef(false);

    useEffect(() => {
        if (query.length > MIN_CHARACTERS && !isSelecting.current && query.length%3 === 0) {
            fetchSuggestions(query);
        } else {
            setSearchTextSuggestions([]);
        }
        isSelecting.current = false;
    }, [query]);

    const fetchSuggestions = async (query) => {
        try {
            const response = await fetch(`https://one-leiaws-fa-python.azurewebsites.net/api/bing-autosuggest?q=${query}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-functions-key': API_KEY
                }
            });
            const data = await response.json();
            setSearchTextSuggestions(data.suggestions);
        } catch (error) {
            
        }
    };

    const handleSuggestionClick = (suggestion) => {
        isSelecting.current = true;
        setQuery(suggestion);
        setSearchTextSuggestions([]);
    };

    const handleSearch = async () => {
        setNewsFeed([]); // Clean up previous results
        const response = await fetch(`https://one-leiaws-fa-python.azurewebsites.net/api/bing-news-search?q=${query}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-functions-key': API_KEY
            }
        });
        const data = await response.json();
        setNewsFeed(data.news_feed);
    };

    return (
        <div>
            <h1>News Search</h1>
            <input
                type="text"
                placeholder="Search news..."
                style={{ width: '400px' }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {searchTextSuggestions.length > 0 && (
                <ul style={{ border: '1px solid #ccc', maxHeight: '150px', overflowY: 'auto', padding: '0', margin: '0', listStyleType: 'none' }}>
                    {searchTextSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{ padding: '8px', cursor: 'pointer', backgroundColor: '#fff' }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
            <div>
                {newsFeed.map((news, index) => (
                    <NewsSearchResult key={index} news={news} />
                ))}
            </div>
        </div>
    );
};

export default NewsSearch;