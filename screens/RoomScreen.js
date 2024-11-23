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

import Room from "../components/Room.js"
import Bill from "../components/Bill.js"
import {UserContext, useUser} from "../lib/context.js"



export default function RoomScreen({route, navigation}) {
    const [items, setItems] = useState([])
    const [billName, setBillName] = useState([])
    const user = useUser()
    const [username, setUsername] = useState(user.data.user.email)
    const billRef = useRef()

    function updateItems(newItems){
        setItems(newItems)
    }

    async function getData()
    {
        var bill_data = await supabase
          .from("items")
          .select()
          .eq("id", route.params.bill_id)



        var data = await supabase
          .from("items")
          .select()
          .eq("bill_id", route.params.bill_id)
        setItems(data.data)
        billRef.current.manualUpdate(data.data)
    }

      useFocusEffect(

            useCallback(() => {
                getData()
            }, [])
        )



    useEffect(() => {
        async function getData()
        {
            var data = await supabase
              .from("items")
              .select()
              .eq("bill_id", route.params.bill_id)
            console.log(data)
            setItems(data.data)
        }
        getData()

    },
    []);

    function confirmPayment()
    {
        var userItems = []
        for (i in items)
        {
            if (items[i].username == username)
            {
                userItems.push(items[i])
            }
        }
        navigation.navigate('ConfirmPayment', {total:billRef.current.getTotal(), username: billRef.current.getUsername()});
    }

        return <View>
                    <View style = {{width: '100%', height: '95%'}}>
                       <Bill ref = {billRef} items = {items} updateItemsCallback= {updateItems} username = {username} show={true}/>
                    </View>
                    <Button style = {{ flex: 1, justifyContent: 'flex-end'}}title="Confirm Payment" onPress={confirmPayment}> </Button>
                </View>

}

