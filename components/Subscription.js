import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


function Subscription({ subscription }) {
    return (
        <View>
            <TouchableOpacity style={styles.listItem}>
                {/* <View style={{ marginLeft: 5 }}> */}
                <View>
                    <Text style={{ fontWeight: 'bold' }}>{subscription.package}</Text>
                </View>
                <View>
                    <Text style={styles.listItemText, { fontWeight: 'bold' }}>{subscription.duration}</Text>
                </View>
                <View>
                    <Text style={styles.listItemText, { fontWeight: 'bold' }}>${subscription.price}</Text>
                </View>


                {/* </View> */}
            </TouchableOpacity>
        </View>
    )
}

export default Subscription;

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        padding: 15

    },
    listItemText: {
        marginTop: 5,
        marginBottom: 5,
    }
})

