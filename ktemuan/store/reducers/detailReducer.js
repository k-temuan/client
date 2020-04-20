const initialState = {
  event: {},
  detail_status: {
    fetchLoading: false
  },
}

function detailReducer(state = initialState, actions) {
  const { type, payload } = actions;
  switch(type) {
    case "TOGGLE_FETCH_DETAIL_LOADING": {
      if (payload) {
        return {
          ...state,
          detail_status: {
            ...state.detail_status,
            fetchLoading: payload
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