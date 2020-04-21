const initialState = {
  event: {},
  detail_status: {
    fetchLoading: false,
    emptyDetail: false,
    errorDetail: null,
  },
  joinLoading: false,
  joinError: null
}

function detailReducer(state = initialState, actions) {
  const { type, payload } = actions;
  switch(type) {
    case "SET_JOIN_ERROR": {
      return {
        ...state,
        joinError: payload
      }
    }
    case "CLEAR_JOIN_ERROR": {
      return {
        ...state,
        joinError: null
      }
    }
    case "TOGGLE_JOIN_LOADING": {
      if (payload === true || payload === false) {
        return {
          ...state,
          joinLoading: payload
        }
      } else {
        return {
          ...state,
          joinLoading: !state.joinLoading
        }
      }
    }
    case "SET_FETCH_DETAIL_ERROR": {
      return {
        ...state,
        detail_status: {
          ...state.detail_status,
          errorDetail: payload.errorDetail || null
        }
      }
    }
    case "CLEAR_FETCH_DETAIL_ERROR": {
      return {
        ...state,
        detail_status: {
          ...state.detail_status,
          errorDetail: null
        }
      }
    }
    case "TOGGLE_FETCH_DETAIL_LOADING": {
      if (payload.fetchLoading) {
        return {
          ...state,
          detail_status: {
            ...state.detail_status,
            fetchLoading: payload.fetchLoading
          }
        }
      } else {
        return {
          ...state,
          detail_status: {
            ...state.detail_status,
            fetchLoading: !state.detail_status.fetchLoading
          }
        }
      }
    }
    case "SET_EVENT": {
      if (payload) {
        return {
          ...state,
          event: payload
        }
      } else {
        return {
          ...state
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

export default detailReducer