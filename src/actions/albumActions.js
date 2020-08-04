import { SELECT_ALBUM, CREATE_ALBUM, CREATE_ALBUMS, UPDATE_ALBUM, DELETE_ALBUM } from './actionTypes'

export const selectAlbum = id => {
    return { 
        type: SELECT_ALBUM,
        payload: id,
    };
};

export const createAlbum = props => {
    return { 
        type: CREATE_ALBUM,
        payload: props,
    };
};

export const createAlbums = props => {
    return { 
        type: CREATE_ALBUMS,
        payload: props,
    };
};

export const deleteAlbum = id => {
    return {
        type: DELETE_ALBUM,
        payload: id,
    };
};