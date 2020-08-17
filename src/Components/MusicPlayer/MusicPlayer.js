import React from 'react';
import { Button }from '@material-ui/core';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';

class MusicPlayer extends React.Component {
    static contextType = MusicInfoContext;

    togglePlaySong(event, song, toggleCurrentlyPlaying) {
        if(song.isPlaying) {
            song.audio.pause();
        } else {
            song.audio.play();
        }
        toggleCurrentlyPlaying();
    }

    playOrPause(song) {
        return(
            <MusicInfoContext.Consumer>
                {({toggleCurrentlyPlaying}) => (
                    <Button variant="contained" color="primary" onClick={(event) => this.togglePlaySong(event, song, toggleCurrentlyPlaying)}>{song.isPlaying ? "Pause" : "Play" }</Button>
                )}
            </MusicInfoContext.Consumer>
        );
    }

    renderMusic(currentSongData) {
        if(currentSongData === undefined){
            return(<h1>No Song Selected</h1>);
        }
        return (
            <span>
                <span>{currentSongData.songData.songInfo.common.title} </span>
                <span>{currentSongData.audio.duration} {currentSongData.audio.currentTime}</span>
                <span>{this.playOrPause(currentSongData)}</span>
            </span>
        )
    }

    render() {
        return (
        <MusicInfoContext.Consumer>
            {({currentlyPlaying}) => (
                <div>
                    {this.renderMusic(currentlyPlaying)}
                </div>
            )}
        </MusicInfoContext.Consumer>
        );
    }
}
export default MusicPlayer;