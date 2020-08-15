import React from 'react';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { ListItem, List, ListItemText, ListItemSecondaryAction } from '@material-ui/core';

class SongList extends React.Component {
    static contextType = MusicInfoContext;

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

    // move this into its own component for use with music player
    // Make it use a proper date time
    renderTime(duration) {
        let hours = Math.floor(duration / 3600);
        let timeAfterHour = duration - hours * 3600;
        let minutes = Math.floor(timeAfterHour/60);
        let seconds = Math.floor(timeAfterHour - minutes * 60);
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        let textFormat = minutes+':'+seconds;
        if (hours > 0) {
            if (hours   < 10) {hours = "0"+hours;}
            textFormat = hours+':'+textFormat
        }
        return (
            <ListItemText primary={textFormat}/>
        )
    }

    renderSong(song) {
        return(
            <ListItem button onClick={(event) => this.handleClickSelectSong(event, song)}>
                <ListItemText primary={song.songInfo.common.title}/>
                <ListItemSecondaryAction> 
                    {this.renderTime(song.songInfo.format.duration)}
                </ListItemSecondaryAction>
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