import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';


import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';

import RootStackScreen from './stacks/RootStackScreen';
import MainTabScreen from './stacks/MainTabScreen';
import { DrawerContent } from './screens/DrawerContent';
import { set } from 'react-native-reanimated';

const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background: '#ffffff',
    text: '#333333'
  }
}

const CustomDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    background: '#333333',
    text: '#ffffff'
  }
}
let isDarkTheme = false;
const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

// let issLoggedin = false;

const Drawer = createDrawerNavigator();

export default function App() {
  const [issLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
useEffect (()=>{
  const getData = async () => {
    try {
      const acessToken = await AsyncStorage.getItem('AccessToken');
      const userObject = await AsyncStorage.getItem('User');

      if (acessToken !== null) {
        setToken(acessToken);
      }

      if (userObject !== null) {
        setUser(userObject);
        setIsLoggedin(true);
      }
    }
    catch (err) {
      console.log(err);
    }

  }
  getData()

}, [user,token])
  
  // console.log('user', user);
  // console.log('acessToken', token);


  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  return (
    <AuthContext.Provider value={{
      user: user,
      setIsLoggedin: setIsLoggedin
    }}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {issLoggedin ? (
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
              {/* <Drawer.Screen name="SupportScreen" />
            <Drawer.Screen name="SettingsScreen" />
            <Drawer.Screen name="BookmarkScreen" /> */}
            </Drawer.Navigator>

            // <MainTabScreen />
          ) : (
              <RootStackScreen />

            )}
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>



  );
}


