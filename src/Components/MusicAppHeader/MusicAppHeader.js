import React from 'react';
import { ListItem, List, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { MusicInfoContext} from '../../Contexts/MusicInfoContext';
import { CurrentlyPlayingContext } from '../../Contexts/CurrentlyPlayingContext';
var { dialog } = window.require('electron').remote;

export default function MusicAppHeader(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClearSelectedMusic = (clearSelected) => {
    clearSelected();
    setAnchorEl(null);
  }

  const handleClearAllMusic = (clearSelected, clearLoaded) => {
    clearSelected();
    clearLoaded();
    setAnchorEl(null);
  }

  const handleSetBaseFolderForMusic = (readMusicFolder, clearSelected) => {
    dialog.showOpenDialog({ title: "Select Music Folder", properties: ['openDirectory']}).then((data) => {
      if (data.filePaths && data.filePaths[0] !== undefined) {
        const folder = data.filePaths[0];
        readMusicFolder(folder);
        clearSelected();
      } else {
        console.log("No folder selected");
      }
      setAnchorEl(null);
    });
  }

    return (
        <header className="App-header">
          <MusicInfoContext.Consumer>
              {({musicFolder}) => (
                <List component="nav">
                  <ListItem button
                    aria-haspopup="true"
                    aria-controls="option-menu"
                    onClick={handleOpenMenu}
                  >
                    <ListItemText primary="Data Controls" secondary={musicFolder} />
                  </ListItem>
                </List>
              )}
            </MusicInfoContext.Consumer>
            
            <MusicInfoContext.Consumer>
              {({clearLoadedMusic, readMusicFolder}) => (
                <CurrentlyPlayingContext.Consumer>
                  {({clearSelectedMusic}) => (
                    <Menu 
                    id="option-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => handleSetBaseFolderForMusic(readMusicFolder, clearSelectedMusic)}>
                    Set New Root Folder
                    </MenuItem>
                    <MenuItem onClick={() => handleClearSelectedMusic(clearSelectedMusic)}>
                    Deselect CurrentSong
                    </MenuItem>
                    <MenuItem onClick={() => handleClearAllMusic(clearSelectedMusic, clearLoadedMusic)}>
                    Clear Entire State
                    </MenuItem>
                  </Menu>
                  )}
                </CurrentlyPlayingContext.Consumer>
              )}
             </MusicInfoContext.Consumer>
        </header>
    )
}