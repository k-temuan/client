import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { FlatList, TouchableHighlight, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_EVENTS } from '../store/actions'
import { styles } from '../styles';
// import EventListItem from '../components/BrowseScreen/EventListItem';

import { createStackNavigator } from '@react-navigation/stack';
import EventList from '../components/BrowseScreen/EventList';
import EmptyItem from '../components/BrowseScreen/EmptyItem';
import ErrorItem from '../components/BrowseScreen/ErrorItem';
import LoadingItem from '../components/BrowseScreen/LoadingItem';

const ava_url = 'https://api.adorable.io/avatars/80/lele@goyang.com.png'

function BrowseScreen({ navigation }) {
  const dispatch = useDispatch();
  const [toggleOption, setToggleOption] = React.useState(false)
  const userCred = useSelector(state => state.userCred);
  React.useEffect(() => {
    // dispatch(FETCH_EVENTS({ userCred }))
  }, [dispatch])

  function handleChosen(option) {
    setToggleOption(!toggleOption)
    dispatch({
      type: "SET_CATEGORY",
      payload: option
    })
  }

  // const events = useSelector(state => state.events);
  // const screenLoading = useSelector(state => state.screenLoading);
  // const screenError = useSelector(state => state.screenError);
  const categories = useSelector(state => state.categories);
  const category = useSelector(state => state.category);
  const events_status = useSelector(state => state.events_status);

  // if (screenLoading) placeholder = <Text category='h2'>Loading...</Text>
  // if (screenError) placeholder = <Text category='h2'>Error...</Text>
  
  let eventListContainer = EventList
  if (events_status.loading) eventListContainer = LoadingItem
  if (events_status.error) eventListContainer = ErrorItem
  if (events_status.empty) eventListContainer = EmptyItem
  

  // const filteredEvents = events.filter(item => {
  //   if (category === 'All') {
  //     return item
  //   } else {
  //     return item.category === category.toLowerCase()
  //   }
  // })

  // const eventList = <FlatList
  //   data={filteredEvents}
  //   renderItem={({ item }) => <EventListItem event={item} navigation={navigation} />}
  //   keyExtractor={item => String(item.id)}
  // />

  const buttonOptions = categories.map((item, i) => <Button key={i} size='medium' onPressOut={() => handleChosen(item)}>{item}</Button>)

  const Stack = createStackNavigator();

  return (
    <Layout style={{flex: 1}}>
      {
        toggleOption ? 
        <ScrollView horizontal={true} style={{ maxHeight: 50 }}>
          <Layout style={{ flexDirection: 'row'}}>{ buttonOptions }</Layout>
        </ScrollView> :
        <TouchableHighlight onPress={() => setToggleOption(!toggleOption)}>
          <Layout style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text category='h2'>{ category } Events</Text>
            <Button
              onPressOut={() => navigation.navigate('Create')}
              disabled={ !events_status.error && !events_status.loading }
            >Create Event</Button>
          </Layout>
        </TouchableHighlight>
      }
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Content" component={ eventListContainer } />
      </Stack.Navigator>
      {/* { eventList } */}
    </Layout>
  )
}

export default BrowseScreen;