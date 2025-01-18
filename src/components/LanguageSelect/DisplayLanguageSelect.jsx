import React from 'react';
import { useTranslation } from 'react-i18next';

const DisplayLanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <div className="language-select-container">
            <select onChange={changeLanguage} defaultValue={i18n.language}>
                <option value="en">English</option>
                <option value="zh-TW">繁體中文</option>
                <option value="zh-CN">简体中文</option>
                <option value="es">Español</option>
                <option value="ja">日本語</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
            </select>
        </div>
    );
};

export default DisplayLanguageSelector;