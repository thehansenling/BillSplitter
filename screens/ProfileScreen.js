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

export default function ProfileScreen({props}){

    useEffect(() => {

    },
    []);

    async function logout() {
        await supabase.auth.signOut();
        await supabase.auth.refreshSession();
    }

  const Stack = createNativeStackNavigator();

  return (
         <View>
            <Button title = "Logout" onPress={logout}> "test"</Button>
        </View>
        )
}

