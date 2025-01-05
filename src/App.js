import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NewsSearch from './components/NewsSearch/NewsSearch';
import About from './components/About/About';
import Header from './components/Header/Header';
import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticationGuard } from './components/AuthenticationGuard';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  return (
    <Router>
      <div className="App">
        <Header  isAuthenticated={isAuthenticated} isLoading={isLoading}/>
        <Routes>
          <Route path="/" element={<About isAuthenticated={isAuthenticated} />} />
          <Route path="/about" element={<About />} />
          <Route path="/news-search" element={<AuthenticationGuard component={NewsSearch}/>} />
          <Route path="*" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
