import React from 'react';
import { CurrentlyPlayingContext } from '../Contexts/CurrentlyPlayingContext';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOff from '@material-ui/icons/VolumeOff';
import { Slider, Grid, Typography, Box, IconButton } from '@material-ui/core';

const volumeToggle = (volume) => {
    return(
        <CurrentlyPlayingContext.Consumer>
        {({toggleMute}) => (
            volume != 0 ? <IconButton onClick={() =>  toggleMute()}><VolumeUp/></IconButton> :
            <IconButton onClick={() => toggleMute()}><VolumeOff/></IconButton>    
        )}
        </CurrentlyPlayingContext.Consumer>
    )
}

const VolumeControl = (props) => {
    let style = {width: "inherit", height: "inherit"}
    let volumeDirection = props.orientation === 'vertical' ? "column-reverse" : "row";
    return (
        <CurrentlyPlayingContext.Consumer>
        {({volume, setVolume, updateVolumeTrail}) => (
            <Grid container style={style} direction={volumeDirection}>
                <Grid item>
                    {volumeToggle(volume)}
                </Grid>
                <Grid item xs>
                    <Slider value={volume*100} onChange={setVolume} onChangeCommitted={updateVolumeTrail} orientation={props.orientation}/>
                </Grid>
                <Grid item>
                    <Typography> <Box fontWeight="fontWeightBold">{Math.round(volume * 100)}% </Box></Typography>
                </Grid>
            </Grid>
        )}
        </CurrentlyPlayingContext.Consumer>
    )
}
export default VolumeControl;