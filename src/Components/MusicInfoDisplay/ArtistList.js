import React from 'react';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
import { ListItem, List, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

const ArtistList = (props) => {
    return (
        <div>
        <h1>Artists</h1>
        <List>
            <CurrentlyPlayingContext.Consumer>
            {({addArtistToPlayList}) => (
                <MusicInfoContext.Consumer>
                {({artists}) => (
                    artists.map((artist, index) => 
                        <ListItem key={"Artist"+index}>
                            <ListItemText primary={artist}/>
                            <ListItemSecondaryAction> 
                            <IconButton onClick={(event) => addArtistToPlayList(artist)}>
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
    );
}
export default ArtistList;