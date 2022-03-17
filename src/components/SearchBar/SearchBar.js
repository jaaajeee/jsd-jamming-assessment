import React, { useState, useEffect } from 'react';
import './SearchBar.css';

function SearchBar(props) {
  const initialSearchTerm = () =>
    String(window.localStorage.getItem('searchTerm') || '');
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    window.localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  async function handleSearch() {
    try {
      await props.searchSpotify(searchTerm);
    } catch (error) {
      console.warn(error);
      const clientId = '1dceb8831c90409b9872b61d0123e24a';
      const currentUrl = window.location.href;
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${currentUrl}`;
    }
  }

  async function handleKeyPress(e) {
    if (e.key === 'Enter') {
      await handleSearch();
    }
  }
    return (
      <div className="SearchBar">
        <input 
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter A Song, Album, or Artist"
          value={searchTerm}
        />
        <button className="SearchButton" onClick={handleSearch}>SEARCH</button>
      </div>
    );
  };
export default SearchBar;
