import React from 'react';
import { useTranslation } from 'react-i18next';
import TwitterShare from '../TwitterShare/TwitterShare';
import SummaryContainer from '../Summary/Summary';
import './NewsSearchResult.css';

const NewsSearchResult = ({ news }) => {
    const { t } = useTranslation();
    
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
            <div>
                {news.name && (
                    <h2 className="news-title">{news.name}</h2>
                )}
                {news.datePublished && (
                        <p>{formatDate(news.datePublished)}</p>
                    )}
                {news.description && (
                    <p className="news-description">{news.description}</p>
                )}
                <div className='news-url'>
                    {news.tag && (
                        <span className={news.tag === 'WEBPAGE' ? 'tag-webpage' : 'tag-other'}>
                            {news.tag}
                        </span>
                    )}
                    <span><a href={news.url} target="_blank" rel="noopener noreferrer" className="news-link">{t('read_news')}</a></span>
                </div>
            </div>
            <SummaryContainer url={news.url} />
            <TwitterShare url={news.url} />
        </div>
    );
};

export default NewsSearchResult;