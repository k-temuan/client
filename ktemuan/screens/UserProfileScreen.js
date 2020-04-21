import React from 'react';
import { Layout, Text, Avatar, Button, Divider } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import { LOGOUT } from '../store/action/landingAction';

const ava_placeholder = require('../assets/profile-placeholder_f56af.png');

function UserProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const userCred = useSelector(state => state.landing.userCred);
  const needLogin = useSelector(state => state.landing.needLogin);

  React.useEffect(() => {
    if (needLogin) {
      navigation.navigate("Landing")
      navigation.reset({
        index: 0,
        routes: [{ name: "Landing" }]
      })
    }
  }, [dispatch, userCred, needLogin])

  let photoUrl = ava_placeholder
  // if (userCred.photo_url)
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category='h1'>User Profile Screen</Text>
      <Avatar source={photoUrl} />
      <Text>{ userCred.firstname } { userCred.lastname }</Text>
      <Text>{ userCred.email }</Text>
      <Button onPressOut={() => dispatch(LOGOUT())}>Logout</Button>
      {/* <Text>{ JSON.stringify(userCred) }</Text> */}
      <Text>Fetch attended event here</Text>
    </Layout>
  )
}

export default UserProfileScreen;