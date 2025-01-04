import React, { useRef } from 'react';

const TwitterShare = ({ tweetInfo, news }) => {
    const textareaRef = useRef(null);

    const shareOnTwitter = () => {
        const tweetText = textareaRef.current.value;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(twitterUrl, '_blank');
    };

    return (
        <div style={{ marginTop: '10px' }}>
            <div>
                <h4>Usefulness:</h4>
                <p>{`${tweetInfo.informative}/10 (10 out of 10 implies must share)`}</p>
                <h4>Summary</h4>
                <p>{tweetInfo.summary}</p>
            </div>
            <div>
                <h4>Tweet suggested by AI</h4>
                <textarea
                    ref={textareaRef}
                    value={`${tweetInfo.tweet}\n${tweetInfo.suggestHashtag.join(' ')}\n${news.url}`}
                    readOnly
                    rows={10}
                    style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                />
                <button onClick={shareOnTwitter} style={{ marginTop: '10px' }}>Share on Twitter</button>
            </div>

        </div>
    );
};

export default TwitterShare;