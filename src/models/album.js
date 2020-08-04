import { Model, fk, many, attr } from 'redux-orm';
import albumsReducer from '../reducers/albums';

class Album extends Model {
    // Declare any static or instance methods you need.
    toString() {
        return `Album: ${this.name}`;
    }
}

Album.reducer = albumsReducer;

Album.modelName = 'Album';

// Declare your related fields.
Album.fields = {
    id: attr(),
    name: attr(),
    artist: fk('Artist', 'albums')
};

export default Album;