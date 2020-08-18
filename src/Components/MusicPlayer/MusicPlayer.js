import React from 'react';
import { Button }from '@material-ui/core';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
import { RenderTime } from '../../Utilities/TimeHandling';

class MusicPlayer extends React.Component {
    // react useContext is for functional component only
    //  this is class components access to providers above via this line and this.context
    static contextType = CurrentlyPlayingContext;
    
    togglePlaySong(event, songAudio, toggleCurrentlyPlaying) {
        if(songAudio.paused) {
            songAudio.play();
        } else {
            songAudio.pause();
        }
        toggleCurrentlyPlaying();
    }

    playOrPause() {
        return(
            <CurrentlyPlayingContext.Consumer>
                {({isPlaying, toggleCurrentlyPlaying, audio}) => (
                    <Button variant="contained" color="primary" onClick={(event) => this.togglePlaySong(event, audio, toggleCurrentlyPlaying)}>{isPlaying ? "Pause" : "Play" }</Button>
                )}
            </CurrentlyPlayingContext.Consumer>
        );
    }

    render() {
        const currentlyPlayingContext = this.context;
        if(currentlyPlayingContext.songData === null || currentlyPlayingContext.songData === undefined){
            return(<h1>No Song Selected</h1>);
        }
        // could use songAudio.duration but it starts out as NAN
        return (
            <span>
                <span>{currentlyPlayingContext.songData.common.title} </span>
                <span>{RenderTime(currentlyPlayingContext.playTime)} / {RenderTime(currentlyPlayingContext.songData.format.duration)}</span>
                <span>  {this.playOrPause()}</span>
            </span>
        )
    }
}
export default MusicPlayer;