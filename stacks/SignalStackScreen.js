import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

import SignalScreen from '../screens/SignalScreen';
import SignalDetailScreen from '../screens/SignalDetailScreen';

const SignalStack = createStackNavigator();

const SignalStackScreen = ({navigation}) => (
<SignalStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#880000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <SignalStack.Screen name="Signals" component={SignalScreen} options={{
        title:'Signals',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#880000" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
        <SignalStack.Screen name="SignalDetail" component={SignalDetailScreen} options={{
        title:'SignalDetail'
        }} />
</SignalStack.Navigator>
);

export default SignalStackScreen;