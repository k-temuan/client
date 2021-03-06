import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Icon, Layout } from '@ui-kitten/components';
import { TouchableHighlight } from 'react-native';

import BrowseScreen from '../screens/BrowseScreen';
import DetailScreen from '../screens/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreateEventForm from '../screens/CreateEventForm';
import AtendeeListScreen from '../screens/AtendeeListScreen';
import UpdateEventForm from '../screens/UpdateEventForm';

const Stack = createStackNavigator()

const StackHeader = ({ navigation }) => {
  return (
    <Layout style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <TouchableHighlight onPressOut={() => navigation.toggleDrawer()}>
        <Text category="h6">Menu</Text>
      </TouchableHighlight>
    </Layout>
  )
}

function BrowsingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Browse" component={ BrowseScreen } />
      <Stack.Screen name="Details" component={ DetailScreen } />
      <Stack.Screen name="Profile" component= { ProfileScreen } />
      <Stack.Screen name="Create" component={ CreateEventForm } />
      <Stack.Screen name="Atendee" component={ AtendeeListScreen } />
      <Stack.Screen name="Update" component={ UpdateEventForm } />
    </Stack.Navigator>
  )
}

export default BrowsingStack;