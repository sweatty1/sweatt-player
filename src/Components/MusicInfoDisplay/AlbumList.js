import React from 'react';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
import { ListItem, List, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@material-ui/core';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Refresh from '@material-ui/icons/Refresh';

const AlbumList = (props) => {
    return (
        <MusicInfoContext.Consumer>
        {({filteredAlbums, resetFilter, filterByAlbum}) => (
            <div>
            <Typography variant="h5">
            Albums
                <IconButton onClick={(event) => resetFilter()}>
                    <Refresh/>
                </IconButton>
            </Typography>
            <List>
                <CurrentlyPlayingContext.Consumer>
                {({addAlbumToPlayList}) => (
                    filteredAlbums.map((album, index) => 
                        <ListItem key={"Album"+index} button onClick={(event) => filterByAlbum(album)}>
                            <ListItemText primary={album}/>
                            <ListItemSecondaryAction>
                                <IconButton onClick={(event) => addAlbumToPlayList(album)}>
                                    <PlaylistAddIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                )}
                </CurrentlyPlayingContext.Consumer>
            </List>
            </div>
        )}
        </MusicInfoContext.Consumer>
    )
}
export default AlbumList;