import React from 'react';
import { Text, Layout, Avatar, Button } from '@ui-kitten/components';
import { ScrollView, TouchableHighlight } from 'react-native';
import { FETCH_EVENT_ATENDEES } from '../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import AttendeeList from '../components/AttendeeListScreen/AttendeeList'
import { FETCH_ATTENDEES_LIST } from '../store/action/attendeeAction';

function AtendeeListScreen({ navigation, route }) {
  const { eventId } = route.params;
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    // dispatch(FETCH_EVENT_ATENDEES(eventId));
    dispatch(FETCH_ATTENDEES_LIST(eventId));
  }, [eventId, dispatch])

  const attendees = useSelector(state => state.attendees.attendees);
  // let attendeeList = <></>
  // if (attendees) {
  //   attendeeList = attendees.map(item => (
  //     <TouchableHighlight key={item.id} onPressOut={() => navigation.navigate('Profile', { userId: item.id })}>
  //       <Layout style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, elevation: 2, padding: 5}}>
  //         <Layout>
  //           <Avatar
  //             size='medium'
  //             source={{ uri: `https://api.adorable.io/avatars/125/${item.email}.png` }}
  //           />
  //         </Layout>
  //         <Layout style={{paddingLeft: 5}}>
  //           <Text>{ item.email } or Name?</Text>
  //           <Text>joined or not joined</Text>
  //           <Button size="tiny">Joined</Button>
  //         </Layout>
  //       </Layout>
  //     </TouchableHighlight>
  //   ))
  // }
  let attendeeContent = <></>
  // if content successfully loaded
  attendeeContent = AttendeeList
  // if error etc
  // attendeeContent = AttendeeListError

  const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="attendeeContent" component={attendeeContent} />
    </Stack.Navigator>
  )
  
  // return (
  //   <Layout>
  //     <Text>Atendee list to fetch from event ID: { eventId }</Text>
  //     <Text>2 page swipe: joined, all invited user?</Text>
  //     { attendeeList }
  //   </Layout>
  // )
}

export default AtendeeListScreen;