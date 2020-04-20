const initialState = {
  profile: {}
}

function profileReducer(state = initialState, actions) {
  const { type, payload } = actions;
  switch(type) {
    case "SET_PROFILE": {
      if (payload) {
        return {
          ...state,
          profile: payload
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

export default profileReducer