import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CatModal from './CatModal';

const CatList = () => {
  const [cats, setCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
      setCats(response.data);
    } catch (error) {
      console.error('Error fetching cats:', error);
    }
  };

  const loadMoreCats = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
      setCats([...cats, ...response.data]);
    } catch (error) {
      console.error('Error loading more cats:', error);
    }
  };

  const openCatModal = (cat) => {
    setSelectedCat(cat);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Random Cat Images</h1>
      <div className="cat-list">
        {cats.map((cat) => (
          <img
            key={cat.id}
            src={cat.url}
            alt={`Cat ${cat.id}`}
            onClick={() => openCatModal(cat)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
      <button onClick={loadMoreCats}>Load More Cats</button>
      {showModal && <CatModal cat={selectedCat} closeModal={closeModal} />}
    </div>
  );
};

export default CatList;
