import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/ProfileScreen';

const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({navigation}) => (
<ProfileStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#880000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{
        title:'Profile',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#880000" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</ProfileStack.Navigator>
);

export default ProfileStackScreen;