import React from 'react';
import { Text, Layout, Avatar, Button } from '@ui-kitten/components';
import { ScrollView, TouchableHighlight } from 'react-native';
import { FETCH_EVENT_ATENDEES } from '../store/actions';
import { useSelector, useDispatch } from 'react-redux';

function AtendeeListScreen({ navigation, route }) {
  const { eventId } = route.params;
  const dispatch = useDispatch();
  dispatch(FETCH_EVENT_ATENDEES());
  const atendees = useSelector(state => state.atendees);
  let atendeeList = <></>
  if (atendees) {
    atendeeList = atendees.map(item => (
      <TouchableHighlight key={item.id} onPressOut={() => navigation.navigate('Profile', { userId: item.id })}>
        <Layout style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, elevation: 2, padding: 5}}>
          <Layout>
            <Avatar
              size='medium'
              source={{ uri: `https://api.adorable.io/avatars/125/${item.email}.png` }}
            />
          </Layout>
          <Layout style={{paddingLeft: 5}}>
            <Text>{ item.email } or Name?</Text>
            <Text>joined or not joined</Text>
            <Button size="tiny">Joined</Button>
          </Layout>
        </Layout>
      </TouchableHighlight>
    ))
  }
  return (
    <Layout>
      <Text>Atendee list to fetch from event ID: { eventId }</Text>
      <Text>2 page swipe: joined, all invited user?</Text>
      { atendeeList }
    </Layout>
  )
}

export default AtendeeListScreen;