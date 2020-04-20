import React from 'react';
import { Layout, Text, Avatar, Button } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

const ava_placeholder = require('../../assets/profile-placeholder_f56af.png');

function ProfileItem({}) {
  const profile = useSelector(state => state.profile.profile)

  return (
    <Layout style={{flex: 1}}>
      <Button
        // onPressOut={() => navigation}
      >Back</Button>
      <Text category='h1'>PROFILE</Text>
      <Layout style={{flex: 1, alignItems: 'center'}}>
        <Avatar source={ava_placeholder} size='giant' loadingIndicatorSource={ava_placeholder} />
        <Text>Email</Text>
      </Layout>
      <Layout style={{flex: 3}}>
        <Text>profile id to fetch : { profile.id }</Text>
        <Text>Show List of SOmething, friendlist?</Text>
        <Text>Show another list of something, event?</Text>
      </Layout>
    </Layout>
  )
}

export default ProfileItem;