import React from 'react';
import { Layout, Text, Spinner } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { CHECK_PERSISTED_CRED } from '../store/actions';
import { AsyncStorage } from 'react-native';
import { styles } from '../styles';

function LoadingSplashScreen({ navigation }) {
  const dispatch = useDispatch()
  const needlogin = useSelector(state => state.needlogin);

  // development: mock persisted cred is exist
  function mockPersistedCred() {
    const objCred = {
      // access_token: 'lelegoyanglucuk',
      user: {
          id: 1,
          email: 'lele@goyang.com',
          firstname: 'lele',
          lastname: 'goyang',
          photo_url: 'https://i1.sndcdn.com/artworks-000362148141-i3ilpf-t500x500.jpg'
      }
    }
    // return AsyncStorage.setItem('ktemuan@AsyncStorage', JSON.stringify(objCred))
  }
  if (navigation.isFocused()) {
    // mockPersistedCred()
    // // checkServer()
    //   .then(_ => {
    //     dispatch(CHECK_PERSISTED_CRED())
    //     setTimeout(() => {
    //       navigation.navigate('Landing')
    //     }, 1000)
    //   })
    dispatch(CHECK_PERSISTED_CRED())
    if (needlogin) {
      navigation.navigate('Landing');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Landing' }],
      });
    } else {
      navigation.navigate('Browsing');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Browsing' }],
      });
    }
  }

  // dispatch(CHECK_PERSISTED_CRED)
  
  // a spash screen with loading prompt, doing it's best to cover up the fact that the app did something in the background
  // followings will be done in actions:
  // read persisting cred in asyncstorage
  // if exist check if legit
  //  if legit send to browsing, save cred and toggle needlogin to false (will send to browsing)
  //  else remove persisting cred, toggle needlogin to true (will send to landing)
  // if not exist set needlogin to true (will send to landing)
  return (
    <Layout style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
      <Text category='h1'>Please wait while we prepare your app</Text>
    </Layout>
  )
}

export default LoadingSplashScreen;