import React from 'react';
import MusicPlayer from './MusicPlayer';
import { Grid, Container, Paper }from '@material-ui/core';
import Playlist from './Playlist';

const PlaylistAndMusicPlayer = (props) => {
    return (
        <Container maxWidth={false}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper>
                        <Playlist/>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <MusicPlayer/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
export default PlaylistAndMusicPlayer;