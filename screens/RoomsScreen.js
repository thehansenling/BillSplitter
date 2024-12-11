import { FlatList, StyleSheet, Text, View, Button, TextInput, Alert, Pressable } from 'react-native';
import React, { Component, useState, useEffect, useRef, useContext  } from "react";
import {supabase} from "../lib/supabase.js"
import { createClient } from "@supabase/supabase-js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { styles } from "../lib/styles.js"
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

import Room from "../components/Room.js"
import RoomScreen from "./RoomScreen.js"
import ConfirmPaymentScreen from "./ConfirmPaymentScreen.js"

function Rooms({navigation}){
    const [rooms, setRooms] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        async function getbills()
        {

//            var data = await supabase
//              .rpc('get_distinct_bills')
//
            var data = await supabase
              .from("bills")
              .select()
            console.log(data)
            var data_rooms = []
            for (i in data.data)
            {
                data_rooms.push(data.data[i])
            }
            console.log("SDLGKNSDKLOGN")
            console.log(data_rooms)
            setRooms(data_rooms)
            setIsLoaded(true)
        }
        getbills()
    },
    []);

    return <View style = {{flex:1}}>
                <FlatList data = {rooms}
                    renderItem = {(i) =>
                       {
                            console.log("ROOM STUFF")
                            console.log(i)
                            return <Room name={i.item.name} bill_id={i.item.id} navigation={navigation}/>
                       }
                }/>
           </View>

}

export default function RoomsScreen({props}){

    useEffect(() => {

    },
    []);

  const Stack = createNativeStackNavigator();

  return (
          <Stack.Navigator >
            <Stack.Screen name="Rooms" component={Rooms} />
            <Stack.Screen name="Room" component={RoomScreen} />
            <Stack.Screen name ="ConfirmPayment" component={ConfirmPaymentScreen} />
          </Stack.Navigator>
        )
}