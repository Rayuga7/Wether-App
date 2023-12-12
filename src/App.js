// App.jsx
import React from 'react';
import ApiComponent from './ApiComponent'
import FavoritesComponent from './FavoritesComponent';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Navbar from './Navbar';



const App = () => {
  return (
    <Router>
      <div>
        <Navbar/>
        {/* Use Routes instead of Switch */}
        <Routes>
          <Route path="/" element={<ApiComponent />} />
          <Route path="/favorites" element={<FavoritesComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
