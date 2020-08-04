import React, {useState, useEffect } from 'react';
import { ListItem, List, ListItemText } from '@material-ui/core';

class AlbumList extends React.Component {
    renderAlbums() {
        return (
            <List>
                {this.props.albums.map((album) => 
                    this.renderAlbum(album)
                )}
            </List>
        )
    }

    renderAlbum(album) {
        return(
            <ListItem>
                <ListItemText primary={album.name}/>
            </ListItem>
        )
    }

    render() {
        return (
            <div>
              <h1>Albums</h1>
              {this.renderAlbums()}
            </div>
        );
    }
}
export default AlbumList;