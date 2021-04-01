import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, FlatList, ActivityIndicator } from 'react-native'
import SignalItem from '../components/SignalItem';
import BASE_URL from '../utils/api';
import axios from 'axios';



const SignalScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true)
        axios.get(`${BASE_URL}/signals`)
            .then(({data}) => {
                setData(data.results);
            }).catch((err)=>{
                console.log(err)
            }).finally(()=>{
                setLoading(false);
            })
    }, [])
    return (
        loading ? (<ActivityIndicator size="large" color="#880000" style={{ position: 'absolute', top: '50%', left: '50%' }} />) :
        <View>
            <StatusBar backgroundColor='#880000' barStyle="light-content" />
            {/* <Signals navigation={navigation} /> */}
            <FlatList
                data={data}
                renderItem={({ item }) => (<SignalItem navigation={navigation} signal={item} />)}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

export default SignalScreen

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        color: 'red'
    }
})
