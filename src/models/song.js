import { Model, fk, many, attr } from 'redux-orm';
import songsReducer from '../reducers/songs';

class Song extends Model {
    // Declare any static or instance methods you need.
    toString() {
        return `Song: ${this.name}`;
    }
}

Song.reducer = songsReducer;

Song.modelName = 'Song';

// Declare your related fields.
Song.fields = {
    id: attr(),
    name: attr(),
    album: fk('Album', 'songs')
};

export default Song;