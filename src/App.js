import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import RandomCatsView from './views/RandomCatsView';
import CatBreedsView from './views/CatBreedsView';
import FavoritesView from './views/FavoritesView';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/breeds">
                Breeds
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites">
                Favorites
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<RandomCatsView />} />
          <Route path="/breeds" element={<CatBreedsView />} />
          <Route path="/favorites" element={<FavoritesView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
