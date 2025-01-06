import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import NewsSearchResult from '../NewsSearchResult/NewsSearchResult';
import { fetchAutoSuggest, fetchWebpages } from '../../services/ApiService';
import './WebpageSearch.css';

const MIN_CHARACTERS = 6;

const WebpageSearch = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [query, setQuery] = useState('');
    const [summaryLanguage, setSummaryLanguage] = useState('English');
    const [tweetLanguage, setTweetLanguage] = useState('English');
    const [searchTextSuggestions, setSearchTextSuggestions] = useState([]);
    const [webpages, setWebpages] = useState([]);
    const [resultCount, setResultCount] = useState(0); // State to keep track of the number of results
    const isSelecting = useRef(false);

    useEffect(() => {
        if (query.length > MIN_CHARACTERS && !isSelecting.current && query.length % 3 === 0) {
            fetchSuggestions(query);
        }
        isSelecting.current = false;
    }, [query]);

    const fetchSuggestions = async (query) => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetchAutoSuggest(query, accessToken)
            setSearchTextSuggestions(response.suggestions);
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
        setResultCount(0);
        if (query.trim().length === 0) {
            alert('Please enter a search query');
            return;
        }
        setWebpages([]); // Clean up previous results
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetchWebpages(query,accessToken);
            setWebpages(response.news_feed);
            setResultCount(response.count);
            if (response.count === 0) {
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

    const handleClearResults = () => {
        setWebpages([]);
        setResultCount(0);
    };

    return (
        <div className="news-search-container">
            <h1>Webpage Search</h1>
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
                    id="Search Topic"
                    placeholder="Search news..."
                    className="news-search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className="button-group">
                <button onClick={handleSearch} className="news-search-button">Search</button>
                <button onClick={handleClearResults} className="news-search-button">Clear Search Results</button>
            </div>
            {resultCount > 0 && (
                <div style={{ justifyContent: "flex-end", display: "flex" }}>
                    <p>{`Number of results: ${resultCount}`}</p>
                </div>
            )}
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
                {webpages.map((webpage, index) => (
                    <NewsSearchResult key={index} news={webpage} summaryLanguage={summaryLanguage} tweetLanguage={tweetLanguage} />
                ))}
            </div>
        </div>
    );
};

export default WebpageSearch;