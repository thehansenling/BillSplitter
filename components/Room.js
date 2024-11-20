import { FlatList, StyleSheet, Text, View, Button, TextInput, ListItem, Pressable, Row, Modal } from 'react-native';
import  React, { useState, useEffect, useRef, Component } from "react";
import {supabase} from "../lib/supabase.js"
import { createClient } from "@supabase/supabase-js";
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
        this.onRoomPress = this.onRoomPress.bind(this)
        this.navigation = props.navigation
        this.state = {isFocused:true}
    }

    onRoomPress()
    {
        console.log("ROOM DATA")
        console.log(this.name)
        this.navigation.push("Room",{bill_id:this.name})
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