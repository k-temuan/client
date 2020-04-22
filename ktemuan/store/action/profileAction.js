import { apiURL } from './index';
import axios from 'axios';

export const FETCH_PROFILE_DETAIL = (userId) => {
  return (dispatch, getState) => {
    const userCred = getState().landing.userCred
    dispatch({
      type: "SET_PROFILE",
      payload: { id: userId },
    });
    dispatch({
      type: "TOGGLE_PROFILE_LOADING",
      payload: true
    })
    dispatch({
      type: "CLEAR_PROFILE_ERROR"
    })
    axios({
      url: `${apiURL}/users/${userId}`,
      method: "GET",
      headers: {
        access_token: userCred.access_token
      }
    })
      .then(({ data }) => {
        dispatch({
          type: "SET_PROFILE",
          payload: data.user,
        });
      })
      .catch(err => {
        try {
          dispatch({
            type: "SET_PROFILE_ERROR",
            payload: err.message
          })
        } catch (error) {
          // console.log(error)
        }
      })
      .finally(_ => {
        dispatch({
          type: "TOGGLE_PROFILE_LOADING",
          payload: false
        })
      })
  };
};