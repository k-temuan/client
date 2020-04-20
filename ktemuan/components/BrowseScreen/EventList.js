import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList, ScrollView, TouchableHighlight } from 'react-native';
import EventListItem from './EventListItem';
import { Button, Layout, Text } from '@ui-kitten/components';

function EventList({ navigation }) {
  const events = useSelector(state => state.event.events);
  const category = useSelector(state => state.reducer.category);

  const filteredEvents = events.filter(item => {
    if (category === 'All') {
      return item
    } else {
      return item.category === category.toLowerCase()
    }
  })

  return (
    <Layout>
      <FlatList
        data={filteredEvents}
        renderItem={({ item }) => <EventListItem event={item} navigation={navigation} />}
        keyExtractor={item => String(item.id)}
      />
    </Layout>
  )
}

export default EventList;