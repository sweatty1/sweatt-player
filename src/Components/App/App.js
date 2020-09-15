import React from 'react';
import { Button }from '@material-ui/core';
import './App.css';
import PlaylistAndMusicPlayer from '../PlaylistAndMusicPlayer/PlaylistAndMusicPlayer';
import MusicInfoDisplay from '../MusicInfoDisplay/MusicInfoDisplay';
import { MusicInfoContext, BaseMusicInfoState, readMusicFolder, clearAllMusic } from '../../Contexts/MusicInfoContext';
import { CurrentlyPlayingContext, BaseCurrentlyPlayingState, setCurrentlyPlaying, togglePlayingAndAudio, setPlayTime, addSongToPlayList, clearPlaylist, clearSelectedMusic, removeSongFromPlaylist } from '../../Contexts/CurrentlyPlayingContext';
var { dialog } = window.require('electron').remote;

class App extends React.Component {
  constructor(props) {
    super(props);
    let currentlyPlayingState = BaseCurrentlyPlayingState; //what populates the value will use the default on createContext otherwise but only if no value is
    // code for these functions is inside the currentlyPlaying context
    // used to set the state context
    currentlyPlayingState.setCurrentlyPlaying = setCurrentlyPlaying.bind(this);
    currentlyPlayingState.togglePlayingAndAudio = togglePlayingAndAudio.bind(this);
    currentlyPlayingState.setPlayTime = setPlayTime.bind(this);
    currentlyPlayingState.addSongToPlayList = addSongToPlayList.bind(this);
    currentlyPlayingState.clearPlaylist = clearPlaylist.bind(this);
    currentlyPlayingState.removeSongFromPlaylist = removeSongFromPlaylist.bind(this);
    
    // set up other bindings for musicInfoContext used in events
    this.readMusicFolder = readMusicFolder.bind(this);
    this.clearLoadedMusic = clearAllMusic.bind(this);
    this.clearSelectedMusic = clearSelectedMusic.bind(this);

    this.state = {musicInfo: BaseMusicInfoState, currentlyPlaying: currentlyPlayingState};
  }

  handleSetBaseFolderForMusic = () => {
    dialog.showOpenDialog({ title: "Select Music Folder", properties: ['openDirectory']}).then((data) => {
      if (data.filePaths && data.filePaths[0] !== undefined) {
        const folder = data.filePaths[0];
        this.readMusicFolder(folder);
      } else {
        console.log("No folder selected");
      }
    });  
  };

  handleClearSelectedMusic = () => {
    this.clearSelectedMusic();
  }

  handleClearAllMusic = () => {
    this.clearSelectedMusic();
    this.clearLoadedMusic();
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
              <Button variant="contained" color="secondary" onClick={(event) => this.handleClearAllMusic()}>Empty the state Store</Button>
              <br/>
            </header>
            <div className="App-body">
            <CurrentlyPlayingContext.Provider value = {this.state.currentlyPlaying}>
              <PlaylistAndMusicPlayer/>
              <MusicInfoDisplay/>
            </CurrentlyPlayingContext.Provider>
            </div>
          </div>
        </MusicInfoContext.Provider>
      );
  }
}

export default App;