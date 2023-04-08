import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CatList from './CatList';

const BreedModal = ({ breedId, breedName, closeModal }) => {
  const [breedImages, setBreedImages] = useState([]);

  useEffect(() => {
    const fetchBreedImages = async () => {
      try {
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=10`);
        setBreedImages(response.data);
      } catch (error) {
        console.error('Error fetching breed images:', error);
      }
    };

    fetchBreedImages();
  }, [breedId]);

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{breedName}</h2>
        <div className="breed-images">
          {breedImages.map((cat) => (
            <img key={cat.id} src={cat.url} alt={`Cat ${cat.id}`} />
          ))}
        </div>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default BreedModal;
