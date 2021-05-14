import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import axios from 'axios';

export default function SignalDetail({ signal }) {
    const [livePair, setLivePair] = useState({});
    useEffect(() => {
        axios.get(`https://www.freeforexapi.com/api/live?pairs=${signal.currency_pair}`)
            .then(({ data }) => {
                setLivePair(data);
            })
    })
    return (
        <View>
            <View style={{ padding: 20, borderBottomColor: 'grey', borderBottomWidth: 1 }}>
                <Text style={styles.currencyPair}>{signal.currency_pair}</Text>
            </View>
            <View style={[styles.entry, { padding: 20, borderBottomColor: 'grey', borderBottomWidth: 1 }]}>
                <Text style={signal.type.includes('BUY') ? styles.buy : styles.sell}>{signal.type}</Text>
                <Text>{signal.entry}</Text>
            </View>
            <View style={[styles.prices, { padding: 20, borderBottomColor: 'grey', borderBottomWidth: 1 }]}>
                <View>
                    <Text style={styles.takeProfit}>Take Profit #1</Text>
                    <Text style={styles.takeProfit}>Take Profit #2</Text>
                    <Text style={styles.takeProfit}>Take Profit #3</Text>
                    <Text style={styles.stopLoss}>Stop Loss</Text>
                </View>
                <View>
                    <Text style={styles.takeProfitPrice}>{signal.take_profit_1}</Text>
                    <Text style={styles.takeProfitPrice}>{signal.take_profit_2 || '-'}</Text>
                    <Text style={styles.takeProfitPrice}>{signal.take_profit_3 || '-'}</Text>
                    <Text style={styles.stopLossPrice}>{signal.stop_loss}</Text>
                </View>
            </View>
            <View>
                <Text style={{ color: 'grey' }}>{livePair?.rates?.[signal.currency_pair].rate === signal?.take_profit_1 ? 'Completed' : 'Active'}</Text>
                {/* <Text style={[styles.listItemText, { color: '#ffdb58', fontWeight: 'bold' }]}>waiting</Text> */}
            </View>
            {/* <Text style={{ color: 'blue ' }} onPress={()=>Linking.openURL("https://www.freeforexapi.com")}>
                <Image alt="Free Forex API" source={{ uri: "https://www.freeforexapi.com/Images/link.png" }} height="20" />
            </Text> */}
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

    currencyPair: {
        fontWeight: 'bold'
    },

    prices: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    takeProfit: {
        color: 'green',
        paddingTop: 5,
        paddingBottom: 5
    },

    stopLoss: {
        color: 'red',
        paddingTop: 5,
        paddingBottom: 5
    },

    takeProfitPrice: {
        paddingTop: 5,
        paddingBottom: 5
    },

    stopLossPrice: {
        paddingTop: 5,
        paddingBottom: 5,
        fontWeight: 'bold',
        color: 'red'
    },

    entry: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    },

    listItemText: {
        marginTop: 5,
        marginBottom: 5,
    },
})
