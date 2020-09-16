import React, { useContext } from 'react';
import { ListItem, List, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { MusicInfoContext } from '../../Contexts/MusicInfoContext';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
var { dialog } = window.require('electron').remote;

export default function MusicAppHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const currentlyPlayingContext = useContext(CurrentlyPlayingContext);
  const musicInfoContext = useContext(MusicInfoContext);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClearSelectedMusic = () => {
    currentlyPlayingContext.clearSelectedMusic();
    setAnchorEl(null);
  }

  const handleClearAllMusic = () => {
    currentlyPlayingContext.clearSelectedMusic();
    musicInfoContext.clearLoadedMusic();
    setAnchorEl(null);
  }

  const handleSetBaseFolderForMusic = () => {
    dialog.showOpenDialog({ title: "Select Music Folder", properties: ['openDirectory']}).then((data) => {
      if (data.filePaths && data.filePaths[0] !== undefined) {
        const folder = data.filePaths[0];
        musicInfoContext.readMusicFolder(folder);
        currentlyPlayingContext.clearSelectedMusic();
      } else {
        console.log("No folder selected");
      }
      setAnchorEl(null);
    });
  }

  return (
    <header className="App-header">
      <List component="nav">
        <ListItem button
          aria-haspopup="true"
          aria-controls="option-menu"
          onClick={handleOpenMenu}
        >
          <ListItemText primary="Data Controls" secondary={musicInfoContext.musicFolder} />
        </ListItem>
      </List>
      <Menu 
        id="option-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSetBaseFolderForMusic()}>
        Set New Root Folder
        </MenuItem>
        <MenuItem onClick={() => handleClearSelectedMusic()}>
        Deselect CurrentSong
        </MenuItem>
        <MenuItem onClick={() => handleClearAllMusic()}>
        Clear Entire State
        </MenuItem>
      </Menu>
    </header>
  )
}