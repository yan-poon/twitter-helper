import React from 'react';

const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Traditional Chinese', label: '繁體中文' },
    { value: 'Simplified Chinese', label: '简体中文' },
    { value: 'Cantonese', label: '廣東話' },
    { value: '文言文', label: '文言文' },
    { value: 'Spanish', label: 'Español' },
    { value: 'French', label: 'Français' },
    { value: 'German', label: 'Deutsch' },
    { value: 'Italian', label: 'Italiano' },
    { value: 'Japanese', label: '日本語' },
    { value: 'Korean', label: '한국어' },
    { value: 'Portuguese', label: 'Português' },
    { value: 'Russian', label: 'Русский' },
    { value: 'Arabic', label: 'العربية' },
    { value: 'Turkish', label: 'Türkçe' },
    { value: 'Dutch', label: 'Nederlands' },
    { value: 'Polish', label: 'Polski' },
    { value: 'Swedish', label: 'Svenska' },
    { value: 'Danish', label: 'Dansk' },
    { value: 'Finnish', label: 'Suomi' },
    { value: 'Norwegian', label: 'Norsk' },
    { value: 'Czech', label: 'Čeština' },
    { value: 'Hungarian', label: 'Magyar' },
    { value: 'Romanian', label: 'Română' },
    { value: 'Greek', label: 'Ελληνικά' },
    { value: 'Indonesian', label: 'Bahasa Indonesia' },
    { value: 'Thai', label: 'ไทย' },
    { value: 'Hindi', label: 'हिन्दी' },
    { value: 'Hebrew', label: 'עברית' },
    { value: 'Vietnamese', label: 'Tiếng Việt' },
    { value: 'Malay', label: 'Bahasa Melayu' },
    { value: 'Tagalog', label: 'Tagalog' },
    { value: 'Ukrainian', label: 'Українська' }
];

const LanguageSelect = ({ label, value, onChange }) => {
    return (
        <div className="input-group">
            <label>{label}</label>
            <select
                className="news-search-select"
                value={value}
                onChange={onChange}
            >
                {languageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelect;