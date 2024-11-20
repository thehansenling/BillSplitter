import { FlatList, StyleSheet, Text, View, Button, TextInput, Alert, Pressable } from 'react-native';
import { useState, useEffect } from "react";
import {supabase} from "../lib/supabase.js"
import { createClient } from "@supabase/supabase-js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import BillItem from "./../components/BillItem.js";

import CameraScreen from "./CameraScreen.js";
import BillScreen from "./BillScreen.js";
import RoomsScreen from "./RoomsScreen.js"
import RoomScreen from "./RoomScreen.js"
import { userContext } from '../lib/context.js';

export default function HomeScreen({props}){

    useEffect(() => {

    },
    []);

  const Stack = createNativeStackNavigator();

  return (
          <Stack.Navigator>
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Bill" component={BillScreen} />
            <Stack.Screen name="Room" component={RoomScreen} />
          </Stack.Navigator>
        )
}

