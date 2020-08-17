import React, { useState } from 'react';
import { Button, Grid, Paper }from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import ArtistList from '../ArtistList/ArtistList';
import SongList from '../SongList/SongList';
import AlbumList from '../AlbumList/AlbumList';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { MusicFolderReader } from '../../Utilities/MusicFolderReader';
var remote = window.require('electron').remote;
var { dialog } = remote;

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const emptyState = {
  artists: [],
  albums: [],
  songs: [],
  musicFolder: 'No folder',
  currentlyPlaying: undefined,
  // Setcurrentlyplaying has to be set in context of this inside the app
};

class App extends React.Component {
  constructor(props) {
    super(props);

    let baseState = emptyState; //what populates the value will use the default on createContext otherwise but only if no value is
    this.setCurrentlyPlaying = (song) => {
      this.setState({currentlyPlaying: {songData: song, audio: new Audio(song.fileLocation), isPlaying: false}});
    };
    this.toggleCurrentlyPlaying = () => {
      let updatedCurrentlyPlaying = this.state.currentlyPlaying;
      updatedCurrentlyPlaying.isPlaying = !updatedCurrentlyPlaying.isPlaying;
      this.setState(state => ({
        currentlyPlaying: updatedCurrentlyPlaying
        //currentlyPlaying: {isPlaying: !(state.currentlyPlaying.isPlaying), audio: state.currentlyPlaying.audio, songData: state.currentlyPlaying}
      }));
    };
    baseState.setCurrentlyPlaying = this.setCurrentlyPlaying;
    baseState.toggleCurrentlyPlaying = this.toggleCurrentlyPlaying;
    this.state = baseState;
  }

  handleSetBaseFolderForMusic = (event) => {
    dialog.showOpenDialog({ title: "Select Music Folder", properties: ['openDirectory']}).then((data) => {
      if (data.filePaths && data.filePaths[0] != undefined) {
        this.setState({musicFolder: data.filePaths[0]});
        const folder = data.filePaths[0];
        MusicFolderReader(folder).then(musicInformation => {
          this.setState(musicInformation);
        });
      } else {
        console.log("No folder selected");
      }
    });  
  };

  handleClearingMusic = (event) => {
    this.setState(emptyState)
  }

  render() {
    const { classes } = this.props;
      return (
        <MusicInfoContext.Provider value={this.state}>
          <div className="App">
            <header className="App-header">
              <MusicInfoContext.Consumer>
                {({musicFolder}) => (
                    <p>{musicFolder}</p>
                )}
              </MusicInfoContext.Consumer>
              <Button variant="contained" color="primary" onClick={(event) => this.handleSetBaseFolderForMusic(event)}>button to set file to look at music</Button>
              <br/>
              <Button variant="contained">button to reeset music selection</Button>
              <br/>
              <Button variant="contained" color="secondary" onClick={(event) => this.handleClearingMusic(event)}>Empty the state Store</Button>
              <br/>
            </header>
            <body className="App-body">
            <Paper className={classes.paper}>
              <MusicPlayer/>
            </Paper>
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
        </MusicInfoContext.Provider>
      );
  }
}


// then add the styling
App = withStyles(styles)(App);

export default App;