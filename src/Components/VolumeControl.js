import React from 'react';
import { CurrentlyPlayingContext } from '../Contexts/CurrentlyPlayingContext';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { Slider, Grid } from '@material-ui/core';

const VolumeControl = (props) => {
    return (
        <div style={{width:200}}>
        <Grid container spacing={2}>
            <Grid item>
                <VolumeDown />
            </Grid>
            <Grid item xs>
            <CurrentlyPlayingContext.Consumer>
                {({volume, setVolume}) => (
                    <Slider value={volume*100} onChange={setVolume}/>
                )}
            </CurrentlyPlayingContext.Consumer>
            </Grid>
            <Grid item>
                <VolumeUp />
            </Grid>
        </Grid>
        </div>
    )
}
export default VolumeControl;