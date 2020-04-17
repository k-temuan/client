import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

function DetailsScreen({ navigation, route }) {
  const { id } = route.params;
  return (
    <Layout>
      <Text category='h1'>Event Details</Text>
      <Text>id to fetch: { id }</Text>
      <Text category='h2'>Event Title</Text>
      <Text category='h6'>Description</Text>
      <Text category='h6'>Image</Text>
      <Text category='h3'>Actions</Text>
      <Text category='h3'>Join</Text>
      <Text category='h3'>Atendees List</Text>
    </Layout>
  )
}

export default DetailsScreen;