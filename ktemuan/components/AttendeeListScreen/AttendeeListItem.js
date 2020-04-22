import React from 'react';
import { Layout, Text, Button, Avatar } from '@ui-kitten/components';
import { TouchableHighlight } from 'react-native';
import { styles } from '../../styles';

function AttendeeListItem({ attendee, navigation }) {
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
          <Text>{ attendee.firstname } { attendee.lastname }</Text>
          <Text>{ attendee.email }</Text>
          <Button size="tiny">Joined</Button>
        </Layout>
      </Layout>
    </TouchableHighlight>
  )
}

export default AttendeeListItem;