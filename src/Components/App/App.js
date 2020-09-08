import React from 'react';
import { Button }from '@material-ui/core';
import './App.css';
import PlaylistAndMusicPlayer from '../PlaylistAndMusicPlayer/PlaylistAndMusicPlayer';
import MusicInfoDisplay from '../MusicInfoDisplay/MusicInfoDisplay';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
import { MusicFolderReader } from '../../Utilities/MusicFolderReader';
var remote = window.require('electron').remote;
var { dialog } = remote;

const BaseMusicInfoState = {
  artists: [],
  albums: [],
  songs: [],
  musicFolder: 'No folder'
};

const BaseCurrentlyPlayingState = {
  songData: null,
  audio: null,
  playTime: 0,
  isPlaying: false,
  currentPlaylist: []
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.setCurrentlyPlaying = (song) => {
      let currentlyPlaying = this.state.currentlyPlaying
      if(currentlyPlaying.audio !== null) {
        // make sure to stop old audio
        currentlyPlaying.audio.pause();
      }
      currentlyPlaying.playTime = 0;
      currentlyPlaying.isPlaying = false;
      
      // now new audio and data gets setup
      currentlyPlaying.songData = song.songInfo;
      currentlyPlaying.audio = new Audio(song.fileLocation);
      this.setState({currentlyPlaying});
    };
    this.togglePlayingAndAudio = () => {
      let updatedCurrentlyPlaying = this.state.currentlyPlaying;
      if(updatedCurrentlyPlaying.audio.paused) {
        updatedCurrentlyPlaying.audio.play();
      } else {
        updatedCurrentlyPlaying.audio.pause();
      }
      updatedCurrentlyPlaying.isPlaying = !updatedCurrentlyPlaying.audio.paused;
      this.setState(state => ({
        currentlyPlaying: updatedCurrentlyPlaying
      }));
    };
    this.setPlayTime = () => {
      let currentlyPlaying = this.state.currentlyPlaying
      // currentlyPlaying.playTime = this.state.currentlyPlaying.audio.currentTime
      // or should i do my own tick
      currentlyPlaying.playTime = this.state.currentlyPlaying.audio.currentTime
      this.setState({currentlyPlaying});
    }

    // Could cut out this stange object assign if I just recreate new objects
    let currentlyPlayingState = BaseCurrentlyPlayingState; //what populates the value will use the default on createContext otherwise but only if no value is
    currentlyPlayingState.setCurrentlyPlaying = this.setCurrentlyPlaying;
    currentlyPlayingState.togglePlayingAndAudio = this.togglePlayingAndAudio;
    currentlyPlayingState.setPlayTime = this.setPlayTime;
    this.state = {musicInfo: BaseMusicInfoState, currentlyPlaying: currentlyPlayingState};
  }

  handleSetBaseFolderForMusic = () => {
    dialog.showOpenDialog({ title: "Select Music Folder", properties: ['openDirectory']}).then((data) => {
      if (data.filePaths && data.filePaths[0] != undefined) {
        const folder = data.filePaths[0];
        MusicFolderReader(folder).then(musicInformation => {
          // I'm missing a cleaner solution
          let musicInfo = this.state.musicInfo
          musicInfo.musicFolder = data.filePaths[0];
          musicInfo.artists = musicInformation.artists;
          musicInfo.albums = musicInformation.albums;
          musicInfo.songs = musicInformation.songs;
          this.setState({musicInfo});
        });
      } else {
        console.log("No folder selected");
      }
    });  
  };

  handleClearSelectedMusic = () => {
    let currentlyPlaying = this.state.currentlyPlaying;
    currentlyPlaying.songData = null;
    currentlyPlaying.audio = null;
    currentlyPlaying.playTime = 0;
    currentlyPlaying.isPlaying = false;
    // manually resetting this allow for not having to reset the toggle / set functions
    this.setState({currentlyPlaying})
  }

  handleClearingAllMusic = () => {
    this.handleClearSelectedMusic();
    let musicInfo = this.state.musicInfo;
    musicInfo.artists = [];
    musicInfo.albums = [];
    musicInfo.songs = [];
    musicInfo.musicFolder = 'No Folder';
    this.setState({musicInfo})
  }

  render() {
      return (
        <MusicInfoContext.Provider value={this.state.musicInfo}>
          <div className="App">
            <header className="App-header">
              <MusicInfoContext.Consumer>
                {({musicFolder}) => (
                    <p>{musicFolder}</p>
                )}
              </MusicInfoContext.Consumer>
              <Button variant="contained" color="primary" onClick={(event) => this.handleSetBaseFolderForMusic()}>button to set file to look at music</Button>
              <br/>
              <Button variant="contained" onClick={(event) => this.handleClearSelectedMusic()}>button to reeset selected Song</Button>
              <br/>
              <Button variant="contained" color="secondary" onClick={(event) => this.handleClearingAllMusic()}>Empty the state Store</Button>
              <br/>
            </header>
            <body className="App-body">
            <CurrentlyPlayingContext.Provider value = {this.state.currentlyPlaying}>
              <PlaylistAndMusicPlayer/>
              <MusicInfoDisplay/>
            </CurrentlyPlayingContext.Provider>
            </body>
          </div>
        </MusicInfoContext.Provider>
      );
  }
}

export default App;