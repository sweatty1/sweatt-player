import { ORM } from "redux-orm";
import Artist from "./artist";
import Album from "./album";
import Song from "./song";

const orm = new ORM({
    stateSelector: state => state.orm,
});
orm.register(Artist, Album, Song);

export default orm;

