import React from 'react';
import MusicPlayer from './MusicPlayer';
import Playlist from './Playlist';
import VolumeControl from '../VolumeControl';
import { Grid, Paper, Box }from '@material-ui/core';

const PlaylistAndMusicPlayer = (props) => {
    return (
        <Box padding={2}>
            <Grid container justify="center" spacing={3}>
                <Grid item xs={6}>
                    <Paper>
                        <Playlist/>
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper>
                        <MusicPlayer/>
                    </Paper>
                </Grid>
                <Grid item xs={1} >
                    <Paper style={{height: "100%"}}>
                        <VolumeControl orientation="vertical"/>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}
export default PlaylistAndMusicPlayer;