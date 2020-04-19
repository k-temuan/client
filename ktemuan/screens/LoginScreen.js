import React from 'react';
import { Layout, Text, Input, Button, Avatar, Divider } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

function LoginScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const needLogin = useSelector(state => state.needLogin);
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handlePressOut() {
    dispatch({
      type: "CLEAR_LOGIN_ERROR"
    })
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
      </Layout>
      <Layout style={{ flex: 3 }}>
        <Input
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Divider />
        <Button onPressOut={handlePressOut}>Login</Button>
      </Layout>
    </Layout>
  )
}

export default LoginScreen;