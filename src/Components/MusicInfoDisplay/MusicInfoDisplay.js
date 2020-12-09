import React from 'react';
import ArtistList from './ArtistList';
import SongList from './SongList';
import AlbumList from './AlbumList';
import { Grid, Paper, Box }from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
  }));

  // A note this extra container is needed as per https://github.com/mui-org/material-ui/issues/7466
  // where in material UI the grids seem to extend a little outwards beyond the screen causes a scrollbar to appear that moves slightly
  // no longer needed but good to know about as container messed up keeping things to one page and getting the songlist to scoll
  // although having container did added 12px to each item which is now done manually
const MusicInfoDisplay = (props) => {
    const classes = styles;
    return (
        <Grid className="flex-control-row" spacing={3}>
            <Grid className="flex-control-column" item style={{padding: '12px'}} xs={4}>
            <Paper classes={{root: "flex-control-column", paper: classes.paper}}>
                <ArtistList/>
            </Paper>
            </Grid>
            <Grid className="flex-control-column" item style={{padding: '12px'}} xs={4}>
            <Paper classes={{root: "flex-control-column", paper: classes.paper}}>
                <AlbumList/>
            </Paper>
            </Grid>
            <Grid className="flex-control-column" item style={{padding: '12px'}} xs={4}>
            <Paper classes={{root: "flex-control-column", paper: classes.paper}}>
                <SongList/>
            </Paper>
            </Grid>
        </Grid>
    )
}
export default MusicInfoDisplay;