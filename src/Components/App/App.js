import React from 'react';
import './App.css';
import PlaylistAndMusicPlayer from '../PlaylistAndMusicPlayer/PlaylistAndMusicPlayer';
import MusicInfoDisplay from '../MusicInfoDisplay/MusicInfoDisplay';
import MusicAppHeader from '../MusicAppHeader/MusicAppHeader';
import { MusicInfoContext, BaseMusicInfoState, readMusicFolder, clearAllMusic } from '../../Contexts/MusicInfoContext';
import { CurrentlyPlayingContext, BaseCurrentlyPlayingState, setCurrentlyPlaying, togglePlayingAndAudio, setPlayTime, addSongToPlayList, clearPlaylist, clearSelectedMusic, removeSongFromPlaylist } from '../../Contexts/CurrentlyPlayingContext';

class App extends React.Component {
  constructor(props) {
    super(props);
    let currentlyPlayingState = BaseCurrentlyPlayingState;
    // code for these functions is inside the currentlyPlaying context
    // used to set the state context
    currentlyPlayingState.setCurrentlyPlaying = setCurrentlyPlaying.bind(this);
    currentlyPlayingState.togglePlayingAndAudio = togglePlayingAndAudio.bind(this);
    currentlyPlayingState.setPlayTime = setPlayTime.bind(this);
    currentlyPlayingState.addSongToPlayList = addSongToPlayList.bind(this);
    currentlyPlayingState.clearPlaylist = clearPlaylist.bind(this);
    currentlyPlayingState.removeSongFromPlaylist = removeSongFromPlaylist.bind(this);
    currentlyPlayingState.clearSelectedMusic = clearSelectedMusic.bind(this);
    let musicInfoState = BaseMusicInfoState;
    musicInfoState.clearLoadedMusic = clearAllMusic.bind(this);
    musicInfoState.readMusicFolder = readMusicFolder.bind(this);

    this.state = {musicInfo: BaseMusicInfoState, currentlyPlaying: currentlyPlayingState};
  }

  render() {
    return (
      <MusicInfoContext.Provider value={this.state.musicInfo}>
      <CurrentlyPlayingContext.Provider value = {this.state.currentlyPlaying}>
        <div className="App">
          <MusicAppHeader/>
          <div className="App-body">
            <PlaylistAndMusicPlayer/>
            <MusicInfoDisplay/>
          </div>
        </div>
      </CurrentlyPlayingContext.Provider>
      </MusicInfoContext.Provider>
    );
  }
}

export default App;