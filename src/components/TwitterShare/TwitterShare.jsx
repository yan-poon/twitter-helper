import React, { useState, useRef } from 'react';
import './TwitterShare.css';

const TwitterShare = ({ tweetInfo, news }) => {
    const [tweetText, setTweetText] = useState(`${tweetInfo.tweet}\n${tweetInfo.suggestHashtag.join(' ')}\n${news.url}`);
    const textareaRef = useRef(null);

    const shareOnTwitter = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(twitterUrl, '_blank');
    };

    return (
        <div className="container">
            <div>
                <p>{`Usefulness: ${tweetInfo.informative}/10 (10 out of 10 implies must share)`}</p>
                <p>Summary</p>
                <p>{tweetInfo.summary}</p>
            </div>
            <textarea
                ref={textareaRef}
                value={tweetText}
                onChange={(e) => setTweetText(e.target.value)}
                rows={10}
                className="textarea"
            />
            <button onClick={shareOnTwitter} className="button">Share on Twitter</button>
        </div>
    );
};

export default TwitterShare;