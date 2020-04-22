import React from 'react';
import { Layout, Text, Button, Avatar } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { TouchableHighlight } from 'react-native';
import AttendeeListItem from './AttendeeListItem';
import { styles } from '../../styles';

function AttendeeList({ navigation }) {
  const attendees = useSelector(state => state.attendees.attendees);
  console.log(attendees);
  let attendeeList = <></>
  if (attendees) {
    attendeeList = attendees.map(item => (
      <AttendeeListItem navigation={navigation} attendee={item.User} key={item.User.id} />
    ))
  }

  return (
    <Layout style={[styles.container]}>
      { attendeeList }
    </Layout>
  )
}

export default AttendeeList;