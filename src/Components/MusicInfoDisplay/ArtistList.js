import React, {useCallback} from 'react';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
import { ListItem, List, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

const ArtistList = (props) => {
    // In functional components additional functions cause rerendering
    const memoizedHello = useCallback(
        (artist) => {
          console.log("hello " + artist)
        }
      );

    return (
        <div>
        <h1>Artists</h1>
        <List>
            <CurrentlyPlayingContext.Consumer>
            {({addArtistToPlayList}) => (
                <MusicInfoContext.Consumer>
                {({artists}) => (
                    artists.map((artist) => 
                        <ListItem button onClick={(event) => memoizedHello(artist)}>
                            <ListItemText primary={artist}/>
                            <ListItemSecondaryAction> 
                                <PlaylistAddIcon button onClick={(event) => addArtistToPlayList(artist)}/>
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