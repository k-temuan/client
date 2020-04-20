import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import reducers from './reducers'
import eventReducer from './eventReducer'
import detailReducer from './detailReducer'
import landingReducer from './landingReducer'
import createReducer from './createReducer'
import browseReducer from './browseReducer'
import profileReducer from './profileReducer'
import attendeeListReducer from './attendeeListReducer'

const rootReducers = combineReducers({
    reducer: reducers,
    event: eventReducer,
    detail: detailReducer,
    landing: landingReducer,
    create: createReducer,
    browse: browseReducer,
    profile: profileReducer,
    attendees: attendeeListReducer,
  });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducers,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);
export default store;