import 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'
import React , {useEffect} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import HomeTab from './src/screens/HomeTab';
import SplashScreen from 'react-native-splash-screen';
import Home from './src/screens/Home';
import ViewDetails from './src/screens/ViewDetails';
import { store, persistor } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HomeTab" component={HomeTab} />
        <Stack.Screen name="ViewDetails" component={ViewDetails} 
        options={{headerShown:true,
          title:"Order details",
         headerStyle:{backgroundColor:"#5A56E9"},
         headerTintColor: '#fff',
         headerTitleStyle: {
          fontWeight: 'bold',
        },
         headerTitleAlign:"center"}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default ()=>{
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App></App>
      </PersistGate>
    </Provider>
  )
};




const styles = StyleSheet.create({
  main:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
})
