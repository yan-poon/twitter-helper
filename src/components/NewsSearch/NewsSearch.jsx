import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import MktSelector from './MktSelector'; 
import NewsSearchResult from '../NewsSearchResult/NewsSearchResult';
import { fetchNews } from '../../services/ApiService';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import './NewsSearch.css';

const NewsSearch = () => {
    const { t } = useTranslation();

    const { getAccessTokenSilently } = useAuth0();
    const [query, setQuery] = useState('');
    const [summaryLanguage, setSummaryLanguage] = useState(localStorage.getItem('summaryLanguage') || 'English');
    const [tweetLanguage, setTweetLanguage] = useState(localStorage.getItem('tweetLanguage') || 'English');
    const [newsFeed, setNewsFeed] = useState([]);
    const [resultCount, setResultCount] = useState(0); // State to keep track of the number of results
    const [selectedMarket, setSelectedMarket] = useState('en-US');
    const [loadingNews, setLoadingNews] = useState(false); // State to track loading status

    useEffect(() => {
        localStorage.setItem('summaryLanguage', summaryLanguage);
    }, [summaryLanguage]);

    useEffect(() => {
        localStorage.setItem('tweetLanguage', tweetLanguage);
    }, [tweetLanguage]);

    const handleSearch = async () => {
        setResultCount(0);
        if (query.trim().length === 0) {
            alert('Please enter a search query');
            return;
        }
        setNewsFeed([]); // Clean up previous results
        setLoadingNews(true);
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetchNews(query,selectedMarket,accessToken);
            setNewsFeed(response.news_feed);
            setResultCount(response.count);
            if (response.count === 0) {
                alert('No news was found');
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
        setLoadingNews(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleMarketChange = (event) => {
        setSelectedMarket(event.target.value);
    };

    const handleClearResults = () => {
        setNewsFeed([]);
        setResultCount(0);
    };

    return (
        <div className="news-search-container">
            <h1>{t('news_search')}</h1>
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
                <MktSelector value={selectedMarket} onChange={handleMarketChange} />
            <div className="button-group">
                <button onClick={handleSearch} className="news-search-button">{t('search')}</button>
                <button onClick={handleClearResults} className="news-search-button">{t('clear_search')}</button>
            </div>
            {loadingNews && <p>Loading news...</p>}
            {resultCount > 0 && (
                <div style={{ justifyContent: "flex-end", display: "flex" }}>
                    <p>{`Number of results: ${resultCount}`}</p>
                </div>
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