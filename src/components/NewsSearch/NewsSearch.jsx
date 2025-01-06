import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import NewsSearchResult from '../NewsSearchResult/NewsSearchResult';
import { fetchAutoSuggest, fetchNews } from '../../services/ApiService';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import './NewsSearch.css';

const MIN_CHARACTERS = 6;

const NewsSearch = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [query, setQuery] = useState('');
    const [summaryLanguage, setSummaryLanguage] = useState('English');
    const [tweetLanguage, setTweetLanguage] = useState('English');
    const [searchTextSuggestions, setSearchTextSuggestions] = useState([]);
    const [newsFeed, setNewsFeed] = useState([]);
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
        setNewsFeed([]); // Clean up previous results
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetchNews(query,accessToken);
            setNewsFeed(response.news_feed);
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
        setNewsFeed([]);
        setResultCount(0);
    };

    return (
        <div className="news-search-container">
            <h1>News Search</h1>
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
                {newsFeed.map((news, index) => (
                    <NewsSearchResult key={index} news={news} summaryLanguage={summaryLanguage} tweetLanguage={tweetLanguage} />
                ))}
            </div>
        </div>
    );
};

export default NewsSearch;