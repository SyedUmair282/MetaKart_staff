import { View, Text, StyleSheet, TextInput, TouchableOpacity, BackHandler, TouchableWithoutFeedback, Alert, Keyboard, ActivityIndicator, } from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { login } from '../redux/apiCalls'
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import { useDispatch, useSelector } from 'react-redux'


import { loginFailure } from '../redux/LoginRedux';

const Login = ({ navigation, setChange }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [css, setCss] = useState("75%");

    const dispatch = useDispatch()
    const { isFetching, error, currentUser } = useSelector((state) => state.user)
    console.log("login", currentUser)

    const handlePress = () => {
        // console.log(email,password)
        if (email && password) {
            login(dispatch, { email, password, setChange })
            //setChange(false)
        }
        else {
            Alert.alert(
                "Login failed",
                "Please fill all fields",
                [
                    {
                        text: "Ok",
                        onPress: () => console.log("Ok"),
                    }
                ]
            );
        }

    }
    if (error === true) {
        Alert.alert(
            "Login failed",
            "Something went wrong",
            [
                {
                    text: "Ok",
                    onPress: () => dispatch(loginFailure(false)),
                }
            ]
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={Style.main}>
                <View style={Style.dot1}></View>
                <View style={Style.dot2}></View>
                <View style={Style.e_container}>
                    <View style={Style.e_container2}>
                        <Text style={Style.e_container2_text1}>MetaKart</Text>
                        <Text style={Style.e_container2_text2}>Staff App</Text>
                    </View>
                </View>
                <View style={Style.dot3}></View>


                <View style={{ width: '100%', height: `${css}`, backgroundColor: "white", borderTopRightRadius: 15, borderTopLeftRadius: 15, justifyContent: "center" }} >
                    <View style={Style.log_container2}>
                        <Text style={Style.log_container2_text}>Sign in</Text>
                        <View style={Style.email_view}>
                            <Text style={Style.email_view_text}><MaterialCommunityIcons name='email-outline' />  Email</Text>
                            <TextInput value={email} selectionColor="black" style={Style.email_view_textinput} onChangeText={setEmail} />
                        </View>
                        <View style={Style.email_view}>
                            <Text style={Style.email_view_text}><MaterialCommunityIcons name='lock-outline' />  Password</Text>
                            <TextInput value={password} selectionColor="black" style={Style.email_view_textinput} secureTextEntry={true} onChangeText={setPassword} />
                        </View>

                        <TouchableOpacity disabled={isFetching === true ? true : false} activeOpacity={0.1} style={Style.login_btn} onPress={handlePress} >
                            {isFetching === true ?
                                <ActivityIndicator size='large' color="white" /> :
                                <Text style={Style.login_btn_text}>Login</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </TouchableWithoutFeedback>

    );
};
const Style = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
        backgroundColor: '#5A56E9'
    },
    dot1: {
        backgroundColor: '#f5ae62',
        opacity: 0.7,
        width: 80,
        height: 80,
        borderRadius: 40,
        position: "absolute",
        top: "-5%",
        right: "8%"
    },
    dot2: {
        borderWidth: 4,
        borderColor: 'rgba(158, 150, 150, .3)',
        width: 18,
        height: 18,
        borderRadius: 1000,
        position: "absolute",
        top: "2%",
        left: "25%"
    },
    e_container: {
        width: '100%',
        height: '25%',
        justifyContent: "center"
    },
    e_container2: {
        width: "70%",
        alignSelf: "center"
    },
    e_container2_text1: {
        color: "white", fontWeight: "bold", fontSize: 45, letterSpacing: 1
    },
    e_container2_text2: {
        color: "white", fontWeight: "bold", fontSize: 28, lineHeight: 35, letterSpacing: 2
    },
    dot3: {
        borderWidth: 4, borderColor: 'rgba(158, 150, 150, .3)', width: 25, height: 25, borderRadius: 1000, position: "absolute", top: "18%", right: "15%"
    },
    log_container: {
        width: '100%', height: '100%', backgroundColor: "white", borderTopRightRadius: 15, borderTopLeftRadius: 15, justifyContent: "center"
    },
    log_container2: {
        width: "80%", height: "85%", alignSelf: "center", justifyContent: "center"
    },
    log_container2_text: {
        color: "black", fontWeight: "700", fontSize: 30, marginTop: -10
    },
    email_view: {
        marginVertical: 25
    },
    email_view_text: {
        color: "gray", fontSize: 15
    },
    email_view_textinput: {
        height: 30, padding: 5, borderBottomWidth: 1, color: "black"
    },
    forgot_btn: {
        width: "40%", marginVertical: 10
    },
    forgot_btn_text: {
        color: "#5A56E9", fontWeight: "bold"
    },
    login_btn: {
        width: "80%", height: 50, backgroundColor: "#5A56E9", borderRadius: 10, justifyContent: "center", alignItems: "center", alignSelf: "center", marginVertical: "8%",
        flexDirection: "row"
    },
    login_btn_text: {
        color: "white", fontWeight: "bold", fontSize: 17
    },
    create_account_btn: {
        width: "55%", justifyContent: "center", alignItems: "center", alignSelf: "center", marginVertical: 3
    },
    create_account_btn_text: {
        color: "#5A56E9", fontWeight: "bold"
    },
    auth_view: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 5, width: "25%", alignSelf: "center"
    },
    auth_icon: {
        fontSize: 30, color: "#5A56E9"
    }
});

export default Login;

