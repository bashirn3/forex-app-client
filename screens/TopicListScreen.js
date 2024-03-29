import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import TopicItem from '../components/TopicItem';
import BASE_URL from '../utils/api';


const TopicListScreen = ({ navigation, route }) => {
    const { id } = route?.params;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        setLoading(true);
        axios.get(`${BASE_URL}/classes/${id}/topics`)
            .then(({ data }) => {

                setData(data.results)
            }).finally(() => {
                setLoading(false);
            })
    }

    return (
        loading ? (<ActivityIndicator size="large" color="#880000" style={{ position: 'absolute', top: '50%', left: '50%' }} />) :
            <View style={{ flex: 1 }}>
                {
                    data.length === 0 ? (<Text style={{ textAlign: 'center', fontSize: 20, marginTop: 30 }}> Sorry, No Class Found... Try Again.</Text>) : (
                        <>
                            <StatusBar backgroundColor='#880000' barStyle="light-content" />
                            <FlatList
                                data={data}
                                renderItem={({ item }) => <TopicItem topic={item} classId={id} navigation={navigation} />}
                                keyExtractor={key => key.id.toString()}
                                onRefresh={getData}
                                refreshing={loading}
                            />
                        </>
                    )
                }
            </View>
    )
}

export default TopicListScreen
