import { createContext } from 'react'

//suppose to be able to give default values but never works for me
export const CurrentlyPlayingContext = createContext();

export const BaseCurrentlyPlayingState = {
  songData: null,
  albumArts: null,
  audio: null,
  playTime: 0,
  isPlaying: false,
  isPlayingFromPlaylist: false,
  indexOfSongFromPlaylist: 0,
  currentPlaylist: [],
  volume: 1
};

export function clearSelectedMusic() {
  let currentlyPlaying = this.state.currentlyPlaying;
  currentlyPlaying.songData = null;
  if(currentlyPlaying.audio !== null) {
    // make sure to stop old audio
    currentlyPlaying.audio.pause();
  }
  currentlyPlaying.albumArts = null;
  currentlyPlaying.audio = null;
  currentlyPlaying.playTime = 0;
  currentlyPlaying.isPlaying = false;
  currentlyPlaying.isPlayingFromPlaylist = false;
  currentlyPlaying.indexOfSongFromPlaylist = 0;
  currentlyPlaying.currentPlaylist = [];
  // manually resetting this allow for not having to reset the toggle / set functions
  this.setState({currentlyPlaying});
}

export function setCurrentlyPlaying(song, isPlayingFromPlaylist, indexOfSongFromPlaylist) {
  let currentlyPlaying = this.state.currentlyPlaying;
  if(currentlyPlaying.audio !== null) {
    // make sure to stop old audio
    currentlyPlaying.audio.pause();
  }
  currentlyPlaying.playTime = 0;
  currentlyPlaying.isPlaying = true;
  currentlyPlaying.isPlayingFromPlaylist = isPlayingFromPlaylist;
  if (isPlayingFromPlaylist) {
    currentlyPlaying.indexOfSongFromPlaylist = indexOfSongFromPlaylist;
  }
  
  // now new audio and data gets setup
  currentlyPlaying.songData = song.songInfo;
  currentlyPlaying.albumArts = song.albumArts;
  currentlyPlaying.audio = new Audio(song.fileLocation);
  currentlyPlaying.audio.volume = currentlyPlaying.volume;
  currentlyPlaying.audio.play();
  this.setState({currentlyPlaying});
};

export function togglePlayingAndAudio() {
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

export function setPlayTime() {
  let currentlyPlaying = this.state.currentlyPlaying;
  // currentlyPlaying.playTime = this.state.currentlyPlaying.audio.currentTime
  // or should i do my own tick
  currentlyPlaying.playTime = this.state.currentlyPlaying.audio.currentTime;
  if(currentlyPlaying.audio.ended) { 
    currentlyPlaying.isPlaying = false;
  }
  let nextPlaylistSongIndex = currentlyPlaying.indexOfSongFromPlaylist + 1;
  if(currentlyPlaying.audio.ended && currentlyPlaying.isPlayingFromPlaylist && nextPlaylistSongIndex < currentlyPlaying.currentPlaylist.length) {
      const nextSong = currentlyPlaying.currentPlaylist[nextPlaylistSongIndex];
      // the this is the binded this from where we bind setPlayTime in the main app.js
      currentlyPlaying.setCurrentlyPlaying(nextSong, true, nextPlaylistSongIndex)
  }
  this.setState({currentlyPlaying});
}

// Occurs anytime the slider is moved
export function setVolume(newVolume) {
  let currentlyPlaying = this.state.currentlyPlaying;
  currentlyPlaying.volume = newVolume/100;
  this.setState({currentlyPlaying})
}

export function adjustPlayingVolume() {
  let currentlyPlaying = this.state.currentlyPlaying;
  currentlyPlaying.audio.volume = currentlyPlaying.volume;
}

export function jumpToSongSpot(event, songSpot) {
  let currentlyPlaying = this.state.currentlyPlaying;
  currentlyPlaying.audio.currentTime = songSpot/100 * currentlyPlaying.songData.format.duration;
}

export function addArtistToPlayList(artist) {
  let musicInfo = this.state.musicInfo
  let filteredSongs = musicInfo.songs.filter(song => song.songInfo.common.artist === artist)
  let currentlyPlaying = this.state.currentlyPlaying;
  currentlyPlaying.currentPlaylist = currentlyPlaying.currentPlaylist.concat(filteredSongs);
  this.setState({currentlyPlaying});
}

export function addAlbumToPlayList(album) {
  let musicInfo = this.state.musicInfo;
  let filteredSongs = musicInfo.songs.filter(song => song.songInfo.common.album === album)
  let currentlyPlaying = this.state.currentlyPlaying;
  currentlyPlaying.currentPlaylist = currentlyPlaying.currentPlaylist.concat(filteredSongs); // think this will reset the currently playing/inprogress
  this.setState({currentlyPlaying});
}

export function addSongToPlayList(song) {
  let currentlyPlaying = this.state.currentlyPlaying;
  currentlyPlaying.currentPlaylist.push(song);
  this.setState({currentlyPlaying});
}

export function removeSongFromPlaylist(index) {
  let currentlyPlaying = this.state.currentlyPlaying;
  currentlyPlaying.currentPlaylist.splice(index, 1);
  this.setState({currentlyPlaying});
}

export function clearPlaylist() {
  let currentlyPlaying = this.state.currentlyPlaying;
  currentlyPlaying.currentPlaylist = [];
  this.setState({currentlyPlaying});
}