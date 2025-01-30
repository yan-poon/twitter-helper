import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TwitterShare from '../TwitterShare/TwitterShare';
import SummaryContainer from '../Summary/Summary';
import './WebpageAnalysis.css';

const WebpageAnalysis = () => {
    const { t } = useTranslation();
    const [url, setUrl] = useState('');

    return (
        <div className="news-container">
            <div>
            <div className="input-group">
                    <label htmlFor="webpage-analysis">{t('webpage_analysis')}</label>
                    <input
                        type="text"
                        id="webpage-analysis"
                        placeholder="Put URL here..."
                        className="news-search-input"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
            </div>
            <SummaryContainer url={url} />
            <TwitterShare url={url} />
        </div>
    );
};

export default WebpageAnalysis;