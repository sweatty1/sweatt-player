import { SELECT_ALBUM, CREATE_ALBUM, CREATE_ALBUMS, UPDATE_ALBUM, DELETE_ALBUM } from '../actions/actionTypes'

const addAlbum = (Album, newAlbum) => {
    if (Album.withId(newAlbum.id)) {
        console.log("id was already taken");
        return;
    }
    Album.create(newAlbum);
}

const albumsReducer = (action = {}, Album, session) => {
    switch (action.type) {
        case SELECT_ALBUM:
            return Album.withId(action.payload.id)
        case CREATE_ALBUM:
            addAlbum(Album, action.payload);
            break;
        case CREATE_ALBUMS:
            action.payload.forEach(newAlbum => addAlbum(Album, newAlbum));
            break;
        case DELETE_ALBUM:
            const album = Album.withId(action.payload);
            album.delete();
            break;
    }
    return;
}

export default albumsReducer;