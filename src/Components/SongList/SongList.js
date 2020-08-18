import React, { useContext } from 'react';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
import { ListItem, List, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { RenderTime } from '../../Utilities/TimeHandling';

class SongList extends React.Component {
    
    renderSongs() {
        return (
            <MusicInfoContext.Consumer>
                {({songs}) => (
                    <List className="list-group">
                    {songs.map((song) => 
                        this.renderSong(song)
                    )}
                    </List>
                )}
            </MusicInfoContext.Consumer>
        )
    }

    renderSong(song) {
        return(
            <CurrentlyPlayingContext.Consumer>
                {({setCurrentlyPlaying}) => (
                    <ListItem button onClick={(event) => setCurrentlyPlaying(song)}>
                        <ListItemText primary={song.songInfo.common.title}/>
                        <ListItemSecondaryAction> 
                            <ListItemText primary={RenderTime(song.songInfo.format.duration)}/>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </CurrentlyPlayingContext.Consumer>
        )
    }

    render() {
        return (
          <div>
              <h1>Songs</h1>
              {this.renderSongs()}
          </div>
        );
    }
}
export default SongList;