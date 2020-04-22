const initialState = {
  profile: {},
  profileLoading: false,
  profileError: null
}

function profileReducer(state = initialState, actions) {
  const { type, payload } = actions;
  switch(type) {
    case "SET_PROFILE_ERROR": {
      return {
        ...state,
        profileError: payload
      }
    }
    case "CLEAR_PROFILE_ERROR": {
      return {
        ...state,
        profileError: null
      }
    }
    case "TOGGLE_PROFILE_LOADING": {
      if (payload) {
        return {
          ...state,
          profileLoading: payload
        }
      } else {
        return {
          ...state,
          profileLoading: !state.profileLoading
        }
      }
    }
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