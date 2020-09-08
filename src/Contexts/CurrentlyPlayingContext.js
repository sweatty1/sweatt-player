import { createContext } from 'react'

//suppose to be able to give default values but never works for me
export const CurrentlyPlayingContext = createContext();

export const BaseCurrentlyPlayingState = {
  songData: null,
  audio: null,
  playTime: 0,
  isPlaying: false,
  currentPlaylist: []
};

export function setCurrentlyPlaying(song) {
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
  let currentlyPlaying = this.state.currentlyPlaying
  // currentlyPlaying.playTime = this.state.currentlyPlaying.audio.currentTime
  // or should i do my own tick
  currentlyPlaying.playTime = this.state.currentlyPlaying.audio.currentTime
  this.setState({currentlyPlaying});
}