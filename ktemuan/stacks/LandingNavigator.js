import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import { styles } from '../styles';

const Tab = createMaterialTopTabNavigator()

function LandingNavigator() {
  return (
    <Tab.Navigator style={[styles.statusBar]}>
      <Tab.Screen name="Login" component={ LoginScreen } />
      <Tab.Screen name="Register" component={ RegisterScreen } />
    </Tab.Navigator>
  )
}

export default LandingNavigator;