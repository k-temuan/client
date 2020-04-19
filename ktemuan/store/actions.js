import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { SERVER_URL } from 'react-native-dotenv';

const apiURL = 'http://192.168.43.189:3000'
const appStorageKey = 'ktemuan@AsyncStorage';

function objErrorFromArrMsg(arrMsg) {
  // generate registerError msg from string error message
  let result = {}
  let selector = ['password', 'email', 'firstname', 'lastname']
  arrMsg.forEach(msg => {
    selector.forEach(item => {
      if (msg.toLowerCase().includes(item)) result[item] = msg
      else result.message = msg
    })
  })
  return result
}

export const CHECK_PERSISTED_CRED = () => {
  return (dispatch) => {
    let objCred = {}
    AsyncStorage.getItem(appStorageKey)
      .then(result => {
        // console.log(JSON.parse(result));
        if (result) {
          objCred = JSON.parse(result);
          // to skip register/login page dev
          // dispatch({
          //   type: "SET_USER_CRED",
          //   payload: objCred
          // })
          // dispatch({
          //   type: "TOGGLE_NEED_LOGIN",
          //   payload: false
          // })

          // ENABLE IF SERVER AVAILABLE
          // how to check if token is valid? currently, fetch something
          if (objCred.access_token) {
            return axios({
              url: `${apiURL}/users/9999`,
              method: 'GET',
              headers: {
                access_token: objCred.access_token
              }
            })
          } else {
            throw new Error('NO_PERSISTED_TOKEN')
          }
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
    AsyncStorage.setItem(appStorageKey, JSON.stringify(credObj))
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
        console.log('cred saved to async storage')
      })
      .catch(err => {
        dispatch({
          type: "SET_TEST_VALUE",
          payload: err.message
        })
      })
  }
}

export const POST_LOGIN = (body) => {
  return (dispatch) => {
    const { email, password } = body;
    
    dispatch({
      type: "TOGGLE_LOGIN_LOADING",
      payload: true
    })

    //axios resolve usercred
    axios({
      url: `${apiURL}/login`,
      method: 'POST',
      data: { email, password }
    })
      .then(({ data }) => {
        dispatch(SAVE_CRED(data))
      })
      .catch(err => {
        if (err.response) {
          let msg = err.response.data.errors[0] || 'error undefined'
          dispatch({
            type: "SET_LOGIN_ERROR",
            payload: { message: msg }
          })
        } else {
          dispatch({
            type: "SET_LOGIN_ERROR",
            payload: { message: err.message }
          })
        }
      })
      .finally(_ => {
        dispatch({
          type: "TOGGLE_LOGIN_LOADING",
          payload: false
        })
      })
  }
}

export const POST_REGISTER = (body) => {
  return (dispatch) => {
    const { firstname, lastname, email, password, photo_url } = body;
    dispatch({
      type: 'TOGGLE_REGISTER_LOADING',
      payload: true
    })

    //axios resolve usercred
    axios({
      url: `${apiURL}/register`,
      method: 'POST',
      data: body
    })
    .then(({ data }) => {
      let objCred = {
        access_token: data.access_token,
        user: {...data.user}
      }
      dispatch(SAVE_CRED(objCred))
    })
    .catch(err => {
      if (err.response) {
        let objError = objErrorFromArrMsg(err.response.data.errors);
        dispatch({
          type: "SET_REGISTER_ERROR",
          payload: objError
        })
      } else {
        dispatch({
          type: "SET_REGISTER_ERROR",
          payload: err.message
        })
      }
    })
    .finally(_ => {
      dispatch({
        type: 'TOGGLE_REGISTER_LOADING',
        payload: false
      })
    })
  }
}

export const FETCH_EVENTS = ({ userCred }) => {
  return (dispatch) => {
    let events_status_template = {
      loading: false,
      empty: false,
      error: null,
    }
    
    dispatch({
      type: "SET_SCREEN_LOADING",
      payload: true
    })
    dispatch({
      type: "SET_EVENTS_STATUS",
      payload: {
        ...events_status_template,
        loading: true
      }
    })
    axios({
      url: `${apiURL}/events`,
      method: 'GET',
      headers: {
        access_token: userCred.access_token
      }
    })
      .then(({ data }) => {
        dispatch({
          type: "SET_EVENTS",
          payload: data.events
        })
        if (data.length === 0) {
          events_status_template = {
            ...events_status_template,
            empty: true
          }
        }
      })
      .catch((err) => {
        events_status_template = {
          ...events_status_template,
          error: 'error'
        }
      })
      .finally(_ => {
        dispatch({
          type: "SET_SCREEN_LOADING",
          payload: false
        })
        dispatch({
          type: "SET_EVENTS_STATUS",
          payload: {
            ...events_status_template,
            loading: false
          }
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