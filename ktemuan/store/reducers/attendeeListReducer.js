const initialState = {
  attendees: [],
}

function attendeeListReducer(state = initialState, actions) {
  const { type, payload } = actions;
  switch(type) {
    case "SET_ATENDEES": {
      if (payload) {
        return {
          ...state,
          attendees: payload
        }
      }
      return {
        ...state
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default attendeeListReducer