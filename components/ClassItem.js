import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import BASE_URL from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import PaystackWebView from "react-native-paystack-webview";
import { v4 as uuidv4 } from 'uuid';


export default function ClassItem({ navigation, classItem }) {
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({})

    const { user } = useContext(AuthContext);
    const userObj = JSON.parse(user);



    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/users/${userObj.id}`)
            .then((resp) => {
                const { results } = resp.data;
                setUserData(results)
            })
            .catch((err) => {
                // console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })

    }, [])


    return (
        loading ? (<Text>preparing</Text>) :
            <View>
                <View style={styles.classItem} >
                    <View style={{marginTop: 10}}>
                        <Text>{classItem?.name}</Text>
                    </View>
                    <View style={styles.price}>
                        <Text>{`$${classItem?.price}`}</Text>
                    </View>
                    <View>
                        {
                            userData?.user_profiles?.paid === true ? <Icon.Button name="chevron-forward-outline" color="#000" size={25} backgroundColor="#f8f8f8" onPress={() => navigation.navigate('TopicListScreen', { id: classItem?.id })}></Icon.Button> :
                                <Pay
                                    price={classItem?.price}
                                    email={userObj.email}
                                    classid={classItem?.id}
                                    id={userObj.id}
                                // style={styles.listItemText}
                                />

                        }
                    </View>


                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    classItem: {
        // marginTop: 5,
        // marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        padding: 15
    },
    price: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    listItemText: {
        marginTop: 5,
        marginBottom: 5,
    }
})


function Pay({ price, classid, id, email, navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <PaystackWebView
                buttonText="Pay Now"
                showPayButton={true}
                refNumber={uuidv4()}
                payStackSecretKey="sk_test_f993a8cad32256c4a0a08d8592390d5a1f7d57e0"
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
                    axios.post(`${BASE_URL}/users/${id}/classpayment/${classid}`, {
                        price: price
                    })
                        .then((resp) => {
                            // console.log(resp)
                        })

                    axios.put(`${BASE_URL}/users/${id}`, {
                        paid: true
                    }).then((resp) => {
                        // console.log(resp)
                        navigation.navigate('TopicListScreen', { id: classid })
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