import React from 'react';
import { Layout, Text, Button, Divider, Avatar } from '@ui-kitten/components';
import { ScrollView, Image, TouchableHighlight, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FETCH_EVENT_DETAIL } from '../store/actions';
import { styles } from '../styles';

const placeholder = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';

function DetailsScreen({ navigation, route }) {
  const dispatch = useDispatch()
  const event = useSelector(state => state.reducer.event);
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
          <Text category='h2' style={{ paddingLeft: 5 }}>{ event.name }</Text>
        </Layout>
        <Layout style={[{padding: 5, borderLeftWidth: 5}, styles.card[event.category]]}>
          <Text category='h6'>{ event.description }</Text>
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