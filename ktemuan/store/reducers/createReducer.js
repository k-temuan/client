const initialState = {
  event_status: {
    postEvent: 'create', // ['create', 'success']
    postLoading: false
  },
  submitEventError: {
    datetime: null,
    name: null,
    category: null,
    description: null,
    maxAttendees: null
  },
}

function createReducer(state = initialState, actions) {
  const { type, payload } = actions;
  switch(type) {
    case "CLEAR_SUBMIT_EVENT_ERROR": {
      return {
        ...state,
        submitEventError: {
          datetime: null,
          name: null,
          category: null,
          description: null,
          maxAttendees: null
        }
      }
    }
    case "SET_SUBMIT_EVENT_ERROR": {
      return {
        ...state,
        submitEventError: {
          ...state.submitEventError,
          datetime: payload.datetime || null,
          name: payload.name || null,
          category: payload.category || null,
          description: payload.description || null,
          maxAttendees: payload.maxAttendees || null,
        }
      }
    }
    case "TOGGLE_SUBMIT_EVENT_LOADING": {
      if (!payload) {
        return {
          ...state,
          event_status: {
            ...state.event_status,
            postLoading: !state.event_status.postLoading
          }
        }
      } else {
        return {
          ...state,
          event_status: {
            ...state.event_status,
            postLoading: payload
          }
        }
      }
    }
    case "TOGGLE_SUBMIT_EVENT_SUCCESS": {
      return {
        ...state,
        event_status: {
          ...state.event_status,
          postEvent: 'success'
        }
      }
    }
    case "TOGGLE_SUBMIT_EVENT": {
      return {
        ...state,
        event_status: {
          ...state.event_status,
          postEvent: 'create'
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

export default createReducer