import React from 'react';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { ListItem, List, ListItemText } from '@material-ui/core';

class ArtistList extends React.Component {
    static contextType = MusicInfoContext;

    renderArtists() {
        return (
            <List>
                {this.context.artists.map((artist) => 
                    this.renderArtist(artist)
                )}
            </List>
        )
    }

    renderArtist(artist) {
        return(
            <ListItem key={artist.id}>
                <ListItemText primary={artist.name}/>
            </ListItem>
        )
    }

    render() {
        console.log("FUCKHELL");
        return (
            <div>
              <h1>Artists</h1>
              {this.renderArtists()}
            </div>
        );
    }
}
export default ArtistList;