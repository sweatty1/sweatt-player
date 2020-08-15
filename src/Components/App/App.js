import React from 'react';
import { Button, Grid, Paper }from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import ArtistList from '../ArtistList/ArtistList'
import SongList from '../SongList/SongList'
import AlbumList from '../AlbumList/AlbumList'
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

const AState  = {
  artists: [{name: "Cat Chaos", id: 1, albums: [1,3]}, {name: "DoggoTime", id: 2, albums: [2]}, {name: "another bandname", id: 3}],
  albums: [{name: "my cats are dope", id: 1, artist: 1, songs:[1,2]}, {name: "I'm just a doggo", id: 2, artist: 2, songs:[3]}, {name: "Return of the cat", id: 3, artist: 1, songs:[4]}],
  songs: [{name: "little grey is cute", id: 1, album: 1}, {name: "big paw is badass", id: 2, album: 1}, {name: "Old Dog Ted", id: 3, album: 2}, {name: "sleep all day", id: 4, album: 3}]
};

const emptyState = {
  artists: [],
  albums: [],
  songs: [],
  musicFolder: 'No folder'
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
  }

  handleSetBaseFolderForMusic = (event) => {
    dialog.showOpenDialog({ title: "Select Music Folder", properties: ['openDirectory']}).then((data) => {
      if (data.filePaths && data.filePaths[0] != undefined) {
        this.setState({musicFolder: data.filePaths[0]});
        const folder = data.filePaths[0];
        MusicFolderReader(folder).then(information => {
          this.setState(information);
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
              <p>{this.state.musicFolder}</p>
              <Button variant="contained" color="primary" onClick={(event) => this.handleSetBaseFolderForMusic(event)}>button to set file to look at music</Button>
              <br/>
              <Button variant="contained">button to reeset music selection</Button>
              <br/>
              <Button variant="contained" color="secondary" onClick={(event) => this.handleClearingMusic(event)}>Empty the state Store</Button>
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
        </MusicInfoContext.Provider>
      );
  }
}


// then add the styling
App = withStyles(styles)(App);

export default App;