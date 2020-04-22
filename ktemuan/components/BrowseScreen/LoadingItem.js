import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { styles } from '../../styles';

function LoadingItem() {
  return(
    <Layout style={[styles.container]}>
      <Text>Loading Item</Text>
    </Layout>
  )
}

export default LoadingItem;