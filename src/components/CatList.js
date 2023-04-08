import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CatModal from './CatModal';

const CatList = ({ breedId, showLoadMore = true }) => {
  const [cats, setCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchCats = useCallback(async (page) => {
    const apiUrl = 'https://api.thecatapi.com/v1/images/search?api_key=live_t2KiIRsSzthnYXP9wZ11pnZHWmTVo3zETISZWqCeAj5IuV8nAcdYEFRnduMeL8vP';
    const params = {
      limit: 10,
      page,
      order: 'Random',
      breed_id: breedId,
    };

    try {
      setLoading(true);
      const response = await axios.get(apiUrl, { params });
      setCats((prevCats) => [...prevCats, ...response.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
        <button
          className="load-more-cats"
          onClick={loadMoreCats}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More Cats'}
        </button>
      )}
    </div>
  );
};

export default CatList;
