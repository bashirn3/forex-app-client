import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import BASE_URL from '../utils/api';


const TopicScreen = ({ route }) => {
    const { classId, topicId } = route?.params;
    const [loading, setLoading] = useState(false);
    const [topic, setTopic] = useState({});

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/classes/${classId}/topics/${topicId}`)
            .then(({ data }) => {
                // console.log(data);
                setTopic(data.results)
            })
            .catch((err) => {
                // console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    // let img = `${topic?.topic_images?.[0].image.substr(7)}`;
    return (
        loading ? (<ActivityIndicator size="large" color="#880000" style={{ position: 'absolute', top: '50%', left: '50%' }} />) :
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.parent}>
                <StatusBar backgroundColor='#880000' barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'grey' }}>{topic?.name}</Text>
                </View>

                <View style={styles.imageContainer}>
                    {/* { `${BASE_URL}/${topic?.topic_images?.[0].image}`} */}
                    {/* <Image style={styles.image}
                        source={{
                            // uri: 'https://a.c-dn.net/b/2zdUYu/support-and-resistance-trading_body_Supportandresistanceimage.png.full.png',
                            uri: BASE_URL + '/' + img,
                        }}
                    /> */}
                </View>
                <View style={styles.contentContainer}>
                    <Text style={{ fontSize: 15 }}>
                        {topic?.content}
                    </Text>
                </View>
            </ScrollView>
    )
}

export default TopicScreen;

const styles = StyleSheet.create({
    parent: {
        alignItems: 'center'
    },
    header: {
        marginTop: 10,
        textAlign: 'center',
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
    },
    image: {
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: 'grey',
        width: 300,
        height: 300,
        padding: 10
    },
    contentContainer: {
        marginHorizontal: 10
    }
})
