import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React,{useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

const ViewDetails = ({route,navigation}) => {
  const {prop_data} = route.params;
  const [spin,setSpin]=useState(false)
  console.log('data==>', prop_data);
  var d = prop_data.placedOn
  var result=d.substring(0,10)+" "+d.substring(11,19)
  let time=moment.utc(result).local().startOf('seconds').fromNow()
  const sendToAdmin=async(id)=>{
    try{
    setSpin(true)
      let obj={
        itemId:id
      }
      let result = await axios.post(`http://192.168.1.10:5000/order/sendToAdmin`,obj)
      console.log("result==>",result.data)
      setTimeout(()=>{
        setSpin(false)
        navigation.navigate('Home')
      },1000)
    }
    catch(e){
      console.log("error",e);
    }
  }
  return (
    <View style={Style.main}>
      <Spinner
          visible={spin}
        />
      {/* top container */}
      <View style={Style.top_container}>
        <View style={Style.top_container_views}>
          <Text style={Style.top_container_views_text_user}>
            <FontAwesome
              name="user"
              style={Style.top_container_views_text_user}
            />
            &nbsp;{prop_data.FullName}
          </Text>
          <Text style={Style.top_container_views_text_pending}>
            {prop_data.orderStatus}
          </Text>
        </View>
        <View style={Style.top_container_views}>
          <Text style={Style.top_container_views_text}>
            #{prop_data.order_id}
          </Text>
          <Text style={Style.top_container_views_text}>
            {time}
          </Text>
        </View>
        <View style={Style.top_container_views}>
          
          <Text style={Style.top_container_views_payment}>
          <MaterialIcons
            name="payment"
            style={{fontSize:13}}
          />
             &nbsp;Payment</Text>
          <Text style={Style.top_container_views_text}>
            Cash On Delivery
          </Text>
        </View>
      </View>
      {/* 2nd container */}
      <View style={Style.second_container}>
        <View style={Style.second_container_views}>
          <Entypo name="box" style={Style.second_container_views_icons_text} />
          <Text style={Style.second_container_views_icons_text}>
            &nbsp;Product :{' '}
          </Text>
          <Text style={Style.second_container_views_icons_text2}>
            {prop_data.name} of product description.
          </Text>
        </View>
        <View style={Style.second_container_views}>
          <MaterialIcons
            name="attach-money"
            style={Style.second_container_views_icons_text}
          />
          <Text style={Style.second_container_views_icons_text}>
            &nbsp;Price :{' '}
          </Text>
          <Text style={Style.second_container_views_icons_text2}>
            {prop_data.price}.00
          </Text>
        </View>
        <View style={Style.second_container_views}>
          <MaterialIcons
            name="home"
            style={Style.second_container_views_icons_text}
          />
          <Text style={Style.second_container_views_icons_text}>
            &nbsp;Address :{' '}
          </Text>
          <Text style={Style.second_container_views_icons_text2}>
            {prop_data.fullAddress}
          </Text>
        </View>
        <View style={Style.second_container_views}>
          <MaterialIcons
            name="phone"
            style={Style.second_container_views_icons_text}
          />
          <Text style={Style.second_container_views_icons_text}>
            &nbsp;Contact :{' '}
          </Text>
          <Text style={Style.second_container_views_icons_text2}>
            {prop_data.phone ? prop_data.phone : 'Not provided'}
          </Text>
        </View>
        <View style={Style.second_container_views}>
          <MaterialIcons
            name="shopping-cart"
            style={Style.second_container_views_icons_text}
          />
          <Text style={{fontWeight: 'bold', color: 'black', fontSize: 16}}>
            &nbsp;Quantity :{' '}
          </Text>
          <Text style={Style.second_container_views_icons_text2}>
            x{prop_data.quantity}
          </Text>
        </View>
        <View style={Style.second_container_views}>
          <MaterialIcons
            name="notifications"
            style={Style.second_container_views_icons_text}
          />
          <Text style={Style.second_container_views_icons_text}>
            &nbsp;Payment Status :{' '}
          </Text>
          <Text style={Style.second_container_views_icons_text2}>
            {prop_data.status ? 'Paid' : 'UnPaid'}
          </Text>
        </View>
        <View style={Style.second_container_views}>
          <MaterialIcons
            name="local-shipping"
            style={Style.second_container_views_icons_text}
          />
          <Text style={Style.second_container_views_icons_text}>
            &nbsp;Shipping Method :{' '}
          </Text>
          <Text style={Style.second_container_views_icons_text2}>
            Store Pickup
          </Text>
        </View>
        <View style={Style.second_container_views}>
          <MaterialIcons
            name="inventory"
            style={Style.second_container_views_icons_text}
          />
          <Text style={Style.second_container_views_icons_text}>
            &nbsp;Stock :{' '}
          </Text>
          <Text style={Style.second_container_views_icons_text2_stock}>
            {prop_data.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>
      </View>

      <View style={Style.total_view}>
        <MaterialIcons
          name="attach-money"
          style={Style.second_container_views_icons_text}
        />
        <View
          style={Style.total_view_2}>
          <Text style={Style.second_container_views_icons_text}>
            &nbsp;Total Price :{' '}
          </Text>
          <Text style={Style.second_container_views_icons_text2}>
            Rs. {prop_data.totalPrice}.00
          </Text>
        </View>
      </View>

      <View style={Style.send_btn_view}>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>sendToAdmin(prop_data.item_id)} style={Style.send_btn}>
          <Text style={Style.send_btn_text}>Send to admin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Style = StyleSheet.create({
  main: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
  send_btn_view: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: '8.5%',
  },
  send_btn: {
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A56E9',
    borderColor: '#5A56E9',
  },
  send_btn_text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  second_container: {
    margin: '2%',
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  second_container_views: {
    flexDirection: 'row',
    margin: '2%',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  second_container_views_icons_text: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  second_container_views_icons_text2: {
    color: 'black',
  },
  second_container_views_icons_text2_stock: {
    backgroundColor: '#3ab030',
    padding: 5,
    borderRadius: 15,
    color: '#fff',
    letterSpacing: 2,
    width: '35%',
    textAlign: 'center',
  },
  top_container: {
    margin: '2%',
    borderRadius: 5,
    backgroundColor: '#6e6d6d',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  top_container_views: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '2%',
  },
  top_container_views_text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  top_container_views_payment: {
    color: '#fff',
    fontWeight: 'bold',
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    fontSize:16
  },
  top_container_views_text_user: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  top_container_views_text_pending: {
    fontSize: 12,
    backgroundColor: '#f0682e',
    padding: 5,
    borderRadius: 15,
    color: '#fff',
    letterSpacing: 2,
    width: '25%',
    textAlign: 'center',
  },
  total_view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    borderTopWidth: 1,
    alignSelf: 'center',
    padding: '1%',
    marginTop: 5,
    borderTopColor: '#adadac',
  },
  total_view_2:{
    width: '95%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
  }
});

export default ViewDetails;
