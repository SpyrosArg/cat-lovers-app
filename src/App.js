import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import CatList from './components/CatList';
import CatBreedList from './components/CatBreedList';
import Favorites from './components/Favorites';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/" activeClassName="active-link" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/breeds" activeClassName="active-link">
                Breeds
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites" activeClassName="active-link">
                Favorites
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<CatList />} />
          <Route path="/breeds" element={<CatBreedList />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
