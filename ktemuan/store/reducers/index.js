import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import reducers from './reducers'
import eventReducer from './eventReducer'


const rootReducers = combineReducers({
    reducer: reducers,
    event: eventReducer
  });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducers,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);
export default store;