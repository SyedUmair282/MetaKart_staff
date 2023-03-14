import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//import { NavigationContainer } from '@react-navigation/native';
import Orders from './Orders';
import Home from './Home';
import PreviousOrders from './previousOrders';
import DeliverOrders from './deliver';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';


const Tab = createMaterialTopTabNavigator();


const HomeTab = () => {
    const navigate = useNavigation()
    return (
        <>
        <View>
        <View style={Style.head_main}>
        <View>
          <AntDesign
            name="arrowleft"
            style={Style.head_icon}
            onPress={() => navigate.goBack()}
          />
        </View>
        <View style={Style.head_text_view}>
          <Text style={Style.head_text}>All Orders</Text>
        </View>
      </View>
        </View>
        <Tab.Navigator
        screenOptions={{
            tabBarLabelStyle: { fontSize: 13,color:"#fff",fontWeight:"700" },
            tabBarStyle: { backgroundColor: '#5A56E9' },
          }}
        
        >
            {/* <Tab.Screen name="Dashboard" component={Home}  /> */}
            <Tab.Screen name="Current" component={Orders} />
            <Tab.Screen name="Forwarded" component={PreviousOrders} />
            <Tab.Screen name="Previous" component={DeliverOrders} />
        </Tab.Navigator>
        </>
    )
}

export default HomeTab

const Style = StyleSheet.create({
    head_main: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: '3%',
        backgroundColor: '#5A56E9',
      },
      head_icon: {
        fontSize: 20,
        color: 'white',
      },
      head_text_view: {
        width: '95%',
        justifyContent: 'center',
        marginLeft:"5%"
      },
      head_text: {
        fontSize: 19,
        color: 'white',
        fontWeight: 'bold',
      },
})