import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native'

const ProfileScreen = () => {
    return (

        <ScrollView style={styles.scrollContainer}>
            <StatusBar backgroundColor='#880000' barStyle="light-content" />
            <View style={styles.container}>
                <View style={styles.box}>
                    <Image style={styles.profileImage} source={{ uri: 'https://schooloflanguages.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq.jpg' }} />
                    <Text style={styles.name}>John Doe</Text>
                </View>
                <View style={styles.detail}>
                    <View style={styles.info}>
                        <Text style={{ fontWeight: 'bold' }}>Email</Text>
                        <Text>bash@email.com</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={{ fontWeight: 'bold' }}>Username</Text>
                        <Text>bashir99</Text>
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

