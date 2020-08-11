import React from 'react';
import { StartContext } from '../../context';
import { ListItem, List, ListItemText } from '@material-ui/core';

class SongList extends React.Component {
    static contextType = StartContext;

    handleClickSelectSong = (event, song) => {
        //setSelectedSong(song); figure out to set thing or to play music
        // selected={selectedSong === song} needs to be added to listItem
    };

    renderSongs() {
        return (
            <List className="list-group">
                {this.context.songs.map((song) => 
                    this.renderSong(song)
                )}
            </List>
        )
    }

    renderSong(song) {
        return(
            <ListItem button onClick={(event) => this.handleClickSelectSong(event, song)}>
                <ListItemText primary={song.name}/>
            </ListItem>
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