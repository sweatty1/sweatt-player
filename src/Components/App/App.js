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
import { SettingsContext, setupSettings, toggleTheme, setRootFolder, clearRootFolder } from '../../Contexts/SettingsContext';
import { findTheme } from '../../Utilities/Themes';

// renders twice because of strict mode, only occurs in development used to catch errors
class App extends React.Component {
  constructor(props) {
    super(props);

    if (this.state !== undefined)
    {
      return;
    }

    let settingsState = setupSettings();
    settingsState.toggleTheme = toggleTheme.bind(this);
    settingsState.setRootFolder = setRootFolder.bind(this);
    settingsState.clearRootFolder = clearRootFolder.bind(this);
    
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

    let musicInfoState = BaseMusicInfoState
    musicInfoState.clearLoadedMusic = clearAllMusic.bind(this);
    musicInfoState.readMusicFolder = readMusicFolder.bind(this);
    musicInfoState.resetFilter = resetFilter.bind(this);
    musicInfoState.filterByArtist = filterByArtist.bind(this);
    musicInfoState.filterByAlbum = filterByAlbum.bind(this);

    this.state = { musicInfo: musicInfoState, currentlyPlaying: currentlyPlayingState, settings: settingsState };
  }


  // Not happy with this. Think about if this should go here or above in constructor, or componentDidUpdate or elsewhere
  // although need to remember https://github.com/electron/electron/issues/22119
  // when you refresh app the FS quits working for that instance of electon, but no errors just quite
  // Fix should be in Electron v11.0.0-beta.12 so next full release
  componentDidMount() {
    this.state.currentlyPlaying.setVolume(50)
    if (this.state.settings.rootMusicFolder !== 'No folder') {
      this.state.musicInfo.readMusicFolder(this.state.settings.rootMusicFolder)
    }
  }

  render() {
    return (
      <ThemeProvider theme={findTheme(this.state.settings.currentTheme)}>
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