import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { FlatList, TouchableHighlight, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_EVENTS } from '../store/actions'
import { styles } from '../styles';
import EventListItem from '../components/EventListItem';

const ava_url = 'https://api.adorable.io/avatars/80/lele@goyang.com.png'

function BrowseScreen({ navigation }) {
  const dispatch = useDispatch();
  const [toggleOption, setToggleOption] = React.useState(false)
  React.useEffect(() => {
    // dispatch(FETCH_EVENTS())
  }, [dispatch])

  function handleChosen(option) {
    setToggleOption(!toggleOption)
    dispatch({
      type: "SET_CATEGORY",
      payload: option
    })
  }

  const events = useSelector(state => state.events);
  const screenLoading = useSelector(state => state.screenLoading);
  const screenError = useSelector(state => state.screenError);
  const categories = useSelector(state => state.categories);
  const category = useSelector(state => state.category);

  let placeholder = <></>
  if (screenLoading) placeholder = <Text category='h2'>Loading...</Text>
  if (screenError) placeholder = <Text category='h2'>Error...</Text>

  const filteredEvents = events.filter(item => {
    if (category === 'All') {
      return item
    } else {
      return item.category === category.toLowerCase()
    }
  })
  const eventList = <FlatList
    data={filteredEvents}
    renderItem={({ item }) => <EventListItem event={item} navigation={navigation} />}
    keyExtractor={item => String(item.id)}
  />
  const buttonOptions = categories.map((item, i) => <Button key={i} size='medium' onPressOut={() => handleChosen(item)}>{item}</Button>)

  return (
    <Layout style={{flex: 1}}>
      {
        toggleOption ? 
        <ScrollView horizontal={true} style={{ maxHeight: 50 }}>
          <Layout style={{ flexDirection: 'row'}}>{ buttonOptions }</Layout>
        </ScrollView> :
        <TouchableHighlight onPress={() => setToggleOption(!toggleOption)}>
          <Layout style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text category='h1'>{category} Events</Text>
            <Button>Create Event</Button>
          </Layout>
        </TouchableHighlight>
      }
      { eventList }
    </Layout>
  )
}

export default BrowseScreen;