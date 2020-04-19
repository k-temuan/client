import React from 'react';
import { Layout, Text, Input, Button, Avatar, Divider, Spinner } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

import { POST_LOGIN } from '../store/actions';

function LoginScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const needLogin = useSelector(state => state.needLogin);
  const loginError = useSelector(state => state.loginError);
  const loginLoading = useSelector(state => state.loginLoading);
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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
    if (needLogin === false && navigation.isFocused()) {
      navigation.navigate('Browsing');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Browsing' }],
      });
    }
  }
  
  return (
    <Layout style={{ flex: 1, padding: 15 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Avatar source={require('../assets/logotype01_small.png')} size='giant' style={{ borderRadius: 0 }} />
        <Text style={{ fontWeight: 'bold'}}>K-TEAM-ONE</Text>
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