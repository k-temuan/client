import React from 'react';
import { Layout, Text, Button, Divider } from '@ui-kitten/components';
import { FlatList, TouchableHighlight, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_EVENTS } from '../store/actions'
import { styles } from '../styles';
import { LOGOUT } from '../store/action/landingAction';

import { createStackNavigator } from '@react-navigation/stack';
import EventList from '../components/BrowseScreen/EventList';
import EmptyItem from '../components/BrowseScreen/EmptyItem';
import ErrorItem from '../components/BrowseScreen/ErrorItem';
import LoadingItem from '../components/BrowseScreen/LoadingItem';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';

const ava_url = 'https://api.adorable.io/avatars/80/lele@goyang.com.png';

function BrowseScreen({ navigation }) {
  const dispatch = useDispatch();

  const userCred = useSelector(state => state.landing.userCred);
  const events = useSelector(state => state.event.events);
  const needLogin = useSelector(state => state.landing.needLogin);
  const categories = useSelector(state => state.browse.categories);
  const category = useSelector(state => state.browse.category);
  const events_status = useSelector(state => state.browse.events_status);

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
  }, [dispatch, needLogin, category])

  function handleChosen(option) {
    setToggleOption(!toggleOption)
    dispatch({
      type: "SET_CATEGORY",
      payload: option
    })
  }

  // console.log(events_status);
  // console.log(userCred);
  
  let eventListContainer = EventList
  if (events_status.loading) eventListContainer = LoadingItem
  else if (events_status.error) eventListContainer = ErrorItem
  else if (events_status.empty || events.length === 0) eventListContainer = EmptyItem
  
  const buttonOptions = categories.map((item, i) => {
    const isDiplayed = category === item;
    const displayButton = isDiplayed ? {display: 'none'} : {display: 'flex'}
    return <Button key={i} size='medium' onPressOut={() => handleChosen(item)} style={[{marginHorizontal: 5}, displayButton]}>{item}</Button>
  })

  const Stack = createStackNavigator();

  return (
    <Layout style={[{flex: 1}]}>
      {/* <Button onPressOut={() => {dispatch(LOGOUT())}}>Logout</Button> */}
      <Divider />
      <Layout style={{paddingVertical: 10}}>
        {
          toggleOption ?
          <ScrollView horizontal={true} style={{ maxHeight: 50 }}>
            <Layout style={{ flexDirection: 'row', paddingVertical: 10}}>{ buttonOptions }</Layout>
          </ScrollView> :
          <TouchableHighlight onPress={() => setToggleOption(!toggleOption)}>
            <Layout style={{flexDirection:'row', justifyContent:'space-between', backgroundColor: '#f8f8f8', paddingVertical: 5, paddingHorizontal: 15}}>
              <Text category='h3'>{ category } Events</Text>
              <Button
                onPressOut={() => navigation.navigate('Create')}
                disabled={ events_status.loading }
                size="small"
              >
                Create Event
              </Button>
            </Layout>
          </TouchableHighlight>
        }
      </Layout>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Content" component={ eventListContainer } />
      </Stack.Navigator>
    </Layout>
  )
}

export default BrowseScreen;