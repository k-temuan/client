import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
import thunk from 'redux-thunk'

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BrowseScreen from './screens/BrowseScreen';
import DetailScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import CreateEventForm from './screens/CreateEventForm';
import AtendeeListScreen from './screens/AtendeeListScreen';

import reducers from './store/reducers';

const store = createStore(reducers, applyMiddleware(thunk))
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <ApplicationProvider {...eva} theme={ eva.dark }>
          <Stack.Navigator>
            <Stack.Screen name="Browse" component={ BrowseScreen } />
            <Stack.Screen name="Details" component={ DetailScreen } />
            <Stack.Screen name="Profile" component= { ProfileScreen } />
            <Stack.Screen name="Create" component={ CreateEventForm } />
            <Stack.Screen name="Atendee" component={ AtendeeListScreen } />
          </Stack.Navigator>
        </ApplicationProvider>
      </NavigationContainer>
    </Provider>
  );
}