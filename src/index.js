import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

// from before redux-orm
// import reducers from './reducers'
// const initialState  = {
//   artists: [{name: "Cat Chaos", id: 1, albums: [1,3]}, {name: "DoggoTime", id: 2, albums: [2]}, {name: "another bandname", id: 3}],
//   albums: [{name: "my cats are dope", id: 1, artist: 1, songs:[1,2]}, {name: "I'm just a doggo", id: 2, artist: 2, songs:[3]}, {name: "Return of the cat", id: 3, artist: 1, songs:[4]}],
//   songs: [{name: "little grey is cute", id: 1, album: 1}, {name: "big paw is badass", id: 2, album: 1}, {name: "Old Dog Ted", id: 3, album: 2}, {name: "sleep all day", id: 4, album: 3}]
// }
//const store=createStore(reducers, initialState);

//const store=createStore(rootReducer);
const store=createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
