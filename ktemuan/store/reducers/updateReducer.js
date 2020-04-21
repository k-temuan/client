const initialState = {
  updated: {},
  update_status: {
    postUpdate: "update", // ["update", "success"]
    updateLoading: false
  },
  updateEventError: {
    datetime: null,
    name: null,
    category: null,
    description: null,
    maxAttendees: null
  },
}

function updateReducer (state = initialState, actions) {
  const { type, payload } = actions;
  switch(type) {
    case "CLEAR_UPDATE_EVENT_ERROR": {
      return {
        ...state,
        updateEventError: {
          datetime: null,
          name: null,
          category: null,
          description: null,
          maxAttendees: null
        }
      }
    }
    case "SET_UPDATE_EVENT_ERROR": {
      return {
        ...state,
        updateEventError: {
          ...state.updateEventError,
          datetime: payload.datetime || null,
          name: payload.name || null,
          category: payload.category || null,
          description: payload.description || null,
          maxAttendees: payload.maxAttendees || null
        }
      }
    }
    case "TOGGLE_UPDATE_LOADING": {
      if (payload) {
        return {
          ...state,
          update_status: {
            ...state.update_status,
            updateLoading: payload
          }
        }
      } else {
        return {
          ...state,
          update_status: {
            ...state.update_status,
            updateLoading: !state.update_status.updateLoading
          }
        }
      }
    }
    case "TOGGLE_UPDATE_EVENT": {
      return {
        ...state,
        update_status: {
          ...state.update_status,
          postUpdate: "update"
        }
      }
    }
    case "TOGGLE_UPDATE_EVENT_SUCCESS": {
      return {
        ...state,
        update_status: {
          ...state.update_status,
          postUpdate: "success"
        }
      }
    }
    case "SET_EVENT_TO_UPDATE": {
      return {
        ...state,
        updated: payload
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default updateReducer