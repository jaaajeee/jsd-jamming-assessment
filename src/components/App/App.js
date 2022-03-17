import { useState, useEffect } from 'react';

import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../utils/Spotify';

function App() {
  const [searchTracks, setSearchTracks] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [spotifyToken, setSpotifyToken] = useState(null);

  useEffect(() => {
    const spotifyTokenFromUrlFragment = window.location.hash
      .split('&')[0]
      .substring(14);
    setSpotifyToken(spotifyTokenFromUrlFragment);
  }, []);

  function searchSpotify(searchTerms) {
    const results = Spotify.search(searchTerms, spotifyToken);
    setSearchTracks(results);
  }

  function createSpotifyPlaylist(name, trackIds) {
    Spotify.createPlaylist(name, trackIds, spotifyToken);
    setPlaylistTracks([]);
  }

  function addTrackToPlaylist(track) {
    setPlaylistTracks((oldPlaylistTracks) => {
      if (oldPlaylistTracks.includes(track)) {
        return oldPlaylistTracks;
      } else {
        return [...oldPlaylistTracks, track];
      }
    });
  }

  function removeTrackFromPlaylist(track) {
    setPlaylistTracks((oldPlaylistTracks) =>
      oldPlaylistTracks.filter((t) => track !== t)
    );
  }


  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar searchSpotify={searchSpotify}/>
        <div className="App-playlist">
         <SearchResults tracks={searchTracks}
            addTrackToPlaylist={addTrackToPlaylist}/>
         <Playlist tracks={playlistTracks}
            removeTrackFromPlaylist={removeTrackFromPlaylist}
            createSpotifyPlaylist={createSpotifyPlaylist}/> 
        </div>
      </div>
    </div>
  );
};

export default App;
