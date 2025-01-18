import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchTweetInfo } from '../../services/ApiService';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import './TwitterShare.css';

const TwitterShare = ({ url }) => {
    const { t } = useTranslation();
    const [tweetInfo, setTweetInfo] = useState(null);
    const [tweetText, setTweetText] = useState(null);
    const [loadingTweet, setLoadingTweet] = useState(false);
    const [tweetLanguage, setTweetLanguage] = useState(localStorage.getItem('tweetLanguage') || 'English');
    const textareaRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('tweetLanguage', tweetLanguage);
    }, [tweetLanguage]);

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
                    label={t('tweet_language')}
                    value={tweetLanguage}
                    onChange={(e) => setTweetLanguage(e.target.value)}
                />
                <button className="news-search-button" onClick={fetchTweetInfoFromApi}>{t('get_twitter_share')}</button>
            </div>
            {loadingTweet && (
                <LoadingSpinner loading={loadingTweet} />
            )}
            {tweetInfo && (
                <div>
                    <h5>{t('suggest_hashtags')}</h5>
                    <textarea
                        value={tweetInfo.suggestHashtag.join(' ')}
                        readOnly
                        className="twitter-share-textarea"
                    />
                    <h5>{t('tweet_content')}</h5>
                    <textarea
                        ref={textareaRef}
                        value={tweetInfo.tweet}
                        onChange={(e) => setTweetText(e.target.value)}
                        rows={6}
                        className="twitter-share-textarea"
                    />
                    <div className="button-group">
                        <button onClick={shareOnTwitter} className="twitter-share-button">{t('share_on_twitter')}</button>
                    </div>
                    <div>
                        <h5>{t('instruction_to_image_gen_ai')}</h5>
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