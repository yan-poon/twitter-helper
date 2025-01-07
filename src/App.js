import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NewsSearch from './components/NewsSearch/NewsSearch';
import About from './components/About/About';
import Header from './components/Header/Header';
import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticationGuard } from './components/AuthenticationGuard';
import WebpageAnalysis from './components/WebpageAnalysis/WebpageAnalysis';
import Footer from './components/Footer/Footer';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} isLoading={isLoading} />
        <main className="main-content">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/news-search" element={<AuthenticationGuard component={NewsSearch} />} />
            <Route path="/webpage-analysis" element={<AuthenticationGuard component={WebpageAnalysis} />} />
            <Route path="/" element={<About />} />
            <Route path="*" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
