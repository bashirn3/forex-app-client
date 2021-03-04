import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native'


export default function SignalItem({ signal, navigation }) {
    return (
        <View>
            <View style={styles.listItem}>
                <View style={{ marginLeft: 5 }}>
                    <Text style={signal.type === 'BUY' ? styles.buy : styles.sell}>{signal.type}</Text>
                    <Text style={styles.listItemText, { fontWeight: 'bold' }}>{signal.currencyPair}</Text>
                    <View style={styles.signalTime}>
                        <Icon name='time' size={10} color='#333333' /><Text style={{ fontSize: 10 }}> 23:25</Text>
                    </View>

                </View>
                <View>
                    <Text style={{ color: 'grey' }}>Active</Text>
                    <Text style={[styles.listItemText, { color: '#ffdb58', fontWeight: 'bold' }]}>waiting</Text>
                </View>
                <Icon.Button name="ios-arrow-forward" color="#333333" backgroundColor="#f8f8f8" onPress={() => {
                    navigation.navigate('SignalDetail', {
                    signal:signal
                })}} />
            </View>
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
