import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

function ProfileScreen({ navigation, route }) {
  const { userId } = route.params;
  return (
    <Layout>
      <Text category='h1'>PROFILE</Text>
      <Text>profile id to fetch : { userId }</Text>
    </Layout>
  )
}

export default ProfileScreen;