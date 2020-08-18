import React from 'react';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { ListItem, List, ListItemText } from '@material-ui/core';

const AlbumList = (props) => {

    return (
        <MusicInfoContext.Consumer>
            {({albums}) => (
                <div>
                    <h1>Albums</h1>
                    <List>
                        {albums.map((album) => 
                            <ListItem>
                                <ListItemText primary={album}/>
                            </ListItem>
                        )}
                    </List>
                </div>
            )}
            </MusicInfoContext.Consumer>
    )
}
export default AlbumList;