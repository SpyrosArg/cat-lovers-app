import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BreedModal from './BreedModal';

const CatBreedList = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/breeds');
      setBreeds(response.data);
    } catch (error) {
      console.error('Error fetching cat breeds:', error);
    }
  };

  const openBreedModal = (breedId) => {
    setSelectedBreed(breedId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Cat Breeds</h1>
      <ul className="breed-list">
        {breeds.map((breed) => (
          <li
            key={breed.id}
            onClick={() => openBreedModal(breed.id)}
            style={{ cursor: 'pointer' }}
          >
            {breed.name}
          </li>
        ))}
      </ul>
      {showModal && <BreedModal breedId={selectedBreed} closeModal={closeModal} />}
    </div>
  );
};

export default CatBreedList;

  