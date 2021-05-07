import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar, ActivityIndicator, Platform } from 'react-native';
import axios from 'axios';
import BASE_URL from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import Subscription from '../components/Subscription';




export default function SubscriptionScreen({ navigation }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({})
    const [signalPaid, setSignalPaid] = useState(false);
    const { user } = useContext(AuthContext);
    const userObj = JSON.parse(user);


    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/users/${userObj.id}`)
            .then(({ data }) => {
                setUserData(data.results);

            }).then(() => {
                setSignalPaid(userData?.user_profiles?.signal_paid)
            }).catch((err) => {
                // console.log(err);
            })
        axios.get(`${BASE_URL}/subscriptions`)
            .then(({ data }) => {
                setData(data.results);

            })
            .catch((err) => {
                // console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })


    }, [signalPaid])

    if (userData?.user_profiles?.signal_paid === true) { navigation.navigate('Signals') }
    return (
        loading ? (<ActivityIndicator size="large" color="#880000" style={{ position: 'absolute', top: '50%', left: '50%' }} />) :
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor='#880000' barStyle="light-content" />
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Subscription subscription={item} navigation={navigation} user={userObj.id} email={userObj.email} />}
                    keyExtractor={key => key.id.toString()}
                />
                {/* {JSON.stringify(userData?.id)} */}
            </View>

        // <Pay />
    )
}


const styles = StyleSheet.create({})
