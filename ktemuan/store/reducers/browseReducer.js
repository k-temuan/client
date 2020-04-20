const initialState = {
  category: 'All',
  categories: ['All', 'Game', 'Study', 'Bussiness', 'Meetup'],
  events_status: {
    loading: false,
    empty: false,
    error: null,
  },
}

function browseReducer(state = initialState, actions) {
  const {type, payload} = actions;
  switch(type) {
    case "SET_EVENTS_STATUS": {
      return {
        ...state,
        events_status: payload
      }
    }
    case "SET_CATEGORY": {
      if (state.categories.includes(payload)) {
        return {
          ...state,
          category: payload
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

export default browseReducer