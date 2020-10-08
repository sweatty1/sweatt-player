import React from 'react';
import { CurrentlyPlayingContext } from '../Contexts/CurrentlyPlayingContext';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { Slider, Grid, Typography, Box } from '@material-ui/core';

const VolumeControl = (props) => {
    let style = {width: "inherit", height: "inherit"}
    let volumeDirection = props.orientation === 'vertical' ? "column-reverse" : "row";
    return (
        <CurrentlyPlayingContext.Consumer>
        {({volume, setVolume}) => (
            <Grid container style={style} direction={volumeDirection}>
                <Grid item>
                    <VolumeUp />
                </Grid>
                <Grid item xs>
                    <Slider value={volume*100} onChange={setVolume} orientation={props.orientation}/>
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