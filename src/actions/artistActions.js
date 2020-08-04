import { SELECT_ARTIST, CREATE_ARTIST, CREATE_ARTISTS, UPDATE_ARTIST, DELETE_ARTIST } from './actionTypes'

export const selectArtist = id => {
    return { 
        type: SELECT_ARTIST,
        payload: id,
    };
};

export const createArtist = props => {
    return { 
        type: CREATE_ARTIST,
        payload: props,
    };
};

export const createArtists = props => {
    return {
        type: CREATE_ARTISTS,
        payload: props,
    }
}

export const deleteArtist = id => {
    return {
        type: DELETE_ARTIST,
        payload: id,
    };
};