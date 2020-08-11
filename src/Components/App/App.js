import React from 'react';
import { Button, Grid, Paper }from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import ArtistList from '../ArtistList/ArtistList'
import SongList from '../SongList/SongList'
import AlbumList from '../AlbumList/AlbumList'
import { createArtists } from '../../actions/artistActions';
import { createAlbums } from '../../actions/albumActions';
import { createSongs } from '../../actions/songActions';
import { StartContext } from '../../context';

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const initialState  = {
  artists: [{name: "Cat Chaos", id: 1, albums: [1,3]}, {name: "DoggoTime", id: 2, albums: [2]}, {name: "another bandname", id: 3}],
  albums: [{name: "my cats are dope", id: 1, artist: 1, songs:[1,2]}, {name: "I'm just a doggo", id: 2, artist: 2, songs:[3]}, {name: "Return of the cat", id: 3, artist: 1, songs:[4]}],
  songs: [{name: "little grey is cute", id: 1, album: 1}, {name: "big paw is badass", id: 2, album: 1}, {name: "Old Dog Ted", id: 3, album: 2}, {name: "sleep all day", id: 4, album: 3}]
}

class App extends React.Component {
  handleSetBaseFolderForMusic = (event, props) => {
    // var artistsToAdd = [{name: "Cat Chaos", id: 1, albums: [1,3]}, {name: "DoggoTime", id: 2, albums: [2]}, {name: "another bandname", id: 3}]
    // props.dispatch(createArtists(artistsToAdd));
    // var albumsToAdd = [{name: "my cats are dope", id: 1, artist: 1, songs:[1,2]}, {name: "I'm just a doggo", id: 2, artist: 2, songs:[3]}, {name: "Return of the cat", id: 3, artist: 1, songs:[4]}]
    // props.dispatch(createAlbums(albumsToAdd));
    // var songsToAdd = [{name: "little grey is cute", id: 1, album: 1}, {name: "big paw is badass", id: 2, album: 1}, {name: "Old Dog Ted", id: 3, album: 2}, {name: "sleep all day", id: 4, album: 3}]
    // props.dispatch(createSongs(songsToAdd));
  };

  handleClearingMusic = (event, props) => {
    // props.dispatch({type: "RESET"});
  }

  render() {
    const { classes } = this.props;
      return (
        <StartContext.Provider value={initialState}>
          <div className="App">
            <header className="App-header">
              <p>header</p>
              <Button variant="contained" color="primary" onClick={(event) => this.handleSetBaseFolderForMusic(event, this.props)}>button to set file to look at music</Button>
              <br/>
              <Button variant="contained">button to reeset music selection</Button>
              <br/>
              <Button variant="contained" color="secondary"  onClick={(event) => this.handleClearingMusic(event, this.props)}>Empty the state Store</Button>
              <br/>
            </header>
            <body className="App-body">
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
            </body>
          </div>
        </StartContext.Provider>
      );
  }
}


// then add the styling
App = withStyles(styles)(App);

export default App;


// state is non data flow think local or encapsulated neither parent or child has knowledge only the compent that owns it has knowledge
// state can be passed to children though if it chooses to
// props are dataflow