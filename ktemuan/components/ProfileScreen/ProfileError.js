import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { styles } from '../../styles';

function ProfileError({ navigation }) {
  return (
    <Layout style={[styles.container], {justifyContent: 'center', alignItems: 'center'}}>
      <Text>Error fetch profile data</Text>
    </Layout>
  )
}

export default ProfileError;