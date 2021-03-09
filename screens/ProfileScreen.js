import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import BASE_URL from '../utils/api';
import axios from 'axios';

const ProfileScreen = () => {
    const [userData, setUserData] = useState({});
    const { user } = useContext(AuthContext);
    const userObject = JSON.parse(user);

    useEffect(() => {
     axios.get(`${BASE_URL}/users/${userObject.id}`)
     .then(({data})=>{
         setUserData(data.results);
         
     }).catch((err)=>{
         console.log(err)
     })
    }, [])

    return (

        <ScrollView style={styles.scrollContainer}>
            <StatusBar backgroundColor='#880000' barStyle="light-content" />
            <View style={styles.container}>
                <View style={styles.box}>
                    <Image style={styles.profileImage} source={{ uri: 'https://schooloflanguages.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq.jpg' }} />
                    <Text style={styles.name}>{`${userData?.user_profiles?.first_name} ${userData?.user_profiles?.last_name}`}</Text>
                </View>
                <View style={styles.detail}>
                    <View style={styles.info}>
                        <Text style={{ fontWeight: 'bold' }}>Email</Text>
                        <Text>{userObject.email}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={{ fontWeight: 'bold' }}>Username</Text>
                        <Text>{userObject.username}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.signIn, {
                        borderColor: '#880000',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#880000'
                    }]}>Edit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    container: {
        padding: 20,
    },
    box: {
        marginTop: 10,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowOffset: {
            height: 1,
            width: -2
        },
        elevation: 2,
        paddingTop: 10
    },
    profileImage: {
        width: 300,
        height: 300,
        borderRadius: 300 / 2,
        marginBottom: 20,
    },
    name: {
        fontSize: 35,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#333333',
    },
    detail: {
        flexDirection: 'column',
        marginTop: 20,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        padding: 15

    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        color: '#333333',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

