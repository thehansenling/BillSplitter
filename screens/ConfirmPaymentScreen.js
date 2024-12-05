import { FlatList, StyleSheet, Text, View, Button, TextInput, Alert, Pressable } from 'react-native';
import React, { Component, useState, useEffect,useRef, createRef, useCallback, useContext, createContext  } from "react";
import {supabase} from "../lib/supabase.js"
import { createClient } from "@supabase/supabase-js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { styles } from "../lib/styles.js"
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useFocusEffect
} from "@react-navigation/native";
import { WebView } from 'react-native-webview';

import BillItem from "../components/BillItem.js"
import TotalItem from "../components/TotalItem.js"

export default class ConfirmPaymentScreen extends React.Component {

    constructor(props)
    {
        super()
        this.state =
        {
            items:props.items ? props.items : []
        }
        this.total = props.route.params.total
        this.bill_username = props.route.params.username
        this.billName = props.route.params.billName
        this.webViewRef = createRef();
        this.amount = 2
        console.log(this.billName)
        this.jsCode = "document.getElementsByClassName('MuiInputBase-input css-mnn31')[0].value= " +this.total +"; document.getElementById('search-input').value = '" + this.bill_username + "'; document.getElementsByClassName('MuiInputBase-input MuiFilledInput-input MuiInputBase-inputMultiline MuiInputBase-inputAdornedEnd css-qm8ja9')[0].value='" + this.billName + "'"
        this.confirmPayment = this.confirmPayment.bind(this)
    }
    //var button = '<div id="paypal-button-container"></div>  <script src="https://www.paypal.com/sdk/js?client-id=' + token + '&enable-funding=venmo&buyer-country=US&currency=USD&components=buttons"></script> <script> paypal.Buttons().render(\'#paypal-button-container\')</script>'
    //var script_url = '<script src="' + "https://www.paypal.com/sdk/js?client-id=" + token + "&enable-funding=venmo" + '&enable-funding=venmo"></script>'


    confirmPayment()
    {
        this.webViewRef.current.injectJavaScript(this.jsCode)
    }
    render()
    {
    return (<View javaScriptEnabledAndroid={true} style = {{flex:1}}>

                <View ref = {this.testRef} style = {{width: '100%', height: "10%"}}>
                   <View style = {styles.leftBox} >
                       <Text style= {styles.itemText}> Total: {this.total}</Text>
                   </View>
               </View>
               <WebView
                   ref={this.webViewRef}
                   javaScriptEnabled = {true}
                   source={{ uri: 'https://account.venmo.com/pay' }}
                  />
               <Button onPress = {this.confirmPayment} title="Fill In"/>

           </View>)
    }
}
