import { FlatList, StyleSheet, Text, View, Button, TextInput, Alert, Pressable } from 'react-native';
import React, { useId, Component, useState, useEffect, useRef  } from "react";
import {supabase} from "../lib/supabase.js"
import { createClient } from "@supabase/supabase-js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import 'react-native-get-random-values';
import { v4 as uuid } from "uuid";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

import Bill from "../components/Bill.js"

export default function BillScreen({navigation}){
    const [items, setItems] = useState([])
    function updateItems(newItems){
        setItems(newItems)
    }

    async function publish(){
        const bill_id = uuid()
        for (i in items) {
            try {
                const err = await supabase
                  .from('items')
                  .insert({ id:uuid(),
                            name: items[i].name,
                            bill_id:bill_id,
                            price: items[i].price
                            })
            }
            catch (err){
                console.log("Error uploading bill items")
                //break
            }
        }
        navigation.navigate('Rooms');
    }

    return <View >
                <View style = {{width: '100%', height: '95%'}}>
                    <Bill updateItemsCallback= {updateItems} show={true}/>
                </View>
                <Button style = {{ flex: 1, justifyContent: 'flex-end'}}title="publish" onPress={publish}> </Button>
           </View>

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

  },
    itemText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  leftBox: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
 })


