import React, {useState, useEffect } from 'react';
import { ListItem, List, ListItemText } from '@material-ui/core';

class SongList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            song: null
        }
    }

    handleClickSelectSong = (event, song) => {
        //setSelectedSong(song); figure out to set thing or to play music
        // selected={selectedSong === song} needs to be added to listItem
    };

    renderSongs() {
        return (
            <List className="list-group">
                {this.props.songs.map((song) => 
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