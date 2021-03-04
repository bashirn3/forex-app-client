import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function SignalDetail({ route, navigation }) {
    // const { id } = route.params.signal;
    // console.log(id);
    return (
        <View>
            <View style={{ padding: 20, borderBottomColor: 'grey', borderBottomWidth: 1 }}>
                <Text style={styles.currencyPair}>EURGBP</Text>
            </View>
            <View style={[styles.entry, { padding: 20, borderBottomColor: 'grey', borderBottomWidth: 1 }]}>
                <Text style={styles.sell}>SELL</Text>
                <Text>1.0678</Text>
            </View>
            <View style={[styles.prices, { padding: 20, borderBottomColor: 'grey', borderBottomWidth: 1  }]}>
                <View>
                    <Text style={styles.takeProfit}>Take Profit #1</Text>
                    <Text style={styles.takeProfit}>Take Profit #2</Text>
                    <Text style={styles.takeProfit}>Take Profit #3</Text>
                    <Text style={styles.stopLoss}>Stop Loss</Text>
                </View>
                <View>
                    <Text style={styles.takeProfitPrice}>1.235</Text>
                    <Text style={styles.takeProfitPrice}>1.256</Text>
                    <Text style={styles.takeProfitPrice}>1.678</Text>
                    <Text style={styles.stopLossPrice}>1.678</Text>
                </View>
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
        
    }
})
