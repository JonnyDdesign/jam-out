import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [
        {
          name: "Amerika's Most Wanted",
          artist: "2Pac",
          album: "Greatest Hits",
          id: 1,
        },
        {
          name: "Gin & Juice",
          artist: "Snoop",
          album: "Dog Pound",
          id: 2,
        },
      ],
      playlistName: "Summer Jams",
      playlistTracks: [
        {
          name: "Doin Time",
          artist: "Sublime",
          album: "Sublime",
          id: 3,
        },
        {
          name: "Golden",
          artist: "Harry Styles",
          album: "Fine Line",
          id: 4,
        },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  addTrack(track) {
    const foundTrack = this.state.playlistTracks.find(
      (playlistTrack) => playlistTrack.id === track.id
    );
    const newTrack = this.state.playlistTracks.concat(track);
    foundTrack ? console.log("Track already exists") : this.setState({ playlistTracks: newTrack })
  }

  removeTrack(track) {
    const isPresent = this.state.playlistTracks.filter(
      (playlistTrack) => playlistTrack.id !== track.id
    );
    this.setState({ playlistTracks: isPresent });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults
          searchResults={this.state.searchResults}
          onAdd={this.addTrack}
          />
          <Playlist
          playlistName={this.state.playlistName}
          playlistTracks={this.state.playlistTracks}
          onRemove={this.removeTrack}
          onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist}
          />
        </div>
      </div>
    </div>
    );
  }
}

export default App;
