import { SELECT_ARTIST, CREATE_ARTIST, CREATE_ARTISTS,  UPDATE_ARTIST, DELETE_ARTIST } from '../actions/actionTypes'

const addArtist = (Artist, newArtist) => {
    if (Artist.withId(newArtist.id)) {
        console.log("id was already taken");
        return;
    }
    Artist.create(newArtist);
}

const artistsReducer = (action = {}, Artist, session) => {
    switch (action.type) {
        case SELECT_ARTIST:
            return Artist.withId(action.payload.id)
        case CREATE_ARTIST: // Then again this should only be done on loading folder of music
            addArtist(Artist, action.payload);
            break;
        case CREATE_ARTISTS:
            action.payload.forEach(newArtist => addArtist(Artist, newArtist));
            break;
        case DELETE_ARTIST:
            const artist = Artist.withId(action.payload);
            artist.delete();
            break;
        default: // can be deleted since we are retruning nothing as the base return handles this
            return; //since we aren't returning state now state;
    }
    return;
}

export default artistsReducer;