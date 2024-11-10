import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Deploy from './pages/Deploy';



const App = () => {
  return (

      <Router>
        <div className="min-h-screen bg-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/deploy" element={<Deploy />} />
          </Routes>
        </div>
      </Router>

  );
};

export default App;