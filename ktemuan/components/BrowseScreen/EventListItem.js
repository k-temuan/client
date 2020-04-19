import React from 'react';
import { Layout, Avatar, Text, Card, Button } from '@ui-kitten/components';
import { styles } from '../../styles';
import { TouchableHighlight } from 'react-native';

const ava_url = 'https://api.adorable.io/avatars/80/lele@goyang.com.png'

function EventListItem({ navigation, event }) {
  return (
    <Card
      key={event.id}
      style={[{ minHeight: 65, margin: 5, borderLeftWidth: 10, borderBottomWidth: 10, borderRadius: 0, elevation: 10 }, styles.card[event.category ]] }
      appearance='filled'
      onPress={() => navigation.push('Details', { id: event.id })}
    >
      <Layout style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Layout style={{flex: 1, flexDirection:'column', justifyContent: 'flex-start', alignItems: 'center'}} >
          <TouchableHighlight
            onPressOut={() => navigation.push('Profile', {
              userId: event.UserId
            })}
          >
            <Avatar 
              style={styles.avatar}
              size='small' 
              source={{ uri: ava_url }}
            />
          </TouchableHighlight>
        </Layout>
        <Layout style={{flex: 8, flexDirection: 'column', paddingLeft: 5}} >
          <Layout style={{flexDirection: 'row', justifyContent: 'space-between'}} >
            <TouchableHighlight
              onPressOut={() => navigation.push('Profile', {
                userId: event.UserId
              })}
            >
              <Text>username</Text>
            </TouchableHighlight>
            <Text>{ event.category }</Text>
            <Text>remaining time</Text>
          </Layout>
          <Layout style={{flexDirection: 'row'}} >
            <Text>{ event.description }</Text>
          </Layout>
          <Layout style={{flexDirection: 'row'}} >
            <Text>{ event.datetime }</Text>
            <Text>{ event.location.name }</Text>
          </Layout>
          <Layout style={{flexDirection: 'row'}} >
            <Button size='tiny'>Join</Button>
          </Layout>
        </Layout>
      </Layout>
    </Card>
  )
}

export default EventListItem;