import React from 'react';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
import { ListItem, List, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { RenderTime } from '../../Utilities/TimeHandling';

const SongList = (props) => {

    return (
        <MusicInfoContext.Consumer>
            {({songs}) => (
                <CurrentlyPlayingContext.Consumer>
                    {({setCurrentlyPlaying}) => (
                        <div>
                        <h1>Songs</h1>
                        <List className="list-group">
                            {songs.map((song) => 
                                <ListItem button onClick={(event) => setCurrentlyPlaying(song)}>
                                    <ListItemText primary={song.songInfo.common.title}/>
                                    <ListItemSecondaryAction> 
                                        <ListItemText primary={RenderTime(song.songInfo.format.duration)}/>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )}
                        </List>
                        </div>
                    )}
                </CurrentlyPlayingContext.Consumer>
            )}
        </MusicInfoContext.Consumer>
    );
}

export default SongList;