import React from 'react';
import ArtistList from './ArtistList';
import SongList from './SongList';
import AlbumList from './AlbumList';
import { Grid, Paper, Container }from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  // A note this extra container is needed as per https://github.com/mui-org/material-ui/issues/7466
  // where in material UI the grids seem to extend a little outwards beyond the screen causes a scrollbar to appear that moves slightly
const MusicInfoDisplay = (props) => {
    const classes = styles;
    return (
        <Container maxWidth={false}>
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
        </Container>
    )
}
export default MusicInfoDisplay;