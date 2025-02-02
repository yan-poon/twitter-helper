import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { fetchSummary } from '../../services/ApiService';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import AssistantTypeInput from '../AssistantType/AssistantTypeInput';
import ExtraInstructionInput from '../ExtraInstruction/ExtraInstructionInput';
import './Summary.css';

const SummaryContainer = ({ url }) => {
    const { t } = useTranslation();
    const [summary, setSummary] = useState('');
    const [summaryLanguage, setSummaryLanguage] = useState(localStorage.getItem('summaryLanguage') || 'English');
    const [summaryAssistantType, setSummaryAssistantType] = useState(localStorage.getItem('summaryAssistantType') || 'Professional Personal Assistant');
    const [summaryExtraInstruction, setSummaryExtraInstruction] = useState('');
    const [loadingSummary, setLoadingSummary] = useState(false);

    useEffect(() => {
        localStorage.setItem('summaryLanguage', summaryLanguage);
        localStorage.setItem('summaryAssistantType', summaryAssistantType);
    }, [summaryLanguage, summaryAssistantType]);

    const fetchSummaryFromApi = async () => {
        setLoadingSummary(true);
        setSummary('');
        const request = {
            url: url,
            extraInstruction: summaryExtraInstruction,
        }
        const response = await fetchSummary(request, summaryLanguage, summaryAssistantType);
        setSummary(response.info);
        setLoadingSummary(false);
    };
    const handleSummaryAssistantTypeChange = (e) => {
        setSummaryAssistantType(e.target.value);
    };
    const handleSummaryExtraInstructionChange = (e) => {
        setSummaryExtraInstruction(e.target.value);
    }

    return (
        <div className="summary-container">
            <div className="language-button-group">
                <LanguageSelect
                    label={t('summary_language')}
                    value={summaryLanguage}
                    onChange={(e) => setSummaryLanguage(e.target.value)}
                />
                <AssistantTypeInput
                    value={summaryAssistantType}
                    onChange={handleSummaryAssistantTypeChange}
                    placeholder={t('assistant_type')}
                    label={t('assistant_type')}
                />
                <ExtraInstructionInput
                    value={summaryExtraInstruction}
                    onChange={handleSummaryExtraInstructionChange}
                    placeholder={t('extra_instruction')}
                    label={t('extra_instruction')}
                />
                <button className="news-search-button" onClick={fetchSummaryFromApi}>{t('get_summary')}</button>
            </div>
            {loadingSummary && (
                <LoadingSpinner loading={loadingSummary} />
            )}
            {summary && (
                <div>
                    <h3>{t('new_insight')}</h3>
                    {summary.newInsight.map((paragraph, index) => (<p key={index}>{paragraph}</p>))}

                    <h3>{t('summary')}</h3>
                    {summary.summary.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                    <h3>{t('future_opportunity')}</h3>
                    {summary.futureOpportunity && (summary.futureOpportunity.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>)
                    ))}
                </div>
            )}
        </div>
    );
};

export default SummaryContainer;