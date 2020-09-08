import React from 'react';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
import { ListItem, List, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
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
                    albums.map((album) => 
                        <ListItem>
                            <ListItemText primary={album}/>
                            <ListItemSecondaryAction> 
                                <PlaylistAddIcon button onClick={(event) => addAlbumToPlayList(album)}/>
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