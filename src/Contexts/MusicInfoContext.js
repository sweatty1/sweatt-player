import { createContext } from 'react'
import { MusicFolderReader } from '../Utilities/MusicFolderReader';

//suppose to be able to give default values but never works for me
export const MusicInfoContext = createContext();

export const BaseMusicInfoState = {
  artists: [],
  albums: [],
  songs: [],
  musicFolder: 'No folder'
};

export function readMusicFolder(folder) {
  MusicFolderReader(folder).then(musicInformation => {
    let musicInfo = this.state.musicInfo
    musicInfo.musicFolder = folder;
    musicInfo.artists = musicInformation.artists;
    musicInfo.albums = musicInformation.albums;
    musicInfo.songs = musicInformation.songs;
    this.setState({musicInfo});
  });
}

export function clearSelectedMusic() {
  let currentlyPlaying = this.state.currentlyPlaying;
  currentlyPlaying.songData = null;
  currentlyPlaying.audio = null;
  currentlyPlaying.playTime = 0;
  currentlyPlaying.isPlaying = false;
  // manually resetting this allow for not having to reset the toggle / set functions
  this.setState({currentlyPlaying});
}

export function clearAllMusic() {
  this.clearSelectedMusic();
  let musicInfo = this.state.musicInfo;
  musicInfo.artists = [];
  musicInfo.albums = [];
  musicInfo.songs = [];
  musicInfo.musicFolder = 'No Folder';
  this.setState({musicInfo});
}