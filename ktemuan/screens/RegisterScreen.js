import React from 'react';
import { Layout, Text, Input, Button, Avatar, Divider, Icon } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { POST_REGISTER, CHECK_PERSISTED_CRED } from '../store/actions';

import { AsyncStorage } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const needLogin = useSelector(state => state.landing.needLogin);
  const registerError = useSelector(state => state.landing.registerError);

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const [showChar, setShowChar] = React.useState(false);

  // const [firstnameError, setFirstnameError] = React.useState(registerError.firstname || '');
  // const [lastnameError, setLastnameError] = React.useState(registerError.lastname || '');
  // const [emailError, setEmailError] = React.useState(registerError.email || '');
  // const [passwordError, setPasswordError] = React.useState(registerError.password || '');

  React.useEffect(() => {
    if (needLogin === false && navigation.isFocused()) {
      navigation.navigate('Browsing');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Browsing' }],
      });
    }
  }, [needLogin])

  function toggleShowChar() {
    setShowChar(!showChar)
  }
  function handlePressOut() {
    // clear error baru dispatch yg lain
    dispatch({
      type: "CLEAR_REGISTER_ERROR"
    })
    const body = {
      firstname: firstName,
      lastname: lastName,
      email,
      password,
      photo_url: photo,
    }

    dispatch(POST_REGISTER(body))
  }

  if (needLogin === false && navigation.isFocused()) {
    navigation.navigate('Browsing');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Browsing' }],
    });
  }

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleShowChar}>
      <Icon {...props} name={showChar ? 'eye-outline' : 'eye-off-outline'} />
    </TouchableWithoutFeedback>
  )

  return (
    <Layout style={{ flex: 1, padding: 15 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Avatar source={require('../assets/logotype01_small.png')} size='giant' style={{ borderRadius: 0 }} />
        <Text style={{ fontWeight: 'bold'}}>K-TEAM-ONE</Text>
      </Layout>
      <Layout style={{ flex: 3 }}>
        <KeyboardAwareScrollView>
          <Input
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
            caption={ registerError.email || '' }
            status={registerError.email ? 'danger' : ''}
          />
          <Divider />
          <Input
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showChar}
            accessoryRight={renderIcon}
            caption={ registerError.password || '' }
            status={registerError.password ? 'danger' : ''}
          />
          <Divider />
          <Input
            placeholder='First Name'
            value={firstName}
            onChangeText={setFirstName}
            caption={ registerError.firstname || '' }
            status={registerError.firstname ? 'danger' : ''}
          />
          <Divider />
          <Input
            placeholder='Last Name'
            value={lastName}
            onChangeText={setLastName}
            caption={ registerError.lastname || '' }
            status={registerError.lastname ? 'danger' : ''}
          />
          <Divider />
          <Input
            placeholder='Photo'
            value={photo}
            onChangeText={setPhoto}
            caption='Photo error placeholder'
          />
          <Divider />
          <Button>Pickaphoto</Button>
          <Divider />
          <Button onPressOut={handlePressOut}>Register</Button>
        </KeyboardAwareScrollView>
      </Layout>
    </Layout>
  )
}

export default RegisterScreen;