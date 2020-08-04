import { SELECT_SONG, CREATE_SONG, CREATE_SONGS, UPDATE_SONG, DELETE_SONG } from './actionTypes'

export const selectSong = id => {
    return { 
        type: SELECT_SONG,
        payload: id,
    };
};

export const createSong = props => {
    return { 
        type: CREATE_SONG,
        payload: props,
    };
};

export const createSongs = props => {
    return { 
        type: CREATE_SONGS,
        payload: props,
    };
};

export const deleteSong = id => {
    return {
        type: DELETE_SONG,
        payload: id,
    };
};