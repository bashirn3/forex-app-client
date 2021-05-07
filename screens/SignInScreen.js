import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
    Alert,
    DevSettings
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
// import RNRestart from 'react-native-restart';
import { Restart } from 'fiction-expo-restart';

import Users from '../model/users.js';
import BASE_URL from '../utils/api';

const SigninScreen = ({ navigation }) => {
    const { setIsLoggedin } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [error, setError] = useState({});
    const [data, setData] = useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
    });

    const { colors } = useTheme();
    const inputValues = {
        username: data.username,
        password: data.password
    }
    // const { signIn } = React.useContext(AuthContext);
    // const signIn = true;

    const textInputChange = (val) => {
        setData({
            ...data,
            username: val,
            check_textInputChange: true
        });
    }

    const handlePasswordChange = (val) => {

        setData({
            ...data,
            password: val,
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const validateEmpty = () => {
        let errorObj = {}
        if (data.username === '') {
            errorObj.username = 'Username is required'
        }

        if (data.password === '') {
            errorObj.password = 'Password is required'
        }
        return errorObj;
    }

    const loginHandle = () => {

        if (Object.entries(validateEmpty()).length === 0) {
            setLoading(true)
            axios.post(`${BASE_URL}/login`, inputValues)
                .then((resp) => {
                    const { acessToken, refreshToken } = resp.data;
                    axios.defaults.headers.common['Authorization'] = `Bearer ${acessToken}`
                    AsyncStorage.setItem('AccessToken', acessToken)
                    AsyncStorage.setItem('RefreshToken', refreshToken)
                        .then(() => {
                        });
                    // console.log(acessToken)
                    axios.get(`${BASE_URL}/user/current`)
                        .then((resp) => {
                            const { data } = resp;
                            // AsyncStorage.removeItem('User');
                            AsyncStorage.setItem('User', JSON.stringify(data));
                        })

                }).then(() => {

                }).then(() => {
                    setIsLoggedin(true);
                    // window.location.reload();

                    // Immediately reload the React Native Bundle
                    // RNRestart.Restart();
                    // DevSettings.reload();
                    Restart();
                }).catch((err) => {
                    setLoginError(true);
                    // console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
        else {
            setError(validateEmpty());
        }

    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#880000' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Username</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Username"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        value={data.username}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{error.username}</Text>
                </Animatable.View>


                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        value={data.password}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{error.password}</Text>
                </Animatable.View>


                <TouchableOpacity>
                    <Text style={{ color: '#880000', marginTop: 15 }}>Forgot password?</Text>
                </TouchableOpacity>
                {loginError && <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{'Wrong credentials, please try again'}</Text>
                </Animatable.View>}

                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => { loginHandle(data.username, data.password) }}
                    >
                        <LinearGradient
                            colors={['#af0000', '#880000']}
                            style={styles.signIn}
                        >

                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>
                                {''}{loading ? 'loading' : 'Sign In'}</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUpScreen')}
                        style={[styles.signIn, {
                            borderColor: '#880000',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#880000'
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SigninScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#880000'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});