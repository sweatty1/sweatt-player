import { combineReducers } from 'redux';
import { createReducer } from 'redux-orm';
import orm from '../models/orm';

// from before orm
//import { combineReducers } from 'redux';
// import artists from './artists';
// import albums from './albums';
// import songs from './songs';

// export default combineReducers({
//   artists,
//   albums,
//   songs
// });

const subRootReducer = combineReducers({
  orm: createReducer(orm),
})

// Create a reducer state above diving into the orm or any other reducers where given reset action set state to undefined
// Undefined is in fact the expected default state on application load which is why it works properly it is as if the page loaded
const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return subRootReducer(state, action);
}

export default rootReducer;