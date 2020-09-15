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

export function clearAllMusic() {
  let musicInfo = this.state.musicInfo;
  musicInfo.artists = [];
  musicInfo.albums = [];
  musicInfo.songs = [];
  musicInfo.musicFolder = 'No Folder';
  this.setState({musicInfo});
}