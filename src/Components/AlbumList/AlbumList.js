import React from 'react';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { ListItem, List, ListItemText } from '@material-ui/core';

class AlbumList extends React.Component {

    renderAlbum(album) {
        return(
            <ListItem>
                <ListItemText primary={album}/>
            </ListItem>
        )
    }

    render() {
        return (
            <MusicInfoContext.Consumer>
                {({albums}) => (
                    <div>
                        <h1>Albums</h1>
                        <List>
                            {albums.map((album) => 
                                this.renderAlbum(album)
                            )}
                        </List>
                    </div>
                )}
            </MusicInfoContext.Consumer>
        );
    }
}
export default AlbumList;