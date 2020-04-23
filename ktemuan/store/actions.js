import axios from "axios";
import { AsyncStorage } from "react-native";

// const apiURL = "http://192.168.43.189:3000";
const apiURL = "https://k-temuan.herokuapp.com";

const appStorageKey = "ktemuan@AsyncStorage";

function objErrorFromArrMsg(arrMsg) {
  // generate registerError msg from string error message
  let result = {};
  let selector = ["password", "email", "firstname", "lastname"];
  arrMsg.forEach((msg) => {
    selector.forEach((item) => {
      if (msg.toLowerCase().includes(item)) result[item] = msg;
      else result.message = msg;
    });
  });
  return result;
}
function submitEventErrorFromArrMsg(arrMsg) {
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

export const POST_EVENT = (inputObj) => {
  return (dispatch) => {
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

    let tags = [1];
    // tags.push(1)
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
      type: "TOGGLE_SUBMIT_EVENT_LOADING",
      payload: true,
    });

    // axios issue, content-type field on headers are deleted, resulting Network Error
    axios({
      url: `${apiURL}/events`,
      method: "POST",
      headers: {
        access_token: userCred.access_token,
      },
      data: body,
    })
      .then((res) => {
        dispatch({
          type: "TOGGLE_SUBMIT_EVENT_SUCCESS",
        });
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          for (let key of Object.keys(err)) {
            // console.log(err[key]);
          }
        } else if (err.response) {
          let objError = submitEventErrorFromArrMsg(
            err.response.data.errors || []
          );
          dispatch({
            type: "SET_SUBMIT_EVENT_ERROR",
            payload: objError,
          });
        } else {
          // console.log(err);
        }
        dispatch({
          type: "TOGGLE_SUBMIT_EVENT",
        });
      })
      .finally((_) => {
        dispatch({
          type: "TOGGLE_SUBMIT_EVENT_LOADING",
          payload: false,
        });
      });
  };
};

export const CHECK_PERSISTED_CRED = () => {
  return (dispatch) => {
    let objCred = {};
    AsyncStorage.getItem(appStorageKey)
      .then((result) => {
        if (result) {
          objCred = JSON.parse(result);
          if (objCred.access_token) {
            return axios({
              url: `${apiURL}/events/1`,
              method: "GET",
              headers: {
                access_token: objCred.access_token,
              },
            });
          } else {
            throw new Error("NO_PERSISTED_TOKEN");
          }
        } else {
          throw new Error("NO_PERSISTED_CRED");
        }
      })
      .then((_) => {
        dispatch({
          type: "SET_USER_CRED",
          payload: objCred,
        });
        dispatch({
          type: "TOGGLE_NEED_LOGIN",
          payload: false,
        });
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            dispatch({
              type: "SET_USER_CRED",
              payload: objCred,
            });
            dispatch({
              type: "TOGGLE_NEED_LOGIN",
              payload: false,
            });
          } else {
            dispatch({
              type: "CLEAR_USER_CRED",
            });
            dispatch({
              type: "TOGGLE_NEED_LOGIN",
              payload: true,
            });
          }
        } else {
          dispatch({
            type: "CLEAR_USER_CRED",
          });
          dispatch({
            type: "TOGGLE_NEED_LOGIN",
            payload: true,
          });
        }
      });
  };
};

export const SAVE_CRED = (credObj) => {
  return (dispatch) => {
    // currently replacing all parsed data in async storage
    AsyncStorage.setItem(appStorageKey, JSON.stringify(credObj))
      .then((_) => {
        // from axios, save to asyncstorage
        dispatch({
          type: "SET_USER_CRED",
          payload: credObj,
        });
        dispatch({
          type: "TOGGLE_NEED_LOGIN",
          payload: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: "SET_TEST_VALUE",
          payload: err.message,
        });
      });
  };
};

export const POST_LOGIN = (body) => {
  return (dispatch) => {
    const { email, password } = body;

    dispatch({
      type: "TOGGLE_LOGIN_LOADING",
      payload: true,
    });

    //axios resolve usercred
    axios({
      url: `${apiURL}/login`,
      method: "POST",
      data: { email, password },
    })
      .then(({ data }) => {
        dispatch(SAVE_CRED(data));
      })
      .catch((err) => {
        if (err.response) {
          let msg = "error undefined";
          if (err.response.data) {
            msg = err.response.data.errors[0] || "error undefined";
          }
          dispatch({
            type: "SET_LOGIN_ERROR",
            payload: { message: msg },
          });
        } else {
          dispatch({
            type: "SET_LOGIN_ERROR",
            payload: { message: err.message },
          });
        }
      })
      .finally((_) => {
        dispatch({
          type: "TOGGLE_LOGIN_LOADING",
          payload: false,
        });
      });
  };
};

export const POST_REGISTER = (body) => {
  return (dispatch) => {
    const { firstname, lastname, email, password, photo_url } = body;
    dispatch({
      type: "TOGGLE_REGISTER_LOADING",
      payload: true,
    });

    //axios resolve usercred
    axios({
      url: `${apiURL}/register`,
      method: "POST",
      data: body,
    })
      .then(({ data }) => {
        let objCred = {
          access_token: data.access_token,
          user: { ...data.user },
        };
        dispatch(SAVE_CRED(objCred));
      })
      .catch((err) => {
        if (err.response) {
          let objError = objErrorFromArrMsg(err.response.data.errors);
          dispatch({
            type: "SET_REGISTER_ERROR",
            payload: objError,
          });
        } else {
          dispatch({
            type: "SET_REGISTER_ERROR",
            payload: err.message,
          });
        }
      })
      .finally((_) => {
        dispatch({
          type: "TOGGLE_REGISTER_LOADING",
          payload: false,
        });
      });
  };
};

export const FETCH_EVENTS = ({ userCred }) => {
  return (dispatch) => {
    let events_status_template = {
      loading: false,
      empty: false,
      error: null,
    };
    dispatch({
      type: "SET_EVENTS_STATUS",
      payload: {
        ...events_status_template,
        loading: true,
      },
    });
    axios({
      url: `${apiURL}/events`,
      method: "GET",
      headers: {
        access_token: userCred.access_token,
      },
    })
      .then(({ data }) => {
        dispatch({
          type: "SET_EVENTS",
          payload: data.events,
        });
        if (data.length === 0) {
          events_status_template = {
            ...events_status_template,
            empty: true,
          };
        }
      })
      .catch((err) => {
        //
        if (err.response) {
          try {
            // console.log(err.response.data.errors);
            let msg = err.response.data.errors[0];
            events_status_template = {
              ...events_status_template,
              error: msg,
            };
          } catch (error) {
            for (let key of Object.keys(error)) {
              // console.log(error[key]);
            }
          }
        }
      })
      .finally((_) => {
        dispatch({
          type: "SET_EVENTS_STATUS",
          payload: {
            ...events_status_template,
            loading: false,
          },
        });
      });
  };
};

export const FETCH_PROFILE_DETAIL = (userId) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_PROFILE",
      payload: { id: userId },
    });
  };
};

// export const FETCH_EVENT_DETAIL = (id) => {
//   return (dispatch, getState) => {
//     // handle cached events
//     // console.log(getState())
//     const cachedEvent = getState().event.events;
//     const event = cachedEvent.filter((item) => item.id === id)[0];
//     dispatch({
//       type: "SET_EVENT",
//       payload: event,
//     });
//   };
// };

export const FETCH_EVENT_ATENDEES = (eventId) => {
  return (dispatch, getState) => {
    const cachedAtendees = getState().detail.event.users || [];
    dispatch({
      type: "SET_ATENDEES",
      payload: cachedAtendees,
    });
    // axios({
    //   url: `${apiURL}/events/${eventId}`
    // })
  };
};
