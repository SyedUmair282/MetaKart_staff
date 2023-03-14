import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image,ToastAndroid } from 'react-native'
import React,{useEffect,useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import loaderGif from '../assets/images/loader2.gif'
import { useSelector,useDispatch } from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {Logout} from '../redux/LoginRedux'
import Login from './Login'


const Home = () => {
  const navigate = useNavigation()
  const [trigger,setTrigger] = useState(true)
  const [data,setData] = useState([])
  const [isLoading,setIsloading] = useState(true)
  const [change,setChange] = useState(false)
  const dispatch=useDispatch();

  const {isFetching,error,currentUser}=useSelector((state)=>state.user)

  

  const getData = async()=>{
    if(currentUser){

      setIsloading(true)
      const payload = {
      sectionId:currentUser[0].sectionId
    }
    axios.post(`http://192.168.1.10:5000/dashboard/dashboardData`, payload)
      .then((response) => setData(response.data))
      .then(check => setIsloading(false))
      .catch((error) => {
        //console.error(error)
        if(error=="AxiosError: Network Error"){
          ToastAndroid.showWithGravityAndOffset(  
            "No network connectivity",  
            ToastAndroid.LONG,  
            ToastAndroid.BOTTOM,
            25,
            50 
          ); 
        }
        else{
          ToastAndroid.showWithGravityAndOffset(  
            "Something went wrong",  
            ToastAndroid.LONG,  
            ToastAndroid.BOTTOM,
            25,
            50 
            ); 
        }
      })
    }
    else{
      setChange(true)
    }
    } 
  const logout_user=()=>{
    //navigate.navigate('Login')
    dispatch(Logout())
  }
  
  useEffect(() => {
    getData()
  }, [trigger,change])
  
  return (
    <>
      {currentUser?<View style={{ backgroundColor: "white",flex:1}}>
      <View style={styles.pageHeader}>
        <FontAwesome name='user' size={18} color="white"/>
        <Text style={styles.pageHeaderText}> Hello, {currentUser[0].staffName}</Text>
        <MaterialCommunityIcons name="logout" size={21} color="white" style={styles.pageHeaderIcon} onPress={logout_user} />
      </View>
      <View>
        <View style={styles.dashboardHeader}>
          <Text style={styles.dashboardHeading}>Dashboard</Text>
          <TouchableOpacity style={styles.navigateButton} onPress={()=>setTrigger(!trigger)}>
            <Ionicons name="ios-refresh" size={16} color="white" style={{paddingRight:'0.5%'}} />
            <Text style={styles.navigateButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dasboardValues}>
          <View style={styles.orderCountBox}>
            {
              isLoading ? (
                <Image source={loaderGif} style={styles.loader} />
                ):(
                  <Text style={styles.orderCount}>{data[0][0].orderCount}</Text>
                  )
                }
            <Text style={styles.orderText}>Number of Current Orders</Text>
            <Feather name="shopping-bag" size={100} color="#009FC6" style={styles.iconOrder} />
          </View>

          <View style={styles.StatsBoxesFlex}>
            <View style={styles.statsbox}>
              <View style={[styles.statsbox2, { backgroundColor: '#00A65A' }]}>
                {
                  isLoading ? (
                    <Image source={loaderGif} style={styles.loader} />
                    ):(
                      <Text style={styles.statsboxCount}>{data[1][0].total_Items_In_Section}</Text>
                  )
                }
                <Text style={styles.statsboxText}>Total Items in Section</Text>
                <Feather name="box" size={60} color="#03894C" style={styles.iconOrder} />
              </View>

              <View style={[styles.statsbox2, { backgroundColor: '#F39C11' }]}>
                {
                  isLoading ? (
                    <Image source={loaderGif} style={styles.loader} />
                  ) : (
                    <Text style={styles.statsboxCount}>{data[2][0].low_stock_items}</Text>
                  )
                }
                <Text style={styles.statsboxText}>Number of Low Stock Products</Text>
                <MaterialCommunityIcons name="elevation-decline" size={60} color="#C68011" style={styles.iconOrder} />
              </View>
            </View>

            <View style={styles.statsbox}>
              <View style={[styles.statsbox2, { backgroundColor: '#DD4C39' }]}>
                {
                  isLoading ? (
                    <Image source={loaderGif} style={styles.loader} />
                  ) : (
                    <Text style={styles.statsboxCount}>{data[3][0].products_handed_over}</Text>
                    )
                  }
                <Text style={styles.statsboxText}>Number of Products Handed Over</Text>
                <MaterialCommunityIcons name="hand-extended-outline" size={60} color="#B73D2E" style={styles.iconOrder} />
              </View>

              <View style={[styles.statsbox2, { backgroundColor: '#E8877B' }]}>
              {
                isLoading ? (
                  <Image source={loaderGif} style={styles.loader} />
                  ) : (
                    <Text style={styles.statsboxCount}>{data[4][0].customer_count}</Text>
                    )
                  }
                <Text style={styles.statsboxText}>Number of Customers</Text>
                <Octicons name="person" size={50} color="#D36659" style={styles.iconOrder} />
              </View>
            </View>

          </View>
        </View>

        
      </View>
      <View style={styles.finalCheckout}>
      <TouchableOpacity style={styles.checkoutBtn} onPress={()=>navigate.navigate("HomeTab")}>
          <Text style={styles.checkoutBtnText}>Show Orders</Text>
        </TouchableOpacity>
      </View>
    </View>:<Login setChange={setChange}/>}
      
    </>
    )
  }

export default Home

const styles = StyleSheet.create({
  pageHeader: {
    backgroundColor: "#5a56e9",
    width: "100%",
    padding: "3%",
    alignItems: 'center',
    flexDirection: 'row',
  },
  pageHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  pageHeaderIcon: {
    position: 'absolute',
    right: '5%'
  },
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    alignItems: 'center',
    paddingVertical: '3%',
    width: '95%',
    alignSelf: 'center'
  },
  dashboardHeading: {
    fontSize: 25,
    color: "#444",
    fontWeight: '800'
  },
  navigateButtonText: {
    fontSize: 13,
    color: 'white',
    fontWeight: '600'
  },
  navigateButton: {
    backgroundColor: '#5a56e9',
    padding: "1.5%",
    borderRadius: 5,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  //============================================================
  dasboardValues: {
    padding: '3.5%'
  },
  orderCountBox: {
    backgroundColor: '#00C0EF',
    padding: '3%',
    marginVertical: '2%',
    height: '30%',
    borderRadius: 5,
    marginHorizontal: '1.3%'
  },
  orderCount: {
    fontSize: 35,
    fontWeight: '800',
    color: 'whitesmoke',
  },
  orderText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#eee'
  },

  statsbox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statsbox2: {
    margin: '1.3%',
    borderRadius: 5,
    flex: 1,
    paddingVertical: '8%',
    paddingHorizontal: '5%'
  },
  statsboxText: {
    fontWeight: '600',
    color: '#eee',
    fontSize: 14
  },
  statsboxCount: {
    fontSize: 25,
    paddingBottom: '1.5%',
    color: 'white',
    fontWeight: '700',
  },
  iconOrder: {
    position: 'absolute',
    right: '4%',
    bottom: '1%',
    zIndex: -999,
  },
  finalCheckout: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '0%',
    justifyContent: 'center',
    zIndex: 999,
    width: "100%"
  },
  checkoutBtn: {
    backgroundColor: '#5D59EE',
    padding: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#333'
  },
  checkoutBtnText: {
    fontSize: 22,
    color: 'white',
    fontWeight: '600'
  },
  //==================================================================================
  loader:{
    width:40,
    height:40,
  }
})