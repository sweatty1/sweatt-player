import React from 'react';
import { connect } from 'react-redux'
import logo from '../../logo.svg';
import { Button, Grid, Paper }from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import ArtistList from '../ArtistList/ArtistList'
import SongList from '../SongList/SongList'
import AlbumList from '../AlbumList/AlbumList'
import { artists, albums, songs } from '../../Selectors/selector';
import { createArtists } from '../../actions/artistActions';
import { createAlbums } from '../../actions/albumActions';
import { createSongs } from '../../actions/songActions';

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     artists: [{name: "Earth, Wind, and Fire"}, {name: "testBand2"}, {name: "another bandname"}],
  //     songs: [{name: "little grey is cute"}, {name: "big paw is badass"}],
  //     albums: [{name: "my cats are dope"}],
  //   }
  // }

  handleSetBaseFolderForMusic = (event, props) => {
    // const state =  orm.getEmptyState();
    // const { Album, Artist, Song } = orm.mutableSession(state);
    // props.dispatch(createArtist({name: "Cat Chaos", id: 1, albums: [1,3]}));
    
    var artistsToAdd = [{name: "Cat Chaos", id: 1, albums: [1,3]}, {name: "DoggoTime", id: 2, albums: [2]}, {name: "another bandname", id: 3}]
    props.dispatch(createArtists(artistsToAdd));
    var albumsToAdd = [{name: "my cats are dope", id: 1, artist: 1, songs:[1,2]}, {name: "I'm just a doggo", id: 2, artist: 2, songs:[3]}, {name: "Return of the cat", id: 3, artist: 1, songs:[4]}]
    props.dispatch(createAlbums(albumsToAdd));
    var songsToAdd = [{name: "little grey is cute", id: 1, album: 1}, {name: "big paw is badass", id: 2, album: 1}, {name: "Old Dog Ted", id: 3, album: 2}, {name: "sleep all day", id: 4, album: 3}]
    props.dispatch(createSongs(songsToAdd));
  };

  handleClearingMusic = (event, props) => { 
    props.dispatch({type: "RESET"});
  }

  render() {
    const { classes } = this.props;
    console.log(this.props)
      return (
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
                  <ArtistList artists={this.props.artists}/>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <AlbumList albums={this.props.albums}/>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                <SongList songs={this.props.songs}/>
                </Paper>
              </Grid>
            </Grid>
          </body>
        </div>
      );
  }
}

//{useState, useEffect } from react etc basic way to modify state
// const mapStateToProps = (state) => ({
//   artists: state.artists,
//   albums: state.albums,
//   songs: state.songs
// })

const mapStateToProps = (state) => ({
  artists: artists(state),
  albums: albums(state),
  songs: songs(state)
})

// connect up the state management via react-redux
App = connect(mapStateToProps)(App)

// then add the styling
App = withStyles(styles)(App);

export default App;


// state is non data flow think local or encapsulated neither parent or child has knowledge only the compent that owns it has knowledge
// state can be passed to children though if it chooses to
// props are dataflow