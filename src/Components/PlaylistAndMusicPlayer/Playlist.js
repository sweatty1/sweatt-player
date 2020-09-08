import React from 'react';
import { ListItem, List, ListItemText } from '@material-ui/core';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';

const Playlist = (props) => {

    return (
            <div>
                <h3>Current PlayList</h3>
                <List style={{maxHeight: 200, overflow: 'auto'}}>
                    <CurrentlyPlayingContext.Consumer>
                        {({currentPlaylist}) => (
                            currentPlaylist.map((playlistSong) => 
                                <ListItem>
                                    <ListItemText primary={playlistSong.songInfo.common.title}/>
                                </ListItem>
                            )
                        )}
                    </CurrentlyPlayingContext.Consumer>
                </List>
            </div>
    )
}
export default Playlist;