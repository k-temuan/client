import React from 'react';
import { Layout, Text, Avatar, Button, Divider } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import { LOGOUT } from '../store/action/landingAction';

const ava_placeholder = require('../assets/profile-placeholder_f56af.png');
// uri: `https://api.adorable.io/avatars/125/${event.User.email}.png`
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
  if (userCred.email) photoUrl = { uri: `https://api.adorable.io/avatars/125/${userCred.email}.png` }
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Avatar source={photoUrl} size="giant" />
      <Text category="h4">{ userCred.firstname } { userCred.lastname }</Text>
      <Text>{ userCred.email }</Text>
      <Button style={{marginTop: 30}} size="small" onPressOut={() => dispatch(LOGOUT())}>Logout</Button>
      {/* <Text>{ JSON.stringify(userCred) }</Text> */}
    </Layout>
  )
}

export default UserProfileScreen;