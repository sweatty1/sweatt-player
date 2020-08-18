import React from 'react';
import { Button }from '@material-ui/core';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
import { RenderTime } from '../../Utilities/TimeHandling';

class MusicPlayer extends React.Component {
    
    togglePlaySong(event, songAudio, toggleCurrentlyPlaying) {
        if(songAudio.paused) {
            songAudio.play();
        } else {
            songAudio.pause();
        }
        //READD THIS ELI TO UPDATE THE PAUSE AND PLAYH BUTTON
        toggleCurrentlyPlaying();
    }

    playOrPause(songAudio) {
        return(
            <CurrentlyPlayingContext.Consumer>
                {({isPlaying, toggleCurrentlyPlaying}) => (
                    <Button variant="contained" color="primary" onClick={(event) => this.togglePlaySong(event, songAudio, toggleCurrentlyPlaying)}>{isPlaying ? "Pause" : "Play" }</Button>
                )}
            </CurrentlyPlayingContext.Consumer>
        );
    }

    renderMusic(currentSongData, songAudio) {
        if(currentSongData === null || currentSongData === undefined){
            return(<h1>No Song Selected</h1>);
        }
        // could use songAudio.duration but it starts out as NAN
        return (
            <span>
                <span>{currentSongData.common.title} </span>
                <span>{RenderTime(songAudio.currentTime)} / {RenderTime(currentSongData.format.duration)}</span>
                <span>  {this.playOrPause(songAudio)}</span>
            </span>
        )
    }

    render() {
        return (
        <CurrentlyPlayingContext.Consumer>
            {({songData, audio}) => (
                <div>
                    {this.renderMusic(songData, audio)}
                </div>
            )}
        </CurrentlyPlayingContext.Consumer>
        );
    }
}
export default MusicPlayer;