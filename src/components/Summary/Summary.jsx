import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchSummary } from '../../services/ApiService';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import './Summary.css';

const SummaryContainer = ({ url }) => {
    const { t } = useTranslation();
    const [summary, setSummary] = useState('');
    const [summaryLanguage, setSummaryLanguage] = useState(localStorage.getItem('summaryLanguage') || 'English');
    const [loadingSummary, setLoadingSummary] = useState(false);

    useEffect(() => {
        localStorage.setItem('summaryLanguage', summaryLanguage);
    }, [summaryLanguage]);

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
                    label={t('summary_language')}
                    value={summaryLanguage}
                    onChange={(e) => setSummaryLanguage(e.target.value)}
                />
                <button className="news-search-button" onClick={fetchSummaryFromApi}>{t('get_summary')}</button>
            </div>
            {loadingSummary && <p>Loading summary...</p>}
            {summary && (
                <div>
                    <h3>{t('new_insight')}</h3>
                    {summary.newInsight.map((paragraph, index) => (<p key={index}>{paragraph}</p>))}

                    <h3>{t('summary')}</h3>
                    {summary.summary.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SummaryContainer;