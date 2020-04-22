import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { styles } from '../../styles';

function AttendeeListLoading({ navigation }) {
  return (
    <Layout style={[styles.container]}>
      <Text>Loading attendee list...</Text>
    </Layout>
  )
}

export default AttendeeListLoading;