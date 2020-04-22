import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { styles } from '../../styles';

function AttendeeListError({ navigation }) {
  return (
    <Layout style={[styles.container]}>
      <Text>Error loading attendee list</Text>
    </Layout>
  )
}

export default AttendeeListError;