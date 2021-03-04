import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ProfileStackScreen from './ProfileStackScreen';
import SignalStackScreen from './SignalStackScreen';
import ClassStackScreen from './ClassStackScreen';

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Class"
      activeColor="#fff"
      // shifting
      barStyle={{ backgroundColor: '#880000' }}
    >
      <Tab.Screen
        name="Class"
        component={ClassStackScreen}
        options={{
          tabBarLabel: 'Classes',
          tabBarColor: '#fff',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="graduation-cap" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Signals"
        component={SignalStackScreen}
        options={{
          tabBarLabel: 'Signals',
          tabBarColor: '#fff',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="usd" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#fff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>
);

export default MainTabScreen;

  