import React from 'react';
import MusicPlayer from './MusicPlayer';
import { Grid }from '@material-ui/core';
import Playlist from './Playlist';

const PlaylistAndMusicPlayer = (props) => {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={6
                }>
                    <Playlist/>
                </Grid>
                <Grid item xs={6}>
                    <MusicPlayer/>
                </Grid>
            </Grid>
        </div>
    )
}
export default PlaylistAndMusicPlayer;