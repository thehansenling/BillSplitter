import { FlatList, StyleSheet, Text, View, Button, TextInput, Alert, Pressable } from 'react-native';
import React, { useId, Component, useState, useEffect, useRef  } from "react";
import {supabase} from "../lib/supabase.js"
import { createClient } from "@supabase/supabase-js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import 'react-native-get-random-values';
import {UserContext, useUser} from "../lib/context.js"
import { v4 as uuid } from "uuid";
import { styles } from "../lib/styles.js"
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

import Bill from "../components/Bill.js"

export default function BillScreen({navigation}){
    const user = useUser()
    const [username, setUsername] = useState(user.data.user.email)
    const [items, setItems] = useState([])
    const [billName, setBillName] = useState([])
    const billRef = useRef()
    function updateItems(newItems){
        setItems(newItems)
    }

    async function publish(){
        const bill_id = uuid()
        try
        {
            const err = await supabase
              .from('bills')
              .insert({ id:bill_id,
                        name: billRef.current.getBillName(),
                        username:username,
                        payment_id: "test_payment_ids"
                        })
            for (i in items) {
                try {
                    const err = await supabase
                      .from('items')
                      .insert({ id:bill_id,
                                name: items[i].name,
                                bill_id:bill_id,
                                price: items[i].price
                                })
                }
                catch (err){
                    console.log(err)
                    console.log("Error uploading bill items")
                    //break
                }
            }
        }
        catch (err)
        {
            console.log("Error uploading bill itself")
        }


        navigation.navigate('Rooms');
    }

    return <View >
                <View style = {{width: '100%', height: '95%'}}>
                    <Bill updateItemsCallback= {updateItems} show={true} ref = {billRef}/>
                </View>
                <Button style = {{ flex: 1, justifyContent: 'flex-end'}}title="publish" onPress={publish}> </Button>
           </View>

}