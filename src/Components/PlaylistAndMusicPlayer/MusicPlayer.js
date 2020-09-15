import React from 'react';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
import { RenderTime } from '../../Utilities/TimeHandling';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import { IconButton } from '@material-ui/core';

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
                    isPlaying ? <IconButton onClick={(event) => togglePlayingAndAudio()}><PauseCircleFilledIcon/></IconButton> :
                    <IconButton onClick={(event) => togglePlayingAndAudio()}><PlayCircleFilledIcon/></IconButton>
                )}
            </CurrentlyPlayingContext.Consumer>
        );
    }

    render() {
        const currentlyPlayingContext = this.context;
        if(currentlyPlayingContext.songData === null){
            return(<h3>No Song Selected</h3>);
        }
        return (
            <span>
                <h3>Playing</h3>
                <div style={{alignItems: 'center', display: 'flex'}}>
                    {currentlyPlayingContext.songData.common.title}
                    {RenderTime(currentlyPlayingContext.playTime)} / {RenderTime(currentlyPlayingContext.songData.format.duration)}
                    {this.playOrPause()}
                </div>
            </span>
        )
    }
}
export default MusicPlayer;