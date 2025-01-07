import React, { useState } from 'react';
import { fetchTweetInfo, fetchSummary } from '../../services/ApiService';
import TwitterShare from '../TwitterShare/TwitterShare';
import SummaryContainer from '../Summary/SummaryContainer';
import './NewsSearchResult.css';

const NewsSearchResult = ({ news, summaryLanguage = "English", tweetLanguage = "English" }) => {
    const [tweetInfo, setTweetInfo] = useState(null);
    const [summary, setSummary] = useState('');
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [loadingTweet, setLoadingTweet] = useState(false);

    const fetchTweetInfoFromApi = async () => {
        setLoadingTweet(true);
        setTweetInfo(null);
        const response = await fetchTweetInfo(news, tweetLanguage);
        setTweetInfo(response.tweet);
        setLoadingTweet(false);
    };

    const fetchSummaryFromApi = async () => {
        setLoadingSummary(true);
        setSummary('');
        const response = await fetchSummary(news, summaryLanguage);
        setSummary(response.info);
        setLoadingSummary(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day} ${month} ${year} ${hours}:${minutes}`;
    };

    return (
        <div className="news-container">
            {news.name && (
                <h2 className="news-title">{news.name}</h2>
            )}
            {
                news.datePublished && (
                    <p>{formatDate(news.datePublished)}</p>
            )}
            {news.description && (
                <p className="news-description">{news.description}</p>
            )}
            <p><a href={news.url} target="_blank" rel="noopener noreferrer" className="news-link">Read more</a></p>
            <p><button className="news-search-button" onClick={fetchSummaryFromApi}>Get Summary</button></p>
            {loadingSummary && <p>Loading summary...</p>}
            {summary && <SummaryContainer summary={summary} />}
            <p><button className="news-search-button" onClick={fetchTweetInfoFromApi}>Get Tweet Suggestion</button></p>
            {loadingTweet && <p>Loading Tweet suggestion...</p>}
            {tweetInfo && (
                <TwitterShare tweetInfo={tweetInfo} news={news} />
            )}
        </div>
    );
};

export default NewsSearchResult;