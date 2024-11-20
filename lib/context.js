import { useState, createContext, useContext, useEffect } from 'react';
import {supabase} from "./supabase.js"

export const UserContext = createContext('ahhhhhh');

export const UserProvider = (props) => {
    const [username, setUsername] = useState('')
    useEffect(() => {
        async function getUserContext()
        {
            const user = await supabase.auth.getUser()
            setUsername(user)
        }
        getUserContext()
    },
    []);

    return (
        <UserContext.Provider value = {username}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)

//getUserContext()
