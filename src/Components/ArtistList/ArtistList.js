import React, {useState, useEffect } from 'react';
import { ListItem, List, ListItemText } from '@material-ui/core';

class ArtistList extends React.Component {
    renderArtists() {
        return (
            <List>
                {this.props.artists.map((artist) => 
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
        console.log(this.props.artists)
        return (
            <div>
              <h1>Artists</h1>
              {this.renderArtists()}
            </div>
        );
    }
}
export default ArtistList;