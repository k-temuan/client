import React from 'react';
import { Layout, Text, Divider, Button } from '@ui-kitten/components';
import { ScrollView, TouchableHighlight, Image } from 'react-native';
import { styles } from '../../styles';
import { useSelector, useDispatch } from 'react-redux';

const placeholder = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';

function DetailItem({ navigation }) {
  const dispatch = useDispatch()
  const event = useSelector(state => state.detail.event);
  
  console.log(event);
  // console.log(event.image_url);

  let atendeeList= <></>
  if (event.Attendees) {
    atendeeList = event.Attendees.map(item => (
      <TouchableHighlight key={ item.id + 'atendee' } style={{ margin: 5 }} onPressOut={() => navigation.navigate('Profile', { userId: item.User.id})}>
        <Layout style={{elevation: 5, borderRadius: 20}}>
          <Avatar 
            size='medium' 
            source={{ uri: `${ item.User.photo_url || `https://api.adorable.io/avatars/125/${item.User.email}.png` }` }}
          />
        </Layout>
      </TouchableHighlight>
    ))
  }

  let tagsList = <></>
  if (event.EventTags) {
    tagsList = event.EventTags.map(item => (
      <Button size='tiny'>
        { item.Tag.name }
      </Button>
    ))
  }

  return (
  <Layout style={{flex: 1, paddingTop: 5, paddingBottom: 0, paddingHorizontal: 5}}>
    <ScrollView>
      <Layout style={[{paddingTop: 5, borderTopWidth: 5, borderRightWidth: 5, borderLeftWidth: 5, borderTopRightRadius: 100, borderTopLeftRadius: 10}, styles.card[event.category]]}>
        <Text category='h2' style={{ paddingLeft: 5 }}>{ event.name }</Text>
      </Layout>
      <Layout style={[{padding: 5, borderLeftWidth: 5}, styles.card[event.category]]}>
        <Text category='h6'>{ event.description }</Text>
        <Text style={{fontWeight: 'bold', fontSize: 11}}>A { event.category } Event</Text>
        <Layout style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          { tagsList }
        </Layout>
        <ScrollView
          horizontal={true}
          style={{minHeight: 100}}
        >
          <Image
            source={{ uri: event.image_url }}
            style={{height: 100, width: 150, marginHorizontal: 1}}
          />
          {/* <Image
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
          /> */}
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
          </Layout>
        </TouchableHighlight>
      </Layout>
    </ScrollView>
  </Layout>
  )
}

export default DetailItem;