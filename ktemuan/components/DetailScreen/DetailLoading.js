import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { styles } from '../../styles';

function DetailLoading({ navigation }) {
  return (
    <Layout style={[styles.container]}>
      <Text category='h1'>Loading event detail</Text>
    </Layout>
  )
}

export default DetailLoading;