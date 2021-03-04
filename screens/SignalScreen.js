import React from 'react'
import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native'
import SignalItem from '../components/SignalItem';

const data = [{
    key: 27374,
    type: 'BUY',
    currencyPair: 'EURUSD',
    entry: '1.3457',
    takeProfit1: '1.3489',
    takeProfit2: '1.3523',
    takeProfit3: '1.3555',
    stopLoss: '1.3430'

},
{
    key: 98949,
    type: 'BUY',
    currencyPair: 'EURAUD',
    entry: '1.3457',
    takeProfit1: '1.3489',
    takeProfit2: '1.3523',
    takeProfit3: '1.3555',
    stopLoss: '1.3430'

},
{
    key: 938940,
    type: 'SELL',
    currencyPair: 'EURGPB',
    entry: '1.3457',
    takeProfit1: '1.3489',
    takeProfit2: '1.3523',
    takeProfit3: '1.3555',
    stopLoss: '1.3430'

}]

const SignalScreen = ({navigation}) => {
    return (
        <View>
            <StatusBar backgroundColor='#880000' barStyle="light-content" />
            {/* <Signals navigation={navigation} /> */}
            
            <FlatList
                data={data}
                renderItem={({ item }) => (<SignalItem navigation={navigation} signal={item} />)}
                keyExtractor={item => item.key.toString()}
            />
        </View>
    )
}

export default SignalScreen

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        color: 'red'
    }
})
