import { FlatList, StyleSheet, Text, View, Button, TextInput, Alert, Pressable } from 'react-native';
import React, { Component, useState, useEffect, useRef, useContext } from "react";
import {supabase} from "../lib/supabase.js"
import { createClient } from "@supabase/supabase-js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import BillItem from "./BillItem.js"
import TaxItem from "./TaxItem.js"
import TipItem from "./TipItem.js"
import TotalItem from "./TotalItem.js"

export default class Bill extends React.Component {

    constructor(props)
    {
        super()
        this.state =
        {
            billName: "Bill Name",
            items: [],
            total: 0,
            tax: 0,
            tip: 0
        }
        this.username = props.username
        this.addItem = this.addItem.bind(this)
        this.getTotal = this.getTotal.bind(this)
        this.getUsername = this.getUsername.bind(this)
        this.updateItems = this.updateItems.bind(this)
        this.refreshTotal = this.refreshTotal.bind(this)
        this.setBillName = this.setBillName.bind(this)
        this.getBillName = this.getBillName.bind(this)
        if (props.items)
        {
            this.state = {
                items:props.items,
                total: this.state.total,
                tax: this.state.tax,
                tip: this.state.tip
            }
        }
        else
        {
            this.state = {
                items:[{name: "test", price:5, index: 0}],
                total: this.state.total,
                tax: this.state.tax,
                tip: this.state.tip
            }
        }
        this.props = props
        this.username = props.username
        this.props.updateItemsCallback(this.state.items)

    }
    getBillName()
    {
        return this.state.billName
    }


    getTotal()
    {
        return this.state.total
    }
    getUsername()
    {
        return this.username
    }
    manualUpdate(inputItems)
    {
        this.setState({
                      items:inputItems,
                      total: this.state.total,
                      tax: this.state.tax,
                      tip: this.state.tip
                  })

        this.refreshTotal()
    }


    addItem()
    {
        var newArr = [...this.state.items];
        newArr.push({name:"", price:0, index:this.state.items.length})
        this.setState({
            items:newArr,
            total: this.state.total,
            tax: this.state.tax,
            tip: this.state.tip
        })
        this.props.updateItemsCallback(newArr)
    }

    updateItems(values)
    {
        var newArr = [...this.state.items]
        var newTotal = 0
        if (values.index != -1)
        {
            newArr[values.index].name = values.name
            newArr[values.index].price = values.price
            newArr[values.index].filterOut = values.filterOut
            newArr[values.index].username = values.username
            newTotal += this.state.tax + this.state.tip
            this.setState({
                items:newArr
            })
        }
        else
        {
            if (values.name == "Tax") {
                this.setState({
                    items:newArr,
                    total: this.state.total,
                    tax: values.price,
                    tip: this.state.tip
                })
                newTotal += values.price + this.state.tip
            }
            if (values.name == "Tip"){
                this.setState({
                    items:this.state.items,
                    total: this.state.total,
                    tax: this.state.tax,
                    tip: values.price
                })
                newTotal += values.price + this.state.tax
            }
        }

        for (i in newArr)
        {
            if (newArr[i].filterOut) continue
            newTotal += parseFloat(newArr[i].price)
        }
        this.setState({
            total: newTotal
        })
        this.props.updateItemsCallback(newArr);
    }

    refreshTotal()
    {
        this.updateItems({index:-1, name:"Tip", price:this.state.tip, filterOut:false, username:""})
    }

    setBillName(text)
    {
        this.setState({billName:text})
    }




    render(){
    return (
        <View>
            <TextInput placeholder="Bill Name" style = {{height:60, fontSize:30}} onChangeText = {(text)=>this.setBillName(text)}/>
            <FlatList keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
            keyExtractor={(item, index) => item.key}
            style = {{zIndex:10000}} data = {[...this.state.items].concat([{name:"WHAT", price:0, index:-2}])}
                renderItem = {(i) =>
                   {
                    if (i.item.filterOut)
                    {
                        return;
                    }
                    else if (i.item.index == -2)
                    {
                             return <View>
                               <Button title="Add" onPress={this.addItem}/>
                               <TaxItem updateCallback = {this.updateItems} show = {this.props.show}/>
                               <TipItem updateCallback = {this.updateItems} show = {this.props.show}/>
                              <View style = {styles.container}>
                                   <View style = {styles.leftBox} >
                                       <Text style= {styles.itemText}> Total </Text>
                                   </View>
                                   <View style = {styles.rightBox}>
                                       <Text style= {[styles.itemText, {paddingRight:10}]}> {this.state.total} </Text>
                                   </View>
                               </View>
                           </View>
                    }
                    return <BillItem username = {this.username} style = {{zIndex:1000}}inputName={i.item.name} inputPrice={i.item.price} updateCallback={this.updateItems} index = {i.item.index} show={this.props.show}/>}}
                    >

            </FlatList>

        </View>
        )
        }
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


