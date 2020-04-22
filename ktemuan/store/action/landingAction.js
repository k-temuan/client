import axios from 'axios';
import { AsyncStorage } from 'react-native';
// import { SERVER_URL } from 'react-native-dotenv';

// const apiURL = 'http://192.168.43.189:3000';
// const appStorageKey = 'ktemuan@AsyncStorage';

import {apiUrl, appStorageKey} from './index';

export const LOGOUT = () => {
  return (dispatch) => {
    // hapus cred, toggle need login, hapus persisted
    AsyncStorage.setItem(appStorageKey, '')
      .then(_ => {
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