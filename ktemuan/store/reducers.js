const initialState = {
  status: 'redux is doing fine',
  screenLoading: false,
  screenError: null,
  events: []
}

function reducers(state = initialState, actions) {
  const { type, payload } = actions;
  switch(type) {
    case "SET_EVENTS": {
      return {
        ...state,
        events: payload
      }
    }
    case "SET_SCREEN_ERROR": {
      return {
        ...state,
        screenError: payload
      }
    }
    case "SET_SCREEN_LOADING": {
      return {
        ...state,
        screenLoading: payload
      }
    }
    default: {
      return state
    }
  }
}

export default reducers;