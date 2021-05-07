import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'


export default function SignalItem({ signal, navigation }) {
    const date = new Date(signal.updated_at);
    const date2 =("0" + date.getDate()).slice(-2) + "/" + ("0"+(date.getMonth()+1)).slice(-2) + "/" +
    date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)
    return (
        <View>
            <TouchableOpacity style={styles.listItem}  onPress={() => {
                    navigation.navigate('SignalDetail', {
                    signal: signal})}} >
                <View style={{ marginLeft: 5 }}>
                    <Text style={signal.type.includes('BUY')? styles.buy : styles.sell}>{signal.type}</Text>
                    <Text style={styles.listItemText, { fontWeight: 'bold' }}>{signal.currency_pair}</Text>
                    <View style={styles.signalTime}>
                        <Icon name='time' size={10} color='#333333' /><Text style={{ fontSize: 10 }}> {date2 }</Text>
                    </View>

                </View>
                {/* <View>
                    <Text style={{ color: 'grey' }}>Active</Text>
                    <Text style={[styles.listItemText, { color: '#ffdb58', fontWeight: 'bold' }]}>waiting</Text>
                </View> */}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buy: {
        color: 'green',
        fontWeight: 'bold'
    },
    sell: {
        color: 'red',
        fontWeight: 'bold'
    },
    listItem: {
        // marginTop: 5,
        // marginBottom: 5,
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
    },
    signalTime: {
        flexDirection: 'row'
    }
})
