import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function ClassItem({ navigation, classItem }) {
    return (
        <View>
            <TouchableOpacity style={styles.classItem} onPress={() => navigation.navigate('TopicListScreen', {id: classItem?.id})}>
                <Text>{classItem?.name}</Text>
                <View style={styles.price}>
                    <Text>{`$${classItem?.price}`}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    classItem: {
        // marginTop: 5,
        // marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        padding: 15
    },
    price: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})
