import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { styles } from '../../styles';

function ProfileLoading({ navigation }) {
  return (
    <Layout style={[styles.container], {justifyContent: 'center', alignItems: 'center'}}>
      <Text>Fetching profile data...</Text>
    </Layout>
  )
}

export default ProfileLoading;