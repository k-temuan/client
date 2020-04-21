const initialState = {
  event: {},
  detail_status: {
    fetchLoading: false,
    emptyDetail: false,
    errorDetail: null,
  },
}

function detailReducer(state = initialState, actions) {
  const { type, payload } = actions;
  switch(type) {
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