import axios from 'axios';

export const FETCH_EVENTS = () => {
  return (dispatch) => {
    dispatch({
      type: "SET_SCREEN_LOADING",
      payload: true
    })
    axios({
      url: 'http://localhost:3000/events',
      method: 'GET'
    })
      .then(({ data }) => {
        dispatch({
          type: "SET_EVENTS",
          payload: data.events
        })
      })
      .catch((err) => {
      })
      .finally(_ => {
        dispatch({
          type: "SET_SCREEN_LOADING",
          payload: false
        })
      })
  }
}

export const FETCH_PROFILE_DETAIL = (userId) => {
  return (dispatch, getState) => {
  }
}

export const FETCH_EVENT_DETAIL = (id) => {
  return (dispatch, getState) => {
    const cachedEvent = getState().events
    const event = cachedEvent.filter(item => item.id === id)[0]
    dispatch({
      type: "SET_EVENT",
      payload: event
    })
  }
}

export const FETCH_EVENT_ATENDEES = (eventId) => {
  return (dispatch, getState) => {
    const cachedAtendees = getState().event.users;
    dispatch({
      type: "SET_ATENDEES",
      payload: cachedAtendees
    })
  }
}