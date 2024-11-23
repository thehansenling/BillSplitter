import { FlatList, StyleSheet, Text, View, Button, TextInput, ListItem, Pressable, Row, Modal } from 'react-native';
import  React, { useState, useEffect, useRef, Component } from "react";
import {supabase} from "../lib/supabase.js"
import { createClient } from "@supabase/supabase-js";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";



export default class Total extends React.Component{
    constructor(props)
    {
        super()
    }

    render()
    {
    return (

               <View style = {styles.container}>
                    <View style = {styles.leftBox} >
                        <Text style= {styles.itemText}> Total </Text>
                    </View>
                    <View style = {styles.rightBox}>
                        <Text style= {[styles.itemText, {paddingRight:10}]}> {this.state.total} </Text>
                    </View>
                </View>
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