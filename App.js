import { StatusBar } from 'expo-status-bar';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";

import LoginScreen from "./screens/LoginScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import Navigation from "./Navigation.js"
import { supabase } from "./lib/supabase.js";
AppRegistry.registerComponent('main',() => App);


export default function App() {

    const [session, setSession] = useState(null);
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
        });

    },

    []);


    if (session == null)
    {
        return <LoginScreen />
    }
    else
    {
        return <Navigation props = {session}/>
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
