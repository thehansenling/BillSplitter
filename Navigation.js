import { FlatList, StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { useState, useEffect, createContext } from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen.js";
import CameraScreen from "./screens/CameraScreen.js";
import BillScreen from "./screens/BillScreen.js";
import RoomsScreen from "./screens/RoomsScreen.js"
import RoomScreen from "./screens/RoomScreen.js"
import {UserProvider} from "./lib/context.js"


export default function Navigation({props}) {

    const Tab = createBottomTabNavigator();

    useEffect(() => {
    },
    []);
  return (
    <UserProvider value="AHGHADFDS">
        <NavigationContainer >
            <Tab.Navigator screenOptions={{
                                          headerShown: false
                                        }}>
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Rooms" component={RoomsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})
