import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    ActivityIndicator,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import axios from 'axios';
import BASE_URL from '../utils/api';



const SignupScreen = ({ navigation }) => {
    const [error, setError] = useState({})
    const { colors } = useTheme();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        confirm_password: '',
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isValidPassword: true
    });

    const inputValues = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        username: data.username,
        password: data.password,
        // role: 'student'
    }
    const firstNameChange = (val) => {
        setData({
            ...data,
            firstname: val,
        });
    }


    const lastNameChange = (val) => {
        setData({
            ...data,
            lastname: val,
        });

    }

    const emailChange = (val) => {
        setData({
            ...data,
            email: val,
        });

    }

    const usernameChange = (val) => {
        setData({
            ...data,
            username: val,
        });

    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const validateEmpty = () => {
        let errorObj = {}
        if (data.firstname === '') {
            errorObj.firstname = 'First name is required'
        }
        if (data.lastname === '') {
            errorObj.lastname = 'Second name is required'
        }
        if (data.username === '') {
            errorObj.username = 'Username is required'
        }
        if (data.email === '') {
            errorObj.email = 'Email is required'
        }
        if (data.password === '') {
            errorObj.password = 'Password is required'
        }
        return errorObj;
    }



    const signUpHandler = () => {
        if (Object.entries(validateEmpty()).length === 0) {
            if (data.password !== data.confirm_password) {
                setData({
                    ...data,
                    isValidPassword: false
                })
            } else {
                setLoading(true)
                axios.post(`${BASE_URL}/register`, inputValues)
                    .then((resp) => {
                        // alert(resp);
                        setData({
                            ...data,
                            firstname: '',
                            lastname: '',
                            email: '',
                            username: '',
                            password: '',
                            confirm_password: ''

                        })

                        // navigation.navigate('SignInScreen')
                        Alert.alert(
                            "Success",
                            "You have successfully signed up, you can log in now",
                            [
                              { text: "OK", onPress: () =>  navigation.navigate('SignInScreen') }
                            ]
                          );
                    })
                    .catch((err) => {
                        // console.log(err);
                    }).finally(() => {
                        setLoading(false);
                    })

                // console.log(inputValues);
            }

            // console.log('passed');

        }
        else {
            setError(validateEmpty);
        }

    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#880000' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <ScrollView showsVerticalScrollIndicator={true}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>First Name</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            placeholder="Your First Name"
                            style={[styles.textInput, {
                            color: colors.text
                        }]}
                            autoCapitalize="words"
                            name="firstname"
                            value={data.firstname}
                            onChangeText={(val) => firstNameChange(val)}
                        />
                        {/* {data.check_textInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null} */}
                    </View>
                    <View>
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>{error.firstname}</Text>
                        </Animatable.View>
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 35,
                        color: colors.text
                    }]}>Last Name</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Last Name"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            value={data.lastname}
                            autoCapitalize="words"
                            onChangeText={(val) => lastNameChange(val)}
                        />

                    </View>
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>{error.lastname}</Text>
                    </Animatable.View>
                    <Text style={[styles.text_footer, {
                        marginTop: 35,
                        color: colors.text
                    }]}> Email</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="envelope-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Email"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            value={data.email}
                            autoCapitalize="none"
                            onChangeText={(val) => emailChange(val)}
                        />
                    </View>
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>{error.email}</Text>
                    </Animatable.View>

                    <Text style={[styles.text_footer, {
                        marginTop: 35,
                        color: colors.text
                    }]}>Username</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-circle-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Username"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            value = {data.username}
                            autoCapitalize="none"
                            onChangeText={(val) => usernameChange(val)}
                        />
                    </View>
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>{error.username}</Text>
                    </Animatable.View>
                    <Text style={[styles.text_footer, {
                        marginTop: 35,
                        color: colors.text
                    }]}>Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            value={data.password}
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
                    <Text style={[styles.text_footer, {
                        marginTop: 35,
                        color: colors.text
                    }]}>Confirm Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            placeholder="Confirm Your Password"
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={styles.textInput}
                            value={data.confirm_password}
                            autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
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
                    {data.isValidPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Your passwords must match, try again.</Text>
                        </Animatable.View>
                    }
                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            By signing up you agree to our
                </Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Terms of service</Text>
                        <Text style={styles.color_textPrivate}>{" "}and</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Privacy policy</Text>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={signUpHandler}

                        >
                            <LinearGradient
                                colors={['#af0000', '#880000']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>
                                    {''}{loading ? 'loading' : 'Sign Up'}</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: '#880000',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#880000'
                            }]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignupScreen;

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
        flex: Platform.OS === 'ios' ? 3 : 5,
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
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
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
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },

    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
});