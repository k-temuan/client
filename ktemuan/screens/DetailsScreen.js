import React from 'react';
import { Layout, Text, Button, Divider, Avatar } from '@ui-kitten/components';
import { ScrollView, Image, TouchableHighlight, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FETCH_EVENT_DETAIL } from '../store/actions';
import { styles } from '../styles';

const placeholder = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';

function DetailsScreen({ navigation, route }) {
  const dispatch = useDispatch()
  const event = useSelector(state => state.event);
  const { id } = route.params;

  dispatch(FETCH_EVENT_DETAIL(id))

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

  return (
    <Layout style={{flex: 1, paddingTop: 5, paddingBottom: 0, paddingHorizontal: 5}}>
      <ScrollView>
        <Text>id to fetch: { id }</Text>
        <Layout style={[{paddingTop: 5, borderTopWidth: 5, borderRightWidth: 5, borderLeftWidth: 5, borderTopRightRadius: 100, borderTopLeftRadius: 10}, styles.card[event.category]]}>
          <Text category='h2' style={{ paddingLeft: 5 }}>Event TitleEvent TitleEvent TitleEvent TitleEvent TitleEvent Title</Text>
        </Layout>
        <Layout style={[{padding: 5, borderLeftWidth: 5}, styles.card[event.category]]}>
          <Text category='h6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          <ScrollView
            horizontal={true}
            style={{minHeight: 100}}
          >
            <Image
              source={{uri: placeholder}}
              style={{height: 100, width: 150, marginHorizontal: 1}}
            />
            <Image
              source={{uri: placeholder}}
              style={{height: 100, width: 150, marginHorizontal: 1}}
            />
            <Image
              source={{uri: placeholder}}
              style={{height: 100, width: 150, marginHorizontal: 1}}
            />
            <Image
              source={{uri: placeholder}}
              style={{height: 100, width: 150, marginHorizontal: 1}}
            />
          </ScrollView>
          <Text category='h3'>Actions</Text>
          <Layout>
            <Button>Join</Button>
            <Divider/>
            <Button>unJoin ?</Button>
          </Layout>
          <TouchableHighlight onPressOut={() => navigation.navigate('Atendee', { eventId: event.id })}>
            <Layout style={{flexDirection: 'row', flexWrap: 'wrap', maxHeight: 100}}>
              <Text category='h3'>Atendees List ></Text>
              { atendeeList }
              { atendeeList }
            </Layout>
          </TouchableHighlight>
        </Layout>
      </ScrollView>
    </Layout>
  )
}

export default DetailsScreen;