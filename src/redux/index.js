import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { fetchData } from './actions'


const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(fetchData());

export default store;