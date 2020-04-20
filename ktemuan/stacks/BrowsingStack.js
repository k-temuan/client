import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BrowseScreen from '../screens/BrowseScreen';
import DetailScreen from '../screens/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreateEventForm from '../screens/CreateEventForm';
import AtendeeListScreen from '../screens/AtendeeListScreen';

const Stack = createStackNavigator()

function BrowsingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Browse" component={ BrowseScreen } />
      <Stack.Screen name="Details" component={ DetailScreen } />
      <Stack.Screen name="Profile" component= { ProfileScreen } />
      <Stack.Screen name="Create" component={ CreateEventForm } />
      <Stack.Screen name="Atendee" component={ AtendeeListScreen } />
    </Stack.Navigator>
  )
}

export default BrowsingStack;