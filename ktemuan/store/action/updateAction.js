import { apiURL, appStorageKey } from './index';
import axios from 'axios';

function updateEventErrorFromArrMsg(arrMsg) {
  let result = {};
  let selector = {
    keyword: [
      "date/time",
      "event name",
      "category",
      "event description",
      "maximum attendees",
    ],
    field: ["datetime", "name", "category", "description", "maxAttendees"],
  };
  arrMsg.forEach((msg) => {
    selector.keyword.forEach((item, index) => {
      if (msg.toLowerCase().includes(item)) result[selector.field[index]] = msg;
    });
  });

  return result;
  // {
  //   "errors": Array [
  //     "You must select date/time in the future",
  //     "Event name cannot be empty",
  //     "Category cannot be empty",
  //     "Category is not valid",
  //     "Event description cannot be empty",
  //     "Event description at least has 10 characters",
  //     "Maximum attendees cannot be empty",
  //   ],
  //   "message": "Bad Request",
  // }
}

export const PATCH_EVENT = (inputObj) => {
  return (dispatch, getState) => {
    const {
      name,
      category,
      description,
      max_attendees,
      location,
      date_time,
      file,
      userCred,
    } = inputObj;

    let tags = [72];
    const strTags = JSON.stringify(tags);
    const strLoc = JSON.stringify(location);
    let body = new FormData();
    let newCategory = category.toLowerCase();
    body.append("image", file);
    body.append("category", newCategory);
    body.append("name", name);
    body.append("description", description);
    body.append("max_attendees", max_attendees);
    body.append("date_time", date_time);
    body.append("location", strLoc);
    body.append("tags", strTags);

    dispatch({
      type: "TOGGLE_UPDATE_LOADING",
      payload: true
    })

    axios({
      url: `${apiURL}/events/${eventId}`,
      method: "PATCH",
      headers: {
        access_token: userCred.access_token
      },
      data: body
    })
      .then(_ => {
        dispatch({
          type: "TOGGLE_UPDATE_EVENT_SUCCESS"
        })
      })
      .catch(err => {
        try {
          let objError = updateEventErrorFromArrMsg(
            err.response.data.errors || []
          );
          dispatch({
            type: "SET_SUBMIT_EVENT_ERROR",
            payload: objError,
          });
        }
        catch(error) {
        }
      })
      .finally(_ => {
        dispatch({
          type: "TOGGLE_UPDATE_LOADING",
          payload: false
        })
      })
  }
}

export const FETCH_EVENT_TO_UPDATE = (eventId) => {
  return (dispatch, getState) => {
    const userCred = getState().landing.userCred;
    dispatch({
      type: "TOGGLE_UPDATE_LOADING",
      payload: true
    })
    axios({
      url: `${apiURL}/events/${eventId}`,
      method: 'GET',
      headers: {
        access_token: userCred.access_token
      }
    })
      .then(({ data }) => {
        dispatch({
          type: "SET_EVENT_TO_UPDATE",
          payload: data.event
        })
      })
      .catch(err => {
        try {
          console.log(err)
        } catch (error) {
          console.log(error)
        }
      })
      .finally(_ => {
        dispatch({
          type: "TOGGLE_UPDATE_LOADING",
          payload: false
        })
      })
  }
}