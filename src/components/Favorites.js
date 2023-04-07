import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  const removeFromFavorites = (catId) => {
    const updatedFavorites = favorites.filter((cat) => cat.id !== catId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1>Favorite Cats</h1>
      {favorites.length === 0 ? (
        <p>No favorite cats added.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((cat) => (
            <div key={cat.id} className="favorite-cat">
              <img src={cat.url} alt={`Cat ${cat.id}`} />
              <button onClick={() => removeFromFavorites(cat.id)}>Remove from Favorites</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

  