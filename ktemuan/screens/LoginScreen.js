import React from 'react';
import { Layout, Text, Input, Button, Avatar, Divider, Spinner } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

import { POST_LOGIN } from '../store/actions';

function LoginScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const needLogin = useSelector(state => state.landing.needLogin);
  const loginError = useSelector(state => state.landing.loginError);
  const loginLoading = useSelector(state => state.landing.loginLoading);
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    if (needLogin === false && navigation.isFocused()) {
      navigation.navigate('Browsing');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Browsing' }],
      });
    }
  }, [needLogin])
  
  function handlePressOut() {
    dispatch({
      type: "CLEAR_LOGIN_ERROR"
    })
    if (email && password) {
      const body = {
        email,
        password
      }
      dispatch(POST_LOGIN(body))
      // setEmail('');
      // setPassword('');
    }
  }
  
  return (
    <Layout style={{ flex: 1, padding: 15 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Avatar source={require('../assets/logotype01_small.png')} size='giant' style={{ borderRadius: 0 }} />
        <Text style={{ fontWeight: 'bold'}}>K-TEMUAN</Text>
        <Text status='danger' >{ loginError.message || '' }</Text>
      </Layout>
      <Layout style={{ flex: 3 }}>
        <Input
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          disabled={loginLoading}
        />
        <Input
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          disabled={loginLoading}
        />
        <Divider />
        <Button
          onPressOut={handlePressOut}
          disabled={loginLoading}
        >{ loginLoading ? <Spinner size='tiny' /> : <></>} Login</Button>
      </Layout>
    </Layout>
  )
}

export default LoginScreen;