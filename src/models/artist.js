import { Model, fk, many, attr } from 'redux-orm';
import artistsReducer from '../reducers/artists';

class Artist extends Model {
    // Declare any static or instance methods you need.
    toString() {
        return `Artist: ${this.name}`;
    }
}

Artist.reducer=artistsReducer;

Artist.modelName = 'Artist';

// Declare your related fields.
Artist.fields = {
    id: attr(),
    name: attr(),
};

export default Artist;