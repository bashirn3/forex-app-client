import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, FlatList, ActivityIndicator } from 'react-native'
import SignalItem from '../components/SignalItem';
import BASE_URL from '../utils/api';
import axios from 'axios';


// const data = [{
//     key: 27374,
//     type: 'BUY',
//     currencyPair: 'EURUSD',
//     entry: '1.3457',
//     takeProfit1: '1.3489',
//     takeProfit2: '1.3523',
//     takeProfit3: '1.3555',
//     stopLoss: '1.3430'

// },
// {
//     key: 98949,
//     type: 'BUY',
//     currencyPair: 'EURAUD',
//     entry: '1.3457',
//     takeProfit1: '1.3489',
//     takeProfit2: '1.3523',
//     takeProfit3: '1.3555',
//     stopLoss: '1.3430'

// },
// {
//     key: 938940,
//     type: 'SELL',
//     currencyPair: 'EURGPB',
//     entry: '1.3457',
//     takeProfit1: '1.3489',
//     takeProfit2: '1.3523',
//     takeProfit3: '1.3555',
//     stopLoss: '1.3430'

// }]

const SignalScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true)
        axios.get(`${BASE_URL}/signals`)
            .then(({data}) => {
                setData(data.results);
            }).catch((err)=>{
                console.log(err)
            }).finally(()=>{
                setLoading(false);
            })
    }, [])
    return (
        loading ? (<ActivityIndicator size="large" color="#880000" style={{ position: 'absolute', top: '50%', left: '50%' }} />) :
        <View>
            <StatusBar backgroundColor='#880000' barStyle="light-content" />
            {/* <Signals navigation={navigation} /> */}
            <FlatList
                data={data}
                renderItem={({ item }) => (<SignalItem navigation={navigation} signal={item} />)}
                keyExtractor={item => item.id.toString()}
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
