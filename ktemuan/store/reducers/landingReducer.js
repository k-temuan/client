const initialState = {
  needLogin: null,
  loginError: {
    email: null,
    password: null,
    message: null
  },
  loginLoading: false,
  registerError: {
    firstname: null,
    lastname: null,
    email: null,
    photo_url: null,
    password: null
  },
  registerLoading: true,
  userCred: {
    id: null,
    firstname: null,
    lastname: null,
    email: null,
    photo_url: null,
    access_token: null
  },
}

function landingReducer(state =  initialState, actions) {
  const { type, payload } = actions;
  switch(type) {
    case "TOGGLE_REGISTER_LOADING": {
      if (payload) {
        return {
          ...state,
          registerLoading: payload
        }
      } else {
        return {
          ...state,
          registerLoading: !state.registerLoading
        }
      }
    }
    case "SET_REGISTER_ERROR": {
      return {
        ...state,
        registerError: {
          firstname: payload.firstname,
          lastname: payload.lastname,
          email: payload.email,
          photo_url: payload.photo_url,
          password: payload.password
        }
      }
    }
    case "CLEAR_REGISTER_ERROR": {
      return {
        ...state,
        registerError: {
          firstname: null,
          lastname: null,
          email: null,
          photo_url: null,
          passowrd: null
        }
      }
    }
    case "TOGGLE_LOGIN_LOADING": {
      if (payload) {
        return {
          ...state,
          loginLoading: payload
        }
      } else {
        return {
          ...state,
          loginLoading: !state.loginLoading
        }
      }
    }
    case "CLEAR_LOGIN_ERROR": {
      return {
        ...state,
        loginError: {
          email: null,
          password: null,
          message: null
        }
      }
    }
    case "SET_LOGIN_ERROR": {
      return {
        ...state,
        loginError: {
          ...state.loginError,
          email: payload.email || null,
          password: payload.password || null,
          message: payload.message || null
        }
      }
    }
    case "TOGGLE_NEED_LOGIN": {
      if (payload !== true && payload !== false) {
        return {
          ...state,
          needLogin: !state.needLogin
        }
      }
      return {
        ...state,
        needLogin: payload
      }
    }
    case "CLEAR_USER_CRED": {
      return {
        ...state,
        userCred: {
          id: null,
          firstname: null,
          lastname: null,
          email: null,
          photo_url: null,
          access_token: null
        }
      }
    }
    case "SET_USER_CRED": {
      return {
        ...state,
        userCred: {
          ...state.userCred,
          id: payload.id,
          firstname: payload.name,
          lastname: payload.lastname,
          email: payload.email,
          photo_url: payload.photo_url,
          access_token: payload.access_token
        }
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default landingReducer;