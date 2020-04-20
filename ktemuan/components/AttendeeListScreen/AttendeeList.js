import React from 'react';
import { Layout, Text, Button, Avatar } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { TouchableHighlight } from 'react-native';
import AttendeeListItem from './AttendeeListItem';

function AttendeeList({ navigation }) {
  const attendees = useSelector(state => state.attendees.attendees);
  let attendeeList = <></>
  if (attendees) {
    attendeeList = attendees.map(item => (
      <AttendeeListItem attendee={item} />
    ))
  }

  return (
    <Layout>
      <Text>2 page swipe: joined, all invited user?</Text>
      { attendeeList }
    </Layout>
  )
}

export default AttendeeList;