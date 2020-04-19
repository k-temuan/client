import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';

const Tab = createMaterialTopTabNavigator()

function LandingNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Register" component={ RegisterScreen } />
      <Tab.Screen name="Login" component={ LoginScreen } />
    </Tab.Navigator>
  )
}

export default LandingNavigator;