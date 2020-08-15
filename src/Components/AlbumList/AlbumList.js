import React from 'react';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { ListItem, List, ListItemText } from '@material-ui/core';

class AlbumList extends React.Component {
    static contextType = MusicInfoContext;

    renderAlbums() {
        return (
            <List>
                {this.context.albums.map((album) => 
                    this.renderAlbum(album)
                )}
            </List>
        )
    }

    renderAlbum(album) {
        return(
            <ListItem>
                <ListItemText primary={album}/>
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