import React from 'react';
import { Layout, Text, Button, Divider, Avatar } from '@ui-kitten/components';
import { ScrollView, Image, TouchableHighlight, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FETCH_EVENT_DETAIL } from '../store/action/detailAction';
import { styles } from '../styles';
import { createStackNavigator } from '@react-navigation/stack';
import DetailItem from '../components/DetailScreen/DetailItem';
import DetailLoading from '../components/DetailScreen/DetailLoading';
import DetailError from '../components/DetailScreen/DetailError';

const placeholder = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';

function DetailsScreen({ navigation, route }) {
  const dispatch = useDispatch()
  const event = useSelector(state => state.detail.event);
  const detail_status = useSelector(state => state.detail.detail_status);
  const { id } = route.params;

  React.useEffect(() => {
    dispatch(FETCH_EVENT_DETAIL(id))
  }, [dispatch, id])

  let atendeeList= <></>
  if (event.users) {
    atendeeList = event.users.map(item => (
      <TouchableHighlight key={ item.id + 'atendee' } style={{ margin: 5 }} onPressOut={() => navigation.navigate('Profile', { userId: item.id})}>
        <Layout style={{elevation: 5, borderRadius: 20}}>
          <Avatar 
            size='medium' 
            source={{ uri: `https://api.adorable.io/avatars/125/${item.email}.png` }}
          />
        </Layout>
      </TouchableHighlight>
    ))
  }
  const Stack = createStackNavigator()
  let DetailContent = <></>

  if (detail_status.fetchLoading) DetailContent = DetailLoading
  else if (detail_status.errorDetail) DetailContent = DetailError
  else DetailContent = DetailItem

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DetailContent" component={ DetailContent } />
    </Stack.Navigator>
  )
}

export default DetailsScreen;