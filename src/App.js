import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NewsSearch from './components/NewsSearch/NewsSearch';
import About from './components/About/About';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import WebpageAnalysis from './components/WebpageAnalysis/WebpageAnalysis';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/news-search" element={<NewsSearch />} />
              <Route path="/webpage-analysis" element={<WebpageAnalysis />} />
              <Route path="/" element={<About />} />
              <Route path="*" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </I18nextProvider>
  );
}

export default App;
