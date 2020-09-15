import React from 'react';
import { ListItem, List, ListItemText, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import ClearIcon from '@material-ui/icons/Clear';

const PlaylistHeader = (props) => {
    return(
        <CurrentlyPlayingContext.Consumer>
            {({clearPlaylist}) => 
                <h3>Current PlayList
                <IconButton onClick={(event) => clearPlaylist()}>
                    <ClearIcon/>
                </IconButton>
                </h3>
            }
        </CurrentlyPlayingContext.Consumer>
    )
}

const Playlist = (props) => {
    return (
        <div>
            {PlaylistHeader()}
            <List style={{maxHeight: 200, overflow: 'auto'}}>
            <CurrentlyPlayingContext.Consumer>
                {({currentPlaylist, removeSongFromPlaylist, setCurrentlyPlaying}) => (
                    currentPlaylist.map((playlistSong, index) => 
                        <ListItem key={"PlaylistSong"+index}>
                            <ListItemText primary={playlistSong.songInfo.common.title}/>
                            <ListItemSecondaryAction> 
                                <IconButton onClick={(event) => setCurrentlyPlaying(playlistSong, true, index)}>
                                    <PlayCircleFilledIcon/>
                                </IconButton>
                                <IconButton onClick={(event) => removeSongFromPlaylist(index)}>
                                    <RemoveCircleIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                )}
            </CurrentlyPlayingContext.Consumer>
            </List>
        </div>
    )
}
export default Playlist;