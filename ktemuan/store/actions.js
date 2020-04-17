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
