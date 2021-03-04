import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default function TopicItem({ classId, navigation, topic }) {
    return (
        <View>
            <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('TopicScreen', {
                classId: classId,
                topicId: topic?.id
            })}>
                <Text>{topic.name}</Text>
                <Text>Stage {topic.stage}</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({

    listItem: {
        // marginTop: 5,
        // marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        padding: 15
    }
})
