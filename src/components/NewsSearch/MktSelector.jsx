import React, { useState } from 'react';

const mktOptions = [
    { label: 'Argentina (Spanish)', value: 'es-AR' },
    { label: 'Australia (English)', value: 'en-AU' },
    { label: 'Austria (German)', value: 'de-AT' },
    { label: 'Belgium (Dutch)', value: 'nl-BE' },
    { label: 'Belgium (French)', value: 'fr-BE' },
    { label: 'Brazil (Portuguese)', value: 'pt-BR' },
    { label: 'Canada (English)', value: 'en-CA' },
    { label: 'Canada (French)', value: 'fr-CA' },
    { label: 'Chile (Spanish)', value: 'es-CL' },
    { label: 'Denmark (Danish)', value: 'da-DK' },
    { label: 'Finland (Finnish)', value: 'fi-FI' },
    { label: 'France (French)', value: 'fr-FR' },
    { label: 'Germany (German)', value: 'de-DE' },
    { label: 'Hong Kong SAR (Traditional Chinese)', value: 'zh-HK' },
    { label: 'India (English)', value: 'en-IN' },
    { label: 'Indonesia (English)', value: 'en-ID' },
    { label: 'Italy (Italian)', value: 'it-IT' },
    { label: 'Japan (Japanese)', value: 'ja-JP' },
    { label: 'Korea (Korean)', value: 'ko-KR' },
    { label: 'Malaysia (English)', value: 'en-MY' },
    { label: 'Mexico (Spanish)', value: 'es-MX' },
    { label: 'Netherlands (Dutch)', value: 'nl-NL' },
    { label: 'New Zealand (English)', value: 'en-NZ' },
    { label: 'Norway (Norwegian)', value: 'no-NO' },
    { label: "People's Republic of China (Chinese)", value: 'zh-CN' },
    { label: 'Poland (Polish)', value: 'pl-PL' },
    { label: 'Republic of the Philippines (English)', value: 'en-PH' },
    { label: 'Russia (Russian)', value: 'ru-RU' },
    { label: 'South Africa (English)', value: 'en-ZA' },
    { label: 'Spain (Spanish)', value: 'es-ES' },
    { label: 'Sweden (Swedish)', value: 'sv-SE' },
    { label: 'Switzerland (French)', value: 'fr-CH' },
    { label: 'Switzerland (German)', value: 'de-CH' },
    { label: 'Taiwan (Traditional Chinese)', value: 'zh-TW' },
    { label: 'Türkiye (Turkish)', value: 'tr-TR' },
    { label: 'United Kingdom (English)', value: 'en-GB' },
    { label: 'United States (English)', value: 'en-US' },
    { label: 'United States (Spanish)', value: 'es-US' },
];

const MktSelector = ({ value, onChange }) => {
    return (
        <div className="input-group">
            <label>Market</label>
            <select
                className="news-search-select"
                value={value}
                onChange={onChange}
            >
                {mktOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MktSelector;