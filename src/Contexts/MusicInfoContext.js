import { createContext } from 'react'
import { MusicFolderReader } from '../Utilities/MusicFolderReader';

//suppose to be able to give default values but never works for me
export const MusicInfoContext = createContext();

export const BaseMusicInfoState = {
  artists: [],
  albums: [],
  songs: [],
  filteredArtists: [],
  filteredAlbums: [],
  filteredSongs: [],
  musicFolder: 'No folder'
};

export function readMusicFolder(folder) {
  MusicFolderReader(folder).then(musicInformation => {
    let musicInfo = this.state.musicInfo
    musicInfo.musicFolder = folder;
    musicInfo.artists = musicInformation.artists;
    musicInfo.albums = musicInformation.albums;
    musicInfo.songs = musicInformation.songs;
    musicInfo.filteredArtists = musicInformation.artists;
    musicInfo.filteredAlbums = musicInformation.albums;
    musicInfo.filteredSongs = musicInformation.songs;
    this.setState({musicInfo});
  });
}

export function clearAllMusic() {
  let musicInfo = this.state.musicInfo;
  musicInfo.artists = [];
  musicInfo.albums = [];
  musicInfo.songs = [];
  musicInfo.filteredArtists = [];
  musicInfo.filteredAlbums = [];
  musicInfo.filteredSongs = [];
  musicInfo.musicFolder = 'No Folder';
  this.setState({musicInfo});
}

export function resetFilter(){
  let musicInfo = this.state.musicInfo;
  musicInfo.filteredArtists = musicInfo.artists;
  musicInfo.filteredAlbums = musicInfo.albums;
  musicInfo.filteredSongs = musicInfo.songs;
  this.setState({musicInfo});
}

export function filterByArtist(artist) {
  let musicInfo = this.state.musicInfo;
  let filteredSongs = musicInfo.songs.filter(song => song.songInfo.common.artist === artist)
  let filteredAlbums = filteredSongs.map(song => song.songInfo.common.album)
  musicInfo.filteredArtists = [artist];
  musicInfo.filteredAlbums = Array.from(new Set(filteredAlbums));
  musicInfo.filteredSongs = filteredSongs;
  this.setState({musicInfo});
}

export function filterByAlbum(album) {
  let musicInfo = this.state.musicInfo;
  let filteredSongs = musicInfo.songs.filter(song => song.songInfo.common.album === album)
  let filteredArtists = filteredSongs.map(song => song.songInfo.common.artist)
  musicInfo.filteredArtists = Array.from(new Set(filteredArtists));
  musicInfo.filteredAlbums = [album];
  musicInfo.filteredSongs = filteredSongs;
  this.setState({musicInfo});
}