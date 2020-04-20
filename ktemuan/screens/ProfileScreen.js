import React from 'react';
import { Layout, Text, Avatar } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { FETCH_PROFILE_DETAIL } from '../store/actions';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileItem from '../components/ProfileScreen/ProfileItem';

const ava_placeholder = require('../assets/profile-placeholder_f56af.png');

function ProfileScreen({ navigation, route }) {
  const { userId } = route.params;
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile.profile)

  React.useEffect(() => {
    // fetch profile
    dispatch(FETCH_PROFILE_DETAIL(userId))
  }, [userId, dispatch])

  const Stack = createStackNavigator()

  let profileContent = <></>
  profileContent = ProfileItem

  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="profileContent" component={profileContent} />
    </Stack.Navigator>
    // <Layout style={{flex: 1}}>
    //   <Text category='h1'>PROFILE</Text>
    //   <Layout style={{flex: 1, alignItems: 'center'}}>
    //     <Avatar source={ava_placeholder} size='giant' loadingIndicatorSource={ava_placeholder} />
    //     <Text>Email</Text>
    //   </Layout>
    //   <Layout style={{flex: 3}}>
    //     <Text>profile id to fetch : { userId }</Text>
    //     <Text>Show List of SOmething, friendlist?</Text>
    //     <Text>Show another list of something, event?</Text>
    //   </Layout>
    // </Layout>
  )
}

export default ProfileScreen;