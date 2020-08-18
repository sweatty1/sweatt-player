import React from 'react';
import { Button, Grid, Paper }from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import ArtistList from '../ArtistList/ArtistList';
import SongList from '../SongList/SongList';
import AlbumList from '../AlbumList/AlbumList';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
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

const BaseMusicInfoState = {
  artists: [],
  albums: [],
  songs: [],
  musicFolder: 'No folder'
};

const BaseCurrentlyPlayingState = {
  songData: null,
  audio: null,
  playTime: 0,
  isPlaying: false
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.setCurrentlyPlaying = (song) => {
      let currentlyPlaying = this.state.currentlyPlaying
      currentlyPlaying.songData = song.songInfo;
      currentlyPlaying.audio = new Audio(song.fileLocation);
      this.setState({currentlyPlaying});
    };
    this.toggleCurrentlyPlaying = () => {
      let updatedCurrentlyPlaying = this.state.currentlyPlaying;
      updatedCurrentlyPlaying.isPlaying = !updatedCurrentlyPlaying.isPlaying;
      this.setState(state => ({
        currentlyPlaying: updatedCurrentlyPlaying
      }));
    };
    this.setPlayTime = () => {
      let currentlyPlaying = this.state.currentlyPlaying
      // currentlyPlaying.playTime = this.state.currentlyPlaying.audio.currentTime
      // or should i do my own tick
      currentlyPlaying.playTime = this.state.currentlyPlaying.audio.currentTime
      this.setState({currentlyPlaying});
    }

    // Could cut out this stange object assign if I just recreate new objects
    let currentlyPlayingState = BaseCurrentlyPlayingState; //what populates the value will use the default on createContext otherwise but only if no value is
    currentlyPlayingState.setCurrentlyPlaying = this.setCurrentlyPlaying;
    currentlyPlayingState.toggleCurrentlyPlaying = this.toggleCurrentlyPlaying;
    this.state = {musicInfo: BaseMusicInfoState, currentlyPlaying: currentlyPlayingState};
  }

  handleSetBaseFolderForMusic = (event) => {
    dialog.showOpenDialog({ title: "Select Music Folder", properties: ['openDirectory']}).then((data) => {
      if (data.filePaths && data.filePaths[0] != undefined) {
        const folder = data.filePaths[0];
        MusicFolderReader(folder).then(musicInformation => {
          // I'm missing a cleaner solution
          let musicInfo = this.state.musicInfo
          musicInfo.musicFolder = data.filePaths[0];
          musicInfo.artists = musicInformation.artists;
          musicInfo.albums = musicInformation.albums;
          musicInfo.songs = musicInformation.songs;
          this.setState({musicInfo});
        });
      } else {
        console.log("No folder selected");
      }
    });  
  };

  handleClearingMusic = (event) => {
    let musicInfo = this.state.musicInfo;
    musicInfo.artists = [];
    musicInfo.albums = [];
    musicInfo.songs = [];
    musicInfo.musicFolder = 'No Folder';
    let currentlyPlaying = this.state.currentlyPlaying;
    currentlyPlaying.songData = null;
    currentlyPlaying.audio = null;
    currentlyPlaying.playTime = 0;
    currentlyPlaying.isPlaying = false;
    // manually resetting this allow for not having to reset the toggle / set functions
    this.setState({musicInfo, currentlyPlaying})
  }

  render() {
    const { classes, currentlyPlaying } = this.props;
      return (
        <MusicInfoContext.Provider value={this.state.musicInfo}>
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
            <CurrentlyPlayingContext.Provider value = {this.state.currentlyPlaying}>
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
              </CurrentlyPlayingContext.Provider>
            </body>
          </div>
        </MusicInfoContext.Provider>
      );
  }
}

// then add the styling
App = withStyles(styles)(App);

export default App;