import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HomeScreen from './HomeScreen';
import Profile from './ProfileScreen';

const Tab = createMaterialTopTabNavigator();

function TabsScreen() {
  return (
    <Tab.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default TabsScreen;