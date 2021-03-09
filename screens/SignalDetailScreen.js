import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import SignalDetail from '../components/SignalDetail'

export default function SignalDetailScreen({ navigation, route }) {
    const { signal } = route?.params;
    return (
        <View>
            <StatusBar backgroundColor='#880000' barStyle="light-content" />
            <SignalDetail navigation={navigation} signal={signal} />
        </View>
    )
}

const styles = StyleSheet.create({})
