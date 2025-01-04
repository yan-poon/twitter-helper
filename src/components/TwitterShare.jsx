import React from 'react';

const TwitterShare = ({ tweetInfo, news }) => {
    const shareOnTwitter = () => {
        const tweetText = `${tweetInfo.tweet}\n${tweetInfo.suggestHashtag.join(', ')}\n${news.url}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(twitterUrl, '_blank');
    };

    return (
        <div style={{ marginTop: '10px' }}>
            <textarea
                value={`${tweetInfo.tweet}\n${tweetInfo.suggestHashtag.join(', ')}\n${news.url}`}
                readOnly
                rows={10}
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
            />
            <button onClick={shareOnTwitter} style={{ marginTop: '10px' }}>Share on Twitter</button>
        </div>
    );
};

export default TwitterShare;