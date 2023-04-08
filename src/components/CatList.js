import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CatModal from './CatModal';

const CatList = ({ breedId, showLoadMore = true }) => {
  const [cats, setCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCats = useCallback(async (page) => {
    const apiUrl = 'https://api.thecatapi.com/v1/images/search';
    const params = {
      limit: 12,
      page,
      order: 'Random',
      breed_id: breedId,
    };

    try {
      const response = await axios.get(apiUrl, { params });
      setCats((prevCats) => [...prevCats, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  }, [breedId]);

  useEffect(() => {
    setCats([]);
    fetchCats(1);
  }, [fetchCats]);

  const loadMoreCats = () => {
    setCurrentPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchCats(nextPage);
      return nextPage;
    });
  };

  const handleCatSelect = (cat) => {
    setSelectedCat(cat);
  };

  const closeModal = () => {
    setSelectedCat(null);
  };

  return (
    <div className="cat-container">
      <div className="cat-list">
        {cats.map((cat) => (
          <img
            key={cat.id}
            src={cat.url}
            alt={`Cat ${cat.id}`}
            onClick={() => handleCatSelect(cat)}
          />
        ))}
      </div>
      {selectedCat && <CatModal cat={selectedCat} closeModal={closeModal} />}
      {showLoadMore && (
        <button className="load-more-cats" onClick={loadMoreCats}>
          Load More Cats
        </button>
      )}
    </div>
  );
};

export default CatList;
