import React from 'react';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
import { RenderTime } from '../../Utilities/TimeHandling';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import { IconButton, Container, Slider, Grid, Typography } from '@material-ui/core';

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
          500      // 1 sec and .5 sec feel smooth, 1 sec feels behind at times .5 may double amount of rerenders. 750 tick has hiccups 
        );
      }
    
      componentWillUnmount() {
        clearInterval(this.timerID);
      }
    
      halfTick() {
        const currentlyPlayingContext = this.context;
        if (currentlyPlayingContext.isPlaying && currentlyPlayingContext.songData !== null) {
            currentlyPlayingContext.setPlayTime();
            currentlyPlayingContext.adjustPlayingVolume();
        }
      }

    playOrPause() {
        return(
            <CurrentlyPlayingContext.Consumer>
                {({isPlaying, togglePlayingAndAudio}) => (
                    isPlaying ? <IconButton onClick={() => togglePlayingAndAudio()}><PauseCircleFilledIcon/></IconButton> :
                    <IconButton onClick={() => togglePlayingAndAudio()}><PlayCircleFilledIcon/></IconButton>
                )}
            </CurrentlyPlayingContext.Consumer>
        );
    }

    render() {
        const currentlyPlayingContext = this.context;
        if(currentlyPlayingContext.songData === null){
            return(<Typography variant="h5">No Song Selected</Typography>);
        }
        var songProgress = (currentlyPlayingContext.playTime/currentlyPlayingContext.songData.format.duration) * 100;
        return (
            <Container style={{alignItems: 'center'}}>
                <Typography variant="h5">
                    {currentlyPlayingContext.songData.common.title} {this.playOrPause()}
                </Typography>
                <div>
                    <Grid container spacing={2}>
                        <Grid item>
                            {RenderTime(currentlyPlayingContext.playTime)}
                        </Grid>
                        <Grid item xs>
                        <Slider value={songProgress} onChange={currentlyPlayingContext.jumpToSongSpot} />
                        </Grid>
                        <Grid item>
                            {RenderTime(currentlyPlayingContext.songData.format.duration)}
                        </Grid>
                    </Grid>
                </div>
            </Container>
        )
    }
}
export default MusicPlayer;