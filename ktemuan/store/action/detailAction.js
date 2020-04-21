import axios from "axios";
import { AsyncStorage } from "react-native";
// import { SERVER_URL } from 'react-native-dotenv';

import { apiURL, appStorageKey } from "./index";

export const FETCH_EVENT_DETAIL = (id) => {
  return (dispatch, getState) => {
    // handle cached events
    // console.log(getState())
    const cachedEvent = getState().event.events;
    const userCred = getState().landing.userCred;
    let event = cachedEvent.filter((item) => item.id === id)[0];
    dispatch({
      type: "SET_EVENT",
      payload: event,
    });

    let detailStatusTemplate = {
      fetchLoading: false,
      emptyDetail: false,
      errorDetail: null,
    };
    dispatch({
      type: "TOGGLE_FETCH_DETAIL_LOADING",
      payload: {
        ...detailStatusTemplate,
        fetchLoading: true,
      },
    });
    axios({
      url: `${apiURL}/events/${id}`,
      method: "GET",
      headers: {
        access_token: userCred.access_token,
      },
    })
      .then(({ data }) => {
        console.log(data);
        dispatch({
          type: "SET_EVENT",
          payload: data.event,
        });
      })
      .catch((err) => {
        try {
          console.log(err.response);
          dispatch({
            type: "SET_FETCH_DETAIL_ERROR",
            payload: {
              ...detailStatusTemplate,
              errorDetail: err.response.data.errors,
            },
          });
        } catch (error) {
          console.log(error);
          dispatch({
            type: "SET_FETCH_DETAIL_ERROR",
            payload: {
              ...detailStatusTemplate,
              errorDetail: ["Failed to fetch event detail"],
            },
          });
        }
      })
      .finally((_) => {
        setTimeout(() => {
          dispatch({
            type: "TOGGLE_FETCH_DETAIL_LOADING",
            payload: {
              ...detailStatusTemplate,
              fetchLoading: false,
            },
          });
        }, 500);
      });
  };
};

export const DELETE_EVENT = ({ eventId, userCred }) => {
  return (dispatch, getState) => {
    axios({
      url: `${apiURL}/events/${eventId}`,
      method: "DELETE",
      headers: {
        access_token: userCred.access_token,
      },
    })
      .then(({ data }) => {})
      .catch((err) => {
        console.log(err);
      });
  };
};
