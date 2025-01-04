import React, { useState, useRef } from 'react';
import './TwitterShare.css';

const TwitterShare = ({ tweetInfo, news }) => {
    const [tweetText, setTweetText] = useState(tweetInfo.tweet);
    const textareaRef = useRef(null);

    const shareOnTwitter = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(twitterUrl, '_blank');
    };

    return (
        <div className="twitter-share-container">
            <div>
                <h4>Usefulness</h4>
                <p>{`${tweetInfo.informative}/10 (10 out of 10 implies must share)`}</p>
                <h4>Summary</h4>
                <p>{tweetInfo.summary}</p>
            </div>
            <div>
                <h4>AI suggestion</h4>
                <h5>Tweet</h5>
                <textarea
                    ref={textareaRef}
                    value={tweetText}
                    onChange={(e) => setTweetText(e.target.value)}
                    rows={10}
                    className="twitter-share-textarea"
                />
                <h5>Suggested Hashtag</h5>
                <textarea
                    value={tweetInfo.suggestHashtag.join(' ')}
                    readOnly
                    className="twitter-share-textarea"
                />
                <button onClick={shareOnTwitter} className="twitter-share-button">Share on Twitter</button>
            </div>
        </div>
    );
};

export default TwitterShare;