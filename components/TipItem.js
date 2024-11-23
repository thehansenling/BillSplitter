import { FlatList, StyleSheet, Text, View, Button, TextInput, ListItem, Pressable, Row, Modal } from 'react-native';
import { useState, useEffect, useRef } from "react";
import {supabase} from "../lib/supabase.js"
import { createClient } from "@supabase/supabase-js";
import { styles } from "../lib/styles.js"
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

export default function TipItem({show, inputTip, updateCallback}){

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tip, setTip] = useState(0);

    var temp_tip = 0

    function handleModal(){
        setIsModalVisible(!isModalVisible)
    }

    function tipText(tip){
        temp_tip = parseFloat(tip)
    }


    function save() {
        setTip(temp_tip)
        setIsModalVisible(!isModalVisible)
        updateCallback({index: -1, name: "Tip", price: temp_tip, filterOut:false})
    }

  return (

        <View style = {styles.container}>
                <View style = {styles.leftBox} >
                    <Text style= {styles.itemText}> Tip </Text>
                </View>
                <View style = {styles.rightBox}>
                    <Text style= {[styles.itemText, {paddingRight:10}]}> {inputTip ? inputTip :tip} </Text>
                    {show && <Button title="Edit" onPress={handleModal}/>}
                </View>
                  <Modal visible={isModalVisible} transparent={true}>

                    <Pressable onPress = {handleModal} style = {styles.modalContainer}>
                        <Pressable style = {styles.itemModal}>
                          <View style={{flexDirection: 'row', justifyContent:"flex-end"}}>
                              <Pressable onPress={handleModal} style = {{backgroundColor:"red", width:"20%"}}>
                                <Text style={[styles.rightBox]}>x</Text>
                              </Pressable>
                          </View>
                          <Text>Tip</Text>
                          <TextInput onChangeText={text => tipText(text)} style ={styles.textInput} placeholder="0"></TextInput>
                          <Button title="Save" onPress={save} />
                        </Pressable>
                    </Pressable>
                  </Modal>
        </View>
        )
};