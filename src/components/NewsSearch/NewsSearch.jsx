import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import MktSelector from './MktSelector';
import NewsSearchResult from '../NewsSearchResult/NewsSearchResult';
import { fetchNews, fetchWebpages } from '../../services/ApiService';
import './NewsSearch.css';

const NewsSearch = () => {
    const { t } = useTranslation();
    const { getAccessTokenSilently } = useAuth0();
    const [query, setQuery] = useState('');
    const [newsFeed, setNewsFeed] = useState([]);
    const [resultCount, setResultCount] = useState(0);
    const [selectedMarket, setSelectedMarket] = useState(localStorage.getItem('mkt') || 'en-US');
    const [loadingNews, setLoadingNews] = useState(false);

    useEffect(() => {
        localStorage.setItem('mkt', selectedMarket);
    }, [selectedMarket]);

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
            const response = await fetchWebpages(query, selectedMarket, accessToken, 500, 0);
            setNewsFeed(response.webpages);
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
        <div className="news-search-layout">
            <div className="news-search-container">
                <h1>{t('news_search')}</h1>
                <MktSelector value={selectedMarket} label={t('search_from_region')} onChange={handleMarketChange} />
                <div className="input-group">
                    <label htmlFor="search-news">{t('topic')}</label>
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
                    <button onClick={handleSearch} className="news-search-button">{t('search')}</button>
                    <button onClick={handleClearResults} className="news-search-button">{t('clear_search')}</button>
                </div>
                {loadingNews && ((
                    <LoadingSpinner loading={loadingNews} />
                ))}
                {resultCount > 0 && (
                    <div style={{ justifyContent: "flex-end", display: "flex" }}>
                        <p>{`${t('number_of_results')}: ${resultCount}`}</p>
                    </div>
                )}
            </div>
            <div className="news-results">
                {newsFeed.map((news, index) => (
                    <NewsSearchResult key={index} news={news} />
                ))}
            </div>
        </div>
    );
};

export default NewsSearch;