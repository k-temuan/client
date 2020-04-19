import React from 'react';
import { Layout, Text, Input, Button, Avatar, Divider } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

import { POST_REGISTER, CHECK_PERSISTED_CRED } from '../store/actions';

import { AsyncStorage } from 'react-native';

function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const needLogin = useSelector(state => state.needLogin);
  const registerError = useSelector(state => state.registerError);

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [photo, setPhoto] = React.useState('');

  function handlePressOut() {
    // development: mock persisted cred is exist
    dispatch(CHECK_PERSISTED_CRED())

    // clear error baru dispatch yg lain
    dispatch({
      type: "CLEAR_REGISTER_ERROR"
    })
  }

  if (needLogin === false && navigation.isFocused()) {
    navigation.navigate('Browsing');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Browsing' }],
    });
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
        <Input
          placeholder='First Name'
          value={firstName}
          onChangeText={setFirstName}
        />
        <Input
          placeholder='Last Name'
          value={lastName}
          onChangeText={setLastName}
        />
        <Input
          placeholder='Photo'
          value={photo}
          onChangeText={setPhoto}
        />
        <Button>Pickaphoto</Button>
        <Divider />
        <Button onPressOut={handlePressOut}>Register</Button>
      </Layout>
    </Layout>
  )
}

export default RegisterScreen;