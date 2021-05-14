import axios from 'axios';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import PaystackWebView from "react-native-paystack-webview";
import { v4 as uuidv4 } from 'uuid';
import BASE_URL from '../utils/api';
import { PAYSTACK_KEY } from "@env"

function Subscription({ user, email, subscription, navigation }) {
    return (
        <View>
            <View style={styles.listItem}>
                {/* <View style={{ marginLeft: 5 }}> */}
                <View style={{ marginTop: 10 }}>
                    <Text>{subscription.package}</Text>
                </View>
                <View>
                    <Text style={styles.listItemText, { marginTop: 10 }}>{subscription.duration}</Text>
                </View>
                <View>
                    <Text style={styles.listItemText, { marginTop: 10 }}>${subscription.price}</Text>
                </View>
                <View>
                    <Pay
                        subscription_id={subscription.id}
                        duration={subscription.duration}
                        price={subscription.price}
                        email={email}
                        id={user}
                        navigation={navigation}
                        style={styles.listItemText}
                    />
                </View>
            </View>

        </View >
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


function Pay({ price, subscription_id, duration, email, id, navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <PaystackWebView
                buttonText="Pay Now"
                showPayButton={true}
                refNumber={uuidv4()}
                payStackSecretKey={PAYSTACK_KEY}
                paystackKey="pk_test_d33c91c43eb04d7a87b1a5c8bf29075fd8eb99ca"
                amount={price * 468}
                billingEmail="bashirrn3@gmail.com"
                // billingMobile="08173625431"
                // billingName="Bashir Sani"
                ActivityIndicatorColor="green"
                SafeAreaViewContainer={{ marginTop: 5, marginLeft: 5 }}
                SafeAreaViewContainerModal={{ marginTop: 5 }}
                onCancel={(e) => {
                    // handle response here
                }}
                onSuccess={(res) => {
                    axios.post(`${BASE_URL}/users/${id}/signalpayment`,
                        {
                            price: price,
                            subscription_id: subscription_id,
                            duration: duration
                        })
                        .then((resp) => {
                            // console.log(resp)
                        })
                    axios.put(`${BASE_URL}/users/${id}`, {
                        signal_paid: true
                    })
                        .then((resp) => {
                            navigation.naviagte('Signals')
                            // console.log(resp)
                        })

                }}
                autoStart={false}
            // renderButton={(onPress) => {
            //     <Button onPress={onPress}>
            //         Pay Now
            //     </Button>
            // }}
            />
        </View>
    );
}