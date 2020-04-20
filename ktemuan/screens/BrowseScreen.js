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
import { NativeViewGestureHandler } from 'react-native-gesture-handler';

const ava_url = 'https://api.adorable.io/avatars/80/lele@goyang.com.png';

function BrowseScreen({ navigation }) {
  const dispatch = useDispatch();

  const userCred = useSelector(state => state.userCred);
  const events = useSelector(state => state.events);
  const needLogin = useSelector(state => state.needLogin);
  const categories = useSelector(state => state.categories);
  const category = useSelector(state => state.category);

  const [toggleOption, setToggleOption] = React.useState(false);

  // const testUserCred = {...userCred};
  // delete testUserCred.access_token;

  React.useEffect(() => {
    dispatch(FETCH_EVENTS({ userCred: userCred }))

    if (needLogin) {
      navigation.navigate('Landing');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Landing' }],
      });
    }
  }, [dispatch, needLogin])

  function handleChosen(option) {
    setToggleOption(!toggleOption)
    dispatch({
      type: "SET_CATEGORY",
      payload: option
    })
  }
  const events_status = useSelector(state => state.events_status);

  console.log(events_status);
  console.log(userCred);
  
  let eventListContainer = EventList
  if (events_status.loading) eventListContainer = LoadingItem
  else if (events_status.error) eventListContainer = ErrorItem
  else if (events_status.empty || events.length === 0) eventListContainer = EmptyItem
  
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
              disabled={ events_status.loading }
            >Create Event</Button>
          </Layout>
        </TouchableHighlight>
      }
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Content" component={ eventListContainer } />
      </Stack.Navigator>
    </Layout>
  )
}

export default BrowseScreen;