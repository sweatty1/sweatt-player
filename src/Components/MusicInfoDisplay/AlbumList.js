import React from 'react';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
import { ListItem, List, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

const AlbumList = (props) => {
    return (
        <div>
        <h1>Albums</h1>
        <List>
            <CurrentlyPlayingContext.Consumer>
            {({addAlbumToPlayList}) => (
                <MusicInfoContext.Consumer>
                {({albums}) => (
                    albums.map((album, index) => 
                        <ListItem key={"Album"+index}>
                            <ListItemText primary={album}/>
                            <ListItemSecondaryAction>
                                <IconButton onClick={(event) => addAlbumToPlayList(album)}>
                                    <PlaylistAddIcon/>
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
    )
}
export default AlbumList;