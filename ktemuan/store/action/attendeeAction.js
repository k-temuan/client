import axios from 'axios';
import {apiURL, appStorageKey} from './index';
import { FETCH_EVENT_DETAIL } from './detailAction';

export const FETCH_ATTENDEES_LIST = (eventId) => {
  return (dispatch, getState) => {
    const userCred = getState().landing.userCred;
    const event = getState().detail.event
    console.log(event);
    // event.users
    dispatch({
      type: "SET_ATENDEES",
      payload: event.Attendees
    })
  }
}

export const JOIN_EVENT_FROM_DETAIL = (eventId) => {
  return (dispatch, getState) => {
    const userCred = getState().landing.userCred;
    dispatch({
      type: "TOGGLE_JOIN_LOADING",
      payload: true,
    })
    dispatch({
      type: "CLEAR_JOIN_ERROR"
    })
    axios({
      url: `${apiURL}/attendees`,
      method: 'POST',
      headers: {
        access_token: userCred.access_token,
      },
      data: {
        EventId: eventId
      }
    })
      .then(({ data }) => {
        // if success join event, fetch event id?
        dispatch(FETCH_EVENT_DETAIL(eventId))
      })
      .catch(err => {
        // if error join event, show error?
        dispatch({
          type: "SET_JOIN_ERROR",
          payload: err.message
        })
      })
      .finally(_ => {
        dispatch({
          type: "TOGGLE_JOIN_LOADING",
          payload: false,
        })
      })
  }
}