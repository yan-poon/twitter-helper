import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import TwitterShare from '../TwitterShare/TwitterShare';
import { fetchAISummaryAndTweetInfo } from '../../services/ApiService';
import './NewsSearchResult.css';

const formatDate = (datePublished) => {
    const date = new Date(datePublished);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year} ${hours}:${minutes}`;
};

const NewsSearchResult = ({ news, summaryLanguage="English", tweetLanguage="English" }) => {
    const [tweetInfo, setTweetInfo] = useState(null);
    const { getAccessTokenSilently } = useAuth0();

    const fetchTweetInfo = async () => {
        setTweetInfo(null);
        const accessToken = await getAccessTokenSilently();
        const response = await fetchAISummaryAndTweetInfo(news,summaryLanguage,tweetLanguage,accessToken)
        setTweetInfo(response.tweet);
    };

    return (
        <div className="news-container">
            <h2 className="news-title">{news.name}</h2>
            <p>{formatDate(news.datePublished)}</p>
            <p className="news-description">{news.description}</p>
            <p><a href={news.url} target="_blank" rel="noopener noreferrer" className="news-link">Read more</a></p>
            <button onClick={fetchTweetInfo}>Get Summary and Tweet Suggestion</button>
            {tweetInfo && (
                <TwitterShare tweetInfo={tweetInfo} news={news} />
            )}
        </div>
    );
};

export default NewsSearchResult;