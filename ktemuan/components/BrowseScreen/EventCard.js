import React from 'react';
import { TouchableHighlight, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { Layout, Text, Avatar, Button } from '@ui-kitten/components';
import { styles } from '../../styles';
import { apiURL } from '../../store/action/index';
import moment from 'moment';

function EventCard({ navigation, event }) {
  const userCred = useSelector(state => state.landing.userCred);
  const event_datetime = moment(event.date_time).format('MMMM D YYYY, h:mm a')
  const isOwner = userCred.id === event.User.id
  const displayOwner = isOwner ? {display: 'flex'} : {display: 'none'};
  const hasJoin = event.Attendees.filter(item => item.User.id === userCred.id).length > 0
  const diplayJoinStatus = hasJoin ? {display: 'flex'} : {display: 'none'};
  // console.log(event.Attendees)
  return (
    <TouchableHighlight onPressOut={() => { navigation.navigate("Details", {id: event.id})}}>
      <Layout style={[styles.shadow, styles.bg[event.category], {margin: 15, alignItems: 'center', borderRadius: 5}]}>
        <ImageBackground 
          source={{ uri: apiURL + "/" + event.image_url }}
          style={[styles.fullScreenBox, {justifyContent: 'flex-end', marginBottom: 0}]}
        >
          <Layout style={[styles.cardInfoBox, styles.cardInfo[event.category], {}]}>
            <Layout style={{flexDirection: 'row', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10}}>
              <Layout style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}}>
                <Avatar
                  size="small"
                  source={{
                    uri: `https://api.adorable.io/avatars/125/${event.User.email}.png`,
                  }}
                />
                <Text style={{fontSize: 18}}>{ event.User.firstname } { event.User.lastname }</Text>
              </Layout>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>{ event.category.toUpperCase() }</Text>
            </Layout>
            <Text category="h1" style={{fontWeight: 'bold'}}>{ event.name }</Text>
            <Text style={{fontWeight: 'bold', fontStyle: 'italic', fontSize: 16}}>{ JSON.parse(event.location).description }</Text>
            <Text style={{fontStyle: 'italic'}}>{ event_datetime }</Text>
            <Layout style={{backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 10}}>
              <Text style={[{backgroundColor: '#00b8a9', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5}, displayOwner]}>Your Event</Text>
              <Text style={[diplayJoinStatus, {backgroundColor: '#00b8a9', padding: 5, borderRadius: 5}]}>Joined</Text>
              <Button size="tiny">
                <Text>Join Event</Text>
              </Button>
            </Layout>
          </Layout>
        </ImageBackground>
      </Layout>
    </TouchableHighlight>
  )
}

export default EventCard;