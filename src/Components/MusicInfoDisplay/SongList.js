import React from 'react';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
import { ListItem, List, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { RenderTime } from '../../Utilities/TimeHandling';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

const SongList = (props) => {
    return (
        <div>
        <h1>Songs</h1>
        <List className="list-group">
            <CurrentlyPlayingContext.Consumer>
            {({setCurrentlyPlaying, addSongToPlayList}) => (
                <MusicInfoContext.Consumer>
                {({songs}) => (
                    songs.map((song, index) => 
                        <ListItem key={"Song"+index} button onClick={(event) => setCurrentlyPlaying(song)}>
                            <ListItemText primary={song.songInfo.common.title}/>
                            <ListItemSecondaryAction> 
                                <ListItemText primary={RenderTime(song.songInfo.format.duration)}/>
                                <IconButton onClick={(event) => addSongToPlayList(song)}>
                                    <QueueMusicIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                )}
                </MusicInfoContext.Consumer>                
            )}
            </CurrentlyPlayingContext.Consumer>
        </List>
        </div>
    );
}

export default SongList;