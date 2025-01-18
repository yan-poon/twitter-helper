import React, { useState, useRef } from 'react';
import { fetchTweetInfo } from '../../services/ApiService';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import './TwitterShare.css';

const TwitterShare = ({ url }) => {
    const [tweetInfo, setTweetInfo] = useState(null);
    const [tweetText, setTweetText] = useState(null);
    const [loadingTweet, setLoadingTweet] = useState(false);
    const [tweetLanguage, setTweetLanguage] = useState(localStorage.getItem('tweetLanguage') || 'English');
    const textareaRef = useRef(null);

    const fetchTweetInfoFromApi = async () => {
        setLoadingTweet(true);
        setTweetInfo(null);
        const request = {
            'name': '',
            'description':'',
            'url': url
        }
        const response = await fetchTweetInfo(request, tweetLanguage);
        setTweetInfo(response.tweet);
        setTweetText(response.tweet.tweet);
        setLoadingTweet(false);
    };

    const shareOnTwitter = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(twitterUrl, '_blank');
    };

    return (
        <div className="twitter-share-container">
            <div className="language-button-group">
                <LanguageSelect
                    label="Tweet Language"
                    value={tweetLanguage}
                    onChange={(e) => setTweetLanguage(e.target.value)}
                />
                <button className="news-search-button" onClick={fetchTweetInfoFromApi}>Get Tweet Suggestion</button>
            </div>
            {loadingTweet && <p>Loading Tweet suggestion...</p>}
            {tweetInfo && (
                <div>
                    <h5>Tweet</h5>
                    <textarea
                        ref={textareaRef}
                        value={tweetInfo.tweet}
                        onChange={(e) => setTweetText(e.target.value)}
                        rows={6}
                        className="twitter-share-textarea"
                    />
                    <h5>Suggested Hashtag</h5>
                    <textarea
                        value={tweetInfo.suggestHashtag.join(' ')}
                        readOnly
                        className="twitter-share-textarea"
                    />
                    <div className="button-group">
                        <button onClick={shareOnTwitter} className="twitter-share-button">Share on Twitter</button>
                    </div>
                    <div>
                        <h5>Suggested Instruction for Image Gen AI</h5>
                        <textarea
                            value={tweetInfo.instrToImageAI}
                            readOnly
                            rows={6}
                            className="twitter-share-textarea"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TwitterShare;