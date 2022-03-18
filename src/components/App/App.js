import { useState, useEffect } from 'react';
import './App.css';
import Spotify from '../../utils/Spotify.js';
import SearchBar from '../SearchBar/SearchBar.js'
import Playlist from '../Playlist/Playlist.js'
import SearchResults from '../SearchResults/SearchResults.js'



const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    Spotify.getAccessToken();
  }, [])

  const addTrack = (track) => {
    if(playlistTracks.find((prevTrack) => prevTrack.id === track.id)){
      return;
    };

    setPlaylistTracks([...playlistTracks, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter((prevTrack) => prevTrack.id !== track.id));
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name)
  };

  const savePlaylist = () => {
    Spotify.savePlaylist(playlistName, playlistTracks).then(() => {
      setPlaylistTracks([]);
      setPlaylistName('New Playlist');
    })
  };

  const search = (searchTerm) => {
    Spotify.search(searchTerm).then((tracks)=> {
      console.log(tracks);
      setSearchResults(tracks);
    });
  };

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search}/>
        <div className="App-playlist">
          <SearchResults 
            searchResults={searchResults}
            onAdd = {addTrack}
          />
          <Playlist 
          playlistName={playlistName} 
          playlistTracks={playlistTracks}
          onNameChange={updatePlaylistName}
          onRemove={removeTrack}
          onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}
export default App;