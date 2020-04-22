import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { styles } from '../../styles';

function ProfileEmpty({ navigation }) {
  return (
    <Layout style={[styles.container], {justifyContent: 'center', alignItems: 'center'}}>
      <Text>Empty Profile</Text>
    </Layout>
  )
}

export default ProfileEmpty;