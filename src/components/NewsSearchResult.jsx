import React, { useState } from 'react';
import TwitterShare from './TwitterShare/TwitterShare';

const NewsSearchResult = ({ news }) => {
    const [tweetInfo, setTweetInfo] = useState(null);

    const fetchTweetInfo = async () => {
        const response = await fetch('https://one-leiaws-fa-python.azurewebsites.net/api/openai-tweet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-functions-key': process.env.REACT_APP_API_X_FUNCTIONS_KEY
            },
            body: JSON.stringify({
                name: news.name,
                description: news.description,
                url: news.url
            })
        });
        const data = await response.json();
        setTweetInfo(data.tweet);
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h2>{news.name}</h2>
            <p>{news.description}</p>
            <a href={news.url} target="_blank" rel="noopener noreferrer">Read more</a>
            <button onClick={fetchTweetInfo}>Get Tweet Info</button>
            {tweetInfo && (
                <TwitterShare tweetInfo={tweetInfo} news={news} />
            )}
        </div>
    );
};

export default NewsSearchResult;