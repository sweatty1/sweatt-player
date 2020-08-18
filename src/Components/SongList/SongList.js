import React from 'react';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
import { ListItem, List, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { RenderTime } from '../../Utilities/TimeHandling';

class SongList extends React.Component {

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
            <MusicInfoContext.Consumer>
                {({songs}) => (
                    <div>
                        <h1>Songs</h1>
                        <List className="list-group">
                            {songs.map((song) => 
                                this.renderSong(song)
                            )}
                        </List>
                    </div>
                )}
            </MusicInfoContext.Consumer>
        );
    }
}
export default SongList;