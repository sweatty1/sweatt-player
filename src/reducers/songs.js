import { SELECT_SONG, CREATE_SONG, CREATE_SONGS, UPDATE_SONG, DELETE_SONG } from '../actions/actionTypes'

const addSong = (Song, newSong) => {
    if (Song.withId(newSong.id)) {
        console.log("id was already taken");
        return;
    }
    Song.create(newSong);
}

const songsReducer = (action = {}, Song, session) => {
    switch (action.type) {
        case SELECT_SONG:
            return Song.withId(action.payload.id)
        case CREATE_SONG:
            addSong(Song, action.payload);
            break;
        case CREATE_SONGS:
            action.payload.forEach(newSong => addSong(Song, newSong));
            break;
        case DELETE_SONG:
            const song = Song.withId(action.payload);
            song.delete();
            break;
    }
    return;
}

export default songsReducer;