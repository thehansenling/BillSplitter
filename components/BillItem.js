import { FlatList, StyleSheet, Text, View, Button, TextInput, ListItem, Pressable, Row, Modal, Keyboard } from 'react-native';
import React, { Component, useState, useEffect, createRef, useContext } from "react";
import {supabase} from "../lib/supabase.js"
import { createClient } from "@supabase/supabase-js";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

export default class BillItem extends React.Component{
    constructor(props) {
        super();
        console.log(props)
        this.temp_name = ""
        this.temp_price = 0
        if (props.inputName == "")
        {
            this.temp_name = "\"Name\""
        } else {
            this.temp_name = props.inputName
        }

        if (props.inputPrice == {})
        {
            this.temp_price = 0
        } else {
            this.temp_price = props.inputPrice
        }
        this.state = {
            isModalVisible: false,
            index:props.index,
            price: this.temp_price,
            name: this.temp_name,
            claimed:false,
            username:props.username
        };
        this.handleModal.bind(this)
        this.priceText.bind(this)
        this.nameText.bind(this)
        this.save.bind(this)

        this.handleModal = this.handleModal.bind(this)
        this.priceText = this.priceText.bind(this)
        this.nameText = this.nameText.bind(this)
        this.save = this.save.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.claimItem = this.claimItem.bind(this)
        this.getUser = this.getUser.bind(this)
        this.pressableRef = createRef()
        this.username = props.username
    }

    handleModal(){
        this.setState({
            isModalVisible: !this.state.isModalVisible,
            price: this.state.price,
            name:this.state.name,
            claimed:this.state.claimed,
            username:this.state.username
        })
    }

    priceText(price){

        this.temp_price = price
    }

    nameText(name){
        this.temp_name = name
    }

    deleteItem() {
        this.props.updateCallback({index: this.props.index, name: this.temp_name, price: this.temp_price, filterOut:true})
    }

    save() {
        this.setState({name: this.temp_name, price:this.temp_price, isModalVisible:false, claimed:this.state.claimed})
        this.props.updateCallback({index: this.props.index, name: this.temp_name, price: this.temp_price, filterOut:false})
    }
    async getUser()
    {

        this.setState({
            isModalVisible: !this.state.isModalVisible,
            price: this.state.price,
            name:this.state.name,
            claimed:this.state.claimed,
            username:user.data.user.email
        })
    }
    claimItem()
    {
        console.log(this.props.index)
            var color = "red"
            if (this.state.claimed)
            {
                color = "white"
            }
            this.setState({
                index:this.props.index,
                isModalVisible: this.state.isModalVisible,
                price: this.state.price,
                name:this.state.name,
                claimed:!this.state.claimed,
                username:this.state.username
            })
            this.pressableRef.current.setNativeProps({
                                         style:{
                                         backgroundColor: color
                                         }
                                     })
            this.props.updateCallback({index: this.props.index, name: this.temp_name, price: this.temp_price, filterOut:false, username:this.state.username})
    }


  render(){
      return (
            <Pressable onPress={this.claimItem} ref = {this.pressableRef} style = {styles.container}>
                    <View style = {styles.leftBox} >
                        <Text style= {styles.itemText}> {this.state.name}</Text>
                    </View>
                    <View style = {styles.leftBox} >
                        <Text style= {styles.itemText}> {this.state.claimed ? this.username : ''}</Text>
                    </View>
                    <View style = {styles.rightBox}>
                        <Text style= {[styles.itemText, {paddingRight:10}]}> {this.state.price} </Text>
                        {this.props.show && <Button title="Edit" onPress={this.handleModal}/>}
                    </View>
                      <Modal visible={this.state.isModalVisible} transparent={true}>

                        <Pressable onPress = {this.handleModal} style = {styles.modalContainer}>
                            <Pressable style = {styles.itemModal}>
                              <View style={{flexDirection: 'row', justifyContent:"flex-end"}}>
                                  <Pressable onPress={this.handleModal} style = {{backgroundColor:"red", width:"20%"}}>
                                    <Text style={[styles.rightBox]}>x</Text>
                                  </Pressable>
                              </View>
                              <Text>Name</Text>
                              <TextInput onChangeText={text => this.nameText(text)} style ={styles.textInput} placeholder = "Name"></TextInput>
                              <Text>Price</Text>
                              <TextInput onChangeText={text => this.priceText(text)} style ={styles.textInput} placeholder="0"></TextInput>
                              <Button title="Save" onPress={this.save} />
                              <Button title="Delete" onPress={this.deleteItem} />
                            </Pressable>
                        </Pressable>
                      </Modal>
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
  itemModal: {
    position: 'fixed',
    height:'80%',
    width:'80%',
    top:'10%',
    left: '10%',
    backgroundColor: 'white',
    zValue:1000
  },
  modalContainer: {
      position:"fixed",
      height:"100%",
      width:"100%",
      backgroundColor:"rgba(0, 0, 0, 0.5)",
  },
  textInput: {
    backgroundColor: "#cccccc",
    borderStyle: "solid",
    borderColor:"black",
    borderWidth:1
  },
  closeButton: {
    width:"30px",
    height:"30px",
    backgroundColor:"red"
  }
});