import React from 'react';
import { ListItem, List, ListItemText, IconButton, ListItemSecondaryAction, Grid, Typography } from '@material-ui/core';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import ClearIcon from '@material-ui/icons/Clear';

const PlaylistHeader = (props) => {
    return(
        <CurrentlyPlayingContext.Consumer>
            {({clearPlaylist}) => 
                <Typography variant="h5">
                    Current PlayList
                    <IconButton onClick={(event) => clearPlaylist()}>
                        <ClearIcon/>
                    </IconButton>
                </Typography>
            }
        </CurrentlyPlayingContext.Consumer>
    )
}

const Playlist = (props) => {
    return (
        <div>
            {PlaylistHeader()}
            <List style={{maxHeight: 200, height: 200, overflow: 'auto'}}>
            <CurrentlyPlayingContext.Consumer>
                {({currentPlaylist, removeSongFromPlaylist, setCurrentlyPlaying}) => (
                    currentPlaylist.map((playlistSong, index) => 
                        <ListItem key={"PlaylistSong"+index}>
                            <Grid alignItems="center" container>
                            <Grid item xs={2}><img src={playlistSong.albumArts.thumbNail}/></Grid>
                            <Grid item xs={4}><ListItemText primary={playlistSong.songInfo.common.title}/></Grid>
                            <Grid item xs={3}><ListItemText primary={playlistSong.songInfo.common.artist}/></Grid>
                            <Grid item xs={3}><ListItemText primary={playlistSong.songInfo.common.album}/></Grid>
                            </Grid>
                            <ListItemSecondaryAction> 
                                <IconButton onClick={(event) => setCurrentlyPlaying(playlistSong, true, index)}>
                                    <PlayCircleFilledIcon/>
                                </IconButton>
                                <IconButton onClick={(event) => removeSongFromPlaylist(index)}>
                                    <RemoveCircleIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                )}
            </CurrentlyPlayingContext.Consumer>
            </List>
        </div>
    )
}
export default Playlist;