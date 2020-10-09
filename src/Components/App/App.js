import React from 'react';
import './App.css';
import PlaylistAndMusicPlayer from '../PlaylistAndMusicPlayer/PlaylistAndMusicPlayer';
import MusicInfoDisplay from '../MusicInfoDisplay/MusicInfoDisplay';
import MusicAppHeader from '../MusicAppHeader/MusicAppHeader';
import { ThemeProvider } from '@material-ui/core/styles';
import { MusicInfoContext, BaseMusicInfoState, readMusicFolder, clearAllMusic, resetFilter, filterByArtist, filterByAlbum } from '../../Contexts/MusicInfoContext';
import { CurrentlyPlayingContext, BaseCurrentlyPlayingState, setCurrentlyPlaying,
  togglePlayingAndAudio, setPlayTime, setVolume, adjustPlayingVolume, jumpToSongSpot,
  addArtistToPlayList, addAlbumToPlayList, addSongToPlayList,
  clearPlaylist, clearSelectedMusic, removeSongFromPlaylist } from '../../Contexts/CurrentlyPlayingContext';
import { SettingsContext, BaseSettingsState, toggleTheme } from '../../Contexts/SettingsContext';

class App extends React.Component {
  constructor(props) {
    super(props);

    // code for these functions is inside the currentlyPlaying context
    // used to set the state context
    let currentlyPlayingState = BaseCurrentlyPlayingState;
    currentlyPlayingState.setCurrentlyPlaying = setCurrentlyPlaying.bind(this);
    currentlyPlayingState.togglePlayingAndAudio = togglePlayingAndAudio.bind(this);
    currentlyPlayingState.setPlayTime = setPlayTime.bind(this);
    currentlyPlayingState.addArtistToPlayList = addArtistToPlayList.bind(this);
    currentlyPlayingState.addAlbumToPlayList = addAlbumToPlayList.bind(this);
    currentlyPlayingState.addSongToPlayList = addSongToPlayList.bind(this);
    currentlyPlayingState.clearPlaylist = clearPlaylist.bind(this);
    currentlyPlayingState.removeSongFromPlaylist = removeSongFromPlaylist.bind(this);
    currentlyPlayingState.clearSelectedMusic = clearSelectedMusic.bind(this);
    currentlyPlayingState.setVolume = setVolume.bind(this);
    currentlyPlayingState.adjustPlayingVolume = adjustPlayingVolume.bind(this);
    currentlyPlayingState.jumpToSongSpot = jumpToSongSpot.bind(this);
    
    let musicInfoState = BaseMusicInfoState;
    musicInfoState.clearLoadedMusic = clearAllMusic.bind(this);
    musicInfoState.readMusicFolder = readMusicFolder.bind(this);
    musicInfoState.resetFilter = resetFilter.bind(this);
    musicInfoState.filterByArtist = filterByArtist.bind(this);
    musicInfoState.filterByAlbum = filterByAlbum.bind(this);

    let settingsState = BaseSettingsState;
    settingsState.toggleTheme = toggleTheme.bind(this);
    
    this.state = {musicInfo: musicInfoState, currentlyPlaying: currentlyPlayingState, settings: settingsState};
  }

  render() {
    return (
      <ThemeProvider theme={this.state.settings.currentTheme}>
      <SettingsContext.Provider value={this.state.settings}>
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
      </SettingsContext.Provider>
      </ThemeProvider>
    );
  }
}

export default App;