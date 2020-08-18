import React, {useCallback} from 'react';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { ListItem, List, ListItemText } from '@material-ui/core';

const ArtistList = (props) => {
    // In functional components additional functions cause rerendering
    const memoizedHello = useCallback(
        (artist) => {
          console.log("hello " + artist)
        }
      );

    return (
        <MusicInfoContext.Consumer>
            {({artists}) => (
                <div>
                    <h1>Artists</h1>
                    <List>
                        {artists.map((artist) => 
                            <ListItem button onClick={(event) => memoizedHello(artist)}>
                                <ListItemText primary={artist}/>
                            </ListItem>
                        )}
                    </List>
                </div>
            )}
        </MusicInfoContext.Consumer>
    );
}
export default ArtistList;