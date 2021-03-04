import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

import ClassListScreen from '../screens/ClassListScreen';
import TopicListScreen from '../screens/TopicListScreen';
import TopicScreen from '../screens/TopicScreen';

const ClassStack = createStackNavigator();

const ClassStackScreen = ({ navigation }) => (
    <ClassStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#880000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <ClassStack.Screen options={{
            title: 'Classes',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#880000" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} name="ClassListScreen" component={ClassListScreen} />
        <ClassStack.Screen options={{
            title: 'Topics',
        }} name="TopicListScreen" component={TopicListScreen} />
        <ClassStack.Screen options={{
            title: 'Topic',
        }} name="TopicScreen" component={TopicScreen} />
    </ClassStack.Navigator>
);

export default ClassStackScreen;