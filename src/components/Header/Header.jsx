import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Header.css';
import DisplayLanguageSelector from '../LanguageSelect/DisplayLanguageSelect';

const Header = ({}) => {
    const { t } = useTranslation();

    return (
        <header className="header">
            <h1><Link to="/news-search" className="header-title-link">
                Twitter Helper
            </Link></h1>
            <nav>
                <ul>
                    <li><Link to="/about">{t('about')}</Link></li>
                    <li><Link to="/news-search">{t('news_search')}</Link></li>
                    <li><Link to="/webpage-analysis">{t('webpage_analysis')}</Link></li>   
                </ul>
                <DisplayLanguageSelector />
            </nav>
        </header>
    );
};

export default Header;