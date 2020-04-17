import React, {useEffect} from 'react';
import { Layout, Text, Card, Avatar } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_EVENTS } from '../store/actions'
import { styles } from '../styles';

const ava_url = 'https://api.adorable.io/avatars/80/lele@goyang.com.png'

function BrowseScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FETCH_EVENTS())
  }, [dispatch])

  const events = useSelector(state => state.events);
  const screenLoading = useSelector(state => state.screenLoading);
  const screenError = useSelector(state => state.screenError);
  const status = useSelector(state => state.status);

  let placeholder = <></>
  if (screenLoading) placeholder = <Text category='h2'>Loading...</Text>
  if (screenError) placeholder = <Text category='h2'>Error...</Text>
  const eventList = events.map(event => {
    return (
      <Card key={event.id} style={styles.card} status='primary'>
        <Layout style={{flexDirection:'column', justifyContent: 'flex-start'}} >
          <Avatar style={styles.avatar} size='tiny' source={{ uri: ava_url }} />
        </Layout>
        <Layout style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{ event.category }</Text>
        </Layout>
        <Layout style={{flexDirection: 'row'}}>
          <Text>{ event.description }</Text>
        </Layout>
        <Layout style={{flexDirection: 'row'}}>
          <Text>{ event.datetime }</Text>
          <Text>{ event.location.name }</Text>
        </Layout>
      </Card>
    )
  })
  return (
    <Layout>
      <Text category='h1'>{ placeholder }</Text>
      { eventList }
    </Layout>
  )
}

export default BrowseScreen;