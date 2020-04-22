import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { styles } from '../../styles';

function AttendeeListEmpty({ navigation }) {
  return (
    <Layout style={[styles.container], {padding: 10}}>
      <Text>No one joining this event yet.</Text>
    </Layout>
  )
}

export default AttendeeListEmpty;