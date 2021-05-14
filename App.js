import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { Restart } from 'fiction-expo-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';
import BASE_URL from './utils/api';


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
import TermsConditionsScreen from './screens/TermsConditionsScreen';

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


const Drawer = createDrawerNavigator();

export default function App() {
  const [issLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');

  useEffect(() => {
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
        
      }

    }
    getData()

  }, [user, token])

  const getRefreshToken = async () => {
    const refresh = await AsyncStorage.getItem('RefreshToken');
    return refresh
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


  const refreshAuthLogic = failedRequest => {
    getRefreshToken()
      .then((resp) => {
        axios.post(`${BASE_URL}/token`, {
          token: resp
        }).then(({ data }) => {
          const {
            acessToken: accessToken
          } = data

          AsyncStorage.setItem('AccessToken', accessToken);
          failedRequest.response.config.headers['Authorization'] = `Bearer ${accessToken || ''}`;
          Restart();
          return Promise.resolve();
        });
      });


  }

  // Instantiate the interceptor (you can chain it as it returns the axios instance)
  createAuthRefreshInterceptor(
    axios,
    refreshAuthLogic,
    {
      statusCodes: [401, 403]
    }
  );
  return (
    <AuthContext.Provider value={{
      user: user,
      setIsLoggedin: setIsLoggedin,
      issLoggedin: issLoggedin
    }}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {issLoggedin ? (
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
              <Drawer.Screen name="Terms" component={TermsConditionsScreen} />
            </Drawer.Navigator>

          ) : (
            <RootStackScreen />

          )}
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>



  );
}

