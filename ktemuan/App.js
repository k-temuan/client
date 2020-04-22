import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createStackNavigator } from '@react-navigation/stack';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { IconRegistry } from '@ui-kitten/components';

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';

import BrowsingStack from './stacks/BrowsingStack';
import LandingNavigator from './stacks/LandingNavigator';
import LoadingSplashScreen from './screens/LoadingSplashScreen';
import DrawerStack from './stacks/DrawerStack';

import store from './store/reducers/index';
// import { rootReducers } from './store/reducers/index';

// const store = createStore(reducers, applyMiddleware(thunk))
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <ApplicationProvider {...eva} theme={ eva.light }>
          <IconRegistry icons={EvaIconsPack} />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoadingSplash" component={ LoadingSplashScreen } />
            <Stack.Screen name="Landing" component={ LandingNavigator } />
            <Stack.Screen name="Browsing" component={ DrawerStack }/>
          </Stack.Navigator>
        </ApplicationProvider>
      </NavigationContainer>
    </Provider>
  );
}
