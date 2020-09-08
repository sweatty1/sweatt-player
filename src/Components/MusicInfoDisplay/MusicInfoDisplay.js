import React from 'react';
import ArtistList from './ArtistList';
import SongList from './SongList';
import AlbumList from './AlbumList';
import { Grid, Paper }from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const MusicInfoDisplay = (props) => {
    const classes = styles;
        return (
            <Grid container spacing={3}>
                <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <ArtistList/>
                </Paper>
                </Grid>
                <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <AlbumList/>
                </Paper>
                </Grid>
                <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <SongList/>
                </Paper>
                </Grid>
            </Grid>
        )
}
export default MusicInfoDisplay;