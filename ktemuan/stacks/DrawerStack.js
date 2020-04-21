import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BrowsingStack from './BrowsingStack';
import UserProfileScreen from '../screens/UserProfileScreen';

function DrawerStack() {
  const Drawer = createDrawerNavigator()

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Browsing" component={BrowsingStack} />
      <Drawer.Screen name="My Profile" component={UserProfileScreen} />
    </Drawer.Navigator>
  )
}

export default DrawerStack;