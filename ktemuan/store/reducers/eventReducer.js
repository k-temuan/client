const initialState = {
    events : []
}

function eventReducer(state = initialState, actions) {
  switch (actions.type) {
    case "SET_EVENTS": {
      return {
        ...state,
        events: actions.payload
      }
    }
    default:
      return state
  }
}

export default eventReducer