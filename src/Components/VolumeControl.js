import React, { useContext } from 'react';
import { CurrentlyPlayingContext } from '../Contexts/CurrentlyPlayingContext';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOff from '@material-ui/icons/VolumeOff';
import { Slider, Grid, Typography, Box, IconButton } from '@material-ui/core';

const volumeToggle = (volume, toggleMuteFunction) => {
    return(
        volume != 0 ? <IconButton onClick={() =>  toggleMuteFunction()}><VolumeUp/></IconButton> :
        <IconButton onClick={() => toggleMuteFunction()}><VolumeOff/></IconButton>    
    )
}

const VolumeControl = (props) => {
    const currentlyPlayingContext = useContext(CurrentlyPlayingContext);
    const [volumeTrail, setVolumeTrail] = React.useState(100);
    const [olderVolumeTrail, setOlderVolumeTrail] = React.useState();
    const style = {width: "inherit", height: "inherit"}
    const volumeDirection = props.orientation === 'vertical' ? "column-reverse" : "row";

    const toggleMute = () => {
        if (currentlyPlayingContext.volume === 0 && volumeTrail === 0) {
            // This is unique condition where we drag the bar to 0 so we have to look at previous volumetrail
            currentlyPlayingContext.setVolume(olderVolumeTrail);
        } else if (currentlyPlayingContext.volume === 0) {
          // When muted return to last volume state
          currentlyPlayingContext.setVolume(volumeTrail);
        } else if (currentlyPlayingContext.volume !== 0) {
          // Muting and saving the volume state
          // currentlyPlaying.volumeTrail = currentlyPlaying.volume; // not actually needed due to updateVolumeTrail
          currentlyPlayingContext.setVolume(0);
        }
    };

    // Have to have oldervolumetrial as we don't have onChangeStart for logging VolumeState with this slider
    const updateVolumeTrail = (event, newVolume) => {
        if(volumeTrail !== 0) {
            setOlderVolumeTrail(volumeTrail)
        }
        setVolumeTrail(newVolume);
    };


    return (
        <Grid container style={style} direction={volumeDirection}>
            <Grid item>
                {volumeToggle(currentlyPlayingContext.volume, toggleMute)}
            </Grid>
            <Grid item xs>
                <Slider value={currentlyPlayingContext.volume*100} onChange={(event, newVolume) => currentlyPlayingContext.setVolume(newVolume)} onChangeCommitted={updateVolumeTrail} orientation={props.orientation}/>
            </Grid>
            <Grid item>
                <Typography> <Box fontWeight="fontWeightBold">{Math.round(currentlyPlayingContext.volume * 100)}% </Box></Typography>
            </Grid>
        </Grid>
    )
}
export default VolumeControl;