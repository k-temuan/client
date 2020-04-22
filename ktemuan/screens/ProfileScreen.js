import React from 'react';
import { Layout, Text, Avatar } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { FETCH_PROFILE_DETAIL } from '../store/action/profileAction';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileItem from '../components/ProfileScreen/ProfileItem';
import ProfileLoading from '../components/ProfileScreen/ProfileLoading';
import ProfileError from '../components/ProfileScreen/ProfileError';

const ava_placeholder = require('../assets/profile-placeholder_f56af.png');

function ProfileScreen({ navigation, route }) {
  const { userId } = route.params;
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile.profile);
  const profileLoading = useSelector(state => state.profile.profileLoading);
  const profileError = useSelector(state => state.profile.profileError);

  React.useEffect(() => {
    dispatch(FETCH_PROFILE_DETAIL(userId))
  }, [userId, dispatch])

  const Stack = createStackNavigator()

  let profileContent = <></>
  if (profileLoading) profileContent = ProfileLoading
  else if (profileError) profileContent = ProfileError
  else profileContent = ProfileItem

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="profileContent" component={profileContent} />
    </Stack.Navigator>
  )
}

export default ProfileScreen;