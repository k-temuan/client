import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { SERVER_URL } from 'react-native-dotenv';

const apiURL = SERVER_URL || 'http://localhost:3000'
const appStorageKey = 'ktemuan@AsyncStorage';

function objErrorFromMsg(msg) {
  // generate registerError msg from string error message
  let result = {}
  let selector = ['password', 'email', 'first name', 'last name']
  selector.forEach(item => {
    if (msg.toLowerCase().includes(item)) result[item] = msg
    else result.message = msg
  })
  return result
}

export const CHECK_PERSISTED_CRED = () => {
  return (dispatch) => {
    let objCred = {}
    AsyncStorage.getItem(appStorageKey)
      .then(result => {
        console.log(JSON.parse(result));
        if (result) {
          objCred = JSON.parse(result);
          // for dev
          dispatch({
            type: "SET_USER_CRED",
            payload: objCred
          })
          dispatch({
            type: "TOGGLE_NEED_LOGIN",
            payload: false
          })
          
          // how to check if token is valid? currently, fetch something
          // if (objCred.access_token) {
          //   return axios({
          //     url: `${apiURL}/users/9999`,
          //     method: 'GET',
          //     headers: {
          //       access_token: objCred.access_token
          //     }
          //   })
          // } else {
          //   throw new Error('NO_PERSISTED_TOKEN')
          // }
        } else {
          throw new Error('NO_PERSISTED_CRED')
        }
      })
      .then(_ => {
        dispatch({
          type: "SET_USER_CRED",
          payload: objCred
        })
        dispatch({
          type: "TOGGLE_NEED_LOGIN",
          payload: false
        })
      })
      .catch(_ => {
        dispatch({
          type: "CLEAR_USER_CRED"
        })
        dispatch({
          type: "TOGGLE_NEED_LOGIN",
          payload: true
        })
      })
  }
}

export const SAVE_CRED = (credObj) => {
  return (dispatch) => {
    // currently replacing all parsed data in async storage
    AsyncStorage.setItem(appStorageKey, JSON.stringify(objCred))
      .then(_ => {
        // from axios, save to asyncstorage
        dispatch({
          type: "SET_USER_CRED",
          payload: credObj
        })
        dispatch({
          type: "TOGGLE_NEED_LOGIN",
          payload: false
        })
      })
  }
}

export const POST_LOGIN = (body) => {
  return (dispatch) => {
    //axios resolve usercred
    let data = {}
    dispatch(SAVE_CRED())
    //axios reject error
    let errorMsg = '';
    dispatch({
      type: "SET_LOGIN_ERROR",
      payload: errorMsg
    })
  }
}

export const POST_REGISTER = (body) => {
  return (dispatch) => {
    //axios resolve usercred
    let data = {}
    dispatch(SAVE_CRED(data))
    //axios reject register error
    let objError = objErrorFromMsg(err.response.error.message) // ???
    dispatch({
      type: "SET_REGISTER_ERROR",
      payload: obj
    })
  }
}

export const FETCH_EVENTS = () => {
  return (dispatch) => {
    dispatch({
      type: "SET_SCREEN_LOADING",
      payload: true
    })
    axios({
      url: `${apiURL}/events`,
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