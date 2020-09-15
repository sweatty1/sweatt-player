import { createContext } from 'react'

//suppose to be able to give default values but never works for me
export const CurrentlyPlayingContext = createContext();

export const BaseCurrentlyPlayingState = {
  songData: null,
  audio: null,
  playTime: 0,
  isPlaying: false,
  isPlayingFromPlaylist: false,
  indexOfSongFromPlaylist: 0,
  currentPlaylist: []
};

export function clearSelectedMusic() {
  let currentlyPlaying = this.state.currentlyPlaying;
  currentlyPlaying.songData = null;
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
  currentlyPlaying.audio = new Audio(song.fileLocation);
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
  if(currentlyPlaying.audio.ended && currentlyPlaying.isPlayingFromPlaylist) {
    const nextSongIndex = currentlyPlaying.indexOfSongFromPlaylist + 1;
    if (nextSongIndex < currentlyPlaying.currentPlaylist.length ) {
      const nextSong = currentlyPlaying.currentPlaylist[nextSongIndex];
      // the this is the binded this from where we bind setPlayTime in the main app.js
      currentlyPlaying.setCurrentlyPlaying(nextSong, true, nextSongIndex)
    }
  }
  this.setState({currentlyPlaying});
}

export function addArtistToPlayList() {

}

export function addAlbumToPlayList() {

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