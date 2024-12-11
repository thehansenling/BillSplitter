import { FlatList, StyleSheet, Text, View, Button, TextInput, ListItem, Pressable, Row, Modal } from 'react-native';
import  React, { useState, useEffect, useRef, Component } from "react";
import {supabase} from "../lib/supabase.js"
import { createClient } from "@supabase/supabase-js";
import { styles } from "../lib/styles.js"
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";


export default class Room extends React.Component{
    constructor(props)
    {
        super()
        console.log(props)
        this.name = props.name

        this.bill_id = props.bill_id
        this.onRoomPress = this.onRoomPress.bind(this)
        this.navigation = props.navigation
        this.state = {isFocused:true}
    }

    onRoomPress()
    {
        this.navigation.push("Room",{bill_id:this.bill_id})
    }

    render()
    {
    return (
               <Pressable onPress = {this.onRoomPress} style = {{backgroundColor:"gray", flex:1, height:40, borderStyle:"solid", borderWidth:2}}>

                    <View>
                        <Text style = {{paddingLeft:10, paddingTop:10 }}>{this.name}</Text>
                    </View>
                </Pressable>
             )
    }
};
