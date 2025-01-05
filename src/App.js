import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NewsSearch from './components/NewsSearch/NewsSearch';
import About from './components/About/About';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/news-search" element={<NewsSearch />} />
          <Route path="*" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
