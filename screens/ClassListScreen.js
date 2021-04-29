import { NavigationContainer } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import ClassItem from '../components/ClassItem';
import axios from 'axios';
import BASE_URL from '../utils/api';



const ClassListScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/classes`)
            .then(({ data }) => {
                setData(data.results);
                setLoading(false);
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setLoading(false);
            })
    }, [])

    return (
        loading ? (<ActivityIndicator size="large" color="#880000" style={{ position: 'absolute', top: '50%', left: '50%' }} />) :
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor='#880000' />
                <FlatList
                    data={data}
                    renderItem={({ item }) => <ClassItem navigation={navigation} classItem={item} />}
                    keyExtractor={item => item?.id?.toString()}
                />
            </View>
    )
}

export default ClassListScreen
