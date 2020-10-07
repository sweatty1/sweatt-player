import React from 'react';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
import { ListItem, List, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Refresh from '@material-ui/icons/Refresh';

const ArtistList = (props) => {
    return (
        <MusicInfoContext.Consumer>
        {({filteredArtists, resetFilter, filterByArtist}) => (
            <div>
            <h1>Artists
                    <IconButton onClick={(event) => resetFilter()}>
                        <Refresh/>
                    </IconButton>
                </h1>
            <List>
            <CurrentlyPlayingContext.Consumer>
            {({addArtistToPlayList}) => (
                filteredArtists.map((artist, index) => 
                    <ListItem key={"Artist"+index} button onClick={(event) => filterByArtist(artist)}>
                        <ListItemText primary={artist}/>
                        <ListItemSecondaryAction> 
                        <IconButton onClick={(event) => addArtistToPlayList(artist)}>
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
    );
}
export default ArtistList;