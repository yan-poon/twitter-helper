import React, { useState } from 'react';
import { fetchSummary } from '../../services/ApiService';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import './Summary.css';

const SummaryContainer = ({ url }) => {
    const [summary, setSummary] = useState('');
    const [summaryLanguage, setSummaryLanguage] = useState(localStorage.getItem('summaryLanguage') || 'English');
    const [loadingSummary, setLoadingSummary] = useState(false);

    const fetchSummaryFromApi = async () => {
        setLoadingSummary(true);
        setSummary('');
        const request = {
            'url': url
        }
        const response = await fetchSummary(request, summaryLanguage);
        setSummary(response.info);
        setLoadingSummary(false);
    };

    return (
        <div className="summary-container">
            <div className="language-button-group">
                <LanguageSelect
                    label="Summary Language"
                    value={summaryLanguage}
                    onChange={(e) => setSummaryLanguage(e.target.value)}
                />
                <button className="news-search-button" onClick={fetchSummaryFromApi}>Get Summary</button>
            </div>
            {loadingSummary && <p>Loading summary...</p>}
            {summary && (
                <div>
                    <h3>New Insight</h3>
                    {summary.newInsight.map((paragraph, index) => (<p key={index}>{paragraph}</p>))}

                    <h3>Summary</h3>
                    {summary.summary.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SummaryContainer;