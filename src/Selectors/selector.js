import { createSelector } from 'redux-orm';
import orm from '../models/orm'

export const artists = createSelector(orm.Artist);
export const albums = createSelector(orm.Album);
export const songs = createSelector(orm.Song);