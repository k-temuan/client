import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { TouchableHighlight } from 'react-native';

function AttendeeListItem(attendee) {
  return (
    <TouchableHighlight key={attendee.id} onPressOut={() => navigation.navigate('Profile', { userId: attendee.id })}>
      <Layout style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, elevation: 2, padding: 5}}>
        <Layout>
          <Avatar
            size='medium'
            source={{ uri: `https://api.adorable.io/avatars/125/${attendee.email}.png` }}
          />
        </Layout>
        <Layout style={{paddingLeft: 5}}>
          <Text>{ attendee.email } or Name?</Text>
          <Text>joined or not joined</Text>
          <Button size="tiny">Joined</Button>
        </Layout>
      </Layout>
    </TouchableHighlight>
  )
}

export default AttendeeListItem;