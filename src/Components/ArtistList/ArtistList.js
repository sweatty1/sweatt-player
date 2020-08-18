import React from 'react';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { ListItem, List, ListItemText } from '@material-ui/core';

class ArtistList extends React.Component {

    renderArtist(artist) {
        return(
            <ListItem>
                <ListItemText primary={artist}/>
            </ListItem>
        )
    }

    render() {
        return (
            <MusicInfoContext.Consumer>
                {({artists}) => (
                    <div>
                        <h1>Artists</h1>
                        <List>
                            {artists.map((artist) => 
                                this.renderArtist(artist)
                            )}
                        </List>
                    </div>
                )}
            </MusicInfoContext.Consumer>
        );
    }
}
export default ArtistList;