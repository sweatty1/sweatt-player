import React from 'react';
import { Button }from '@material-ui/core';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
import { RenderTime } from '../../Utilities/TimeHandling';

// This could probably be a functional component
// although might be good idea to have both types
// also use
class MusicPlayer extends React.Component {
    // react useContext is for functional component only
    //  this is class components access to providers above via this line and this.context
    static contextType = CurrentlyPlayingContext;

    // in a functional component componentDidMount and willUnmount could be replaced with useEffect
    componentDidMount() {
        this.timerID = setInterval(
          () => this.halfTick(),
          1000      // 1 sec and .5 sec feel smooth, 1 sec feels behind at times .5 doubles amount of rerenders. 750 tick has hiccups 
        );
      }
    
      componentWillUnmount() {
        clearInterval(this.timerID);
      }
    
      halfTick() {
        const currentlyPlayingContext = this.context;
        if (currentlyPlayingContext.isPlaying && currentlyPlayingContext.songData !== null) {
            currentlyPlayingContext.setPlayTime();
        }
      }

    playOrPause() {
        return(
            <CurrentlyPlayingContext.Consumer>
                {({isPlaying, togglePlayingAndAudio}) => (
                    <Button variant="contained" color="primary" onClick={(event) => togglePlayingAndAudio()}>{isPlaying ? "Pause" : "Play" }</Button>
                )}
            </CurrentlyPlayingContext.Consumer>
        );
    }

    render() {
        const currentlyPlayingContext = this.context;
        if(currentlyPlayingContext.songData === null){
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