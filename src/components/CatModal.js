import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CatModal.css';


const CatModal = ({ cat, closeModal }) => {
  const [breedInfo, setBreedInfo] = useState(null);

  useEffect(() => {
    if (cat.breeds?.length > 0) {
      fetchBreedInfo(cat.breeds[0].id);
    }
  }, [cat]); 

  const fetchBreedInfo = async (breedId) => {
    try {
      const response = await axios.get(`https://api.thecatapi.com/v1/breeds/${breedId}`);
      setBreedInfo(response.data);
    } catch (error) {
      console.error('Error fetching breed information:', error);
    }
  };

  const addToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(cat);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    closeModal();
  };

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={cat.url} alt={`Cat ${cat.id}`} />
        {breedInfo && (
          <div>
            <h2>{breedInfo.name}</h2>
            <p>{breedInfo.description}</p>
          </div>
        )}
         <button onClick={addToFavorites} aria-label="Add to Favorites">Add to Favorites</button>
        <button onClick={closeModal} aria-label="Close">Close</button>
      </div>
    </div>
  );
};

export default CatModal;

