import React from 'react';
import { Layout, Text, Avatar, Button } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

const ava_placeholder = require('../../assets/profile-placeholder_f56af.png');

function ProfileItem() {
  const profile = useSelector(state => state.profile.profile)

  let photoUrl = ava_placeholder
  if (profile.email) photoUrl = { uri: `https://api.adorable.io/avatars/125/${profile.email}.png` }

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Avatar source={photoUrl} size="giant" />
      <Text category="h4">{ profile.firstname } { profile.lastname }</Text>
      <Text>{ profile.email }</Text>
      {/* <Button style={{marginTop: 30}} size="small" onPressOut={() => dispatch(LOGOUT())}>Logout</Button> */}
      {/* <Text>{ JSON.stringify(userCred) }</Text> */}
    </Layout>
  )
}

export default ProfileItem;