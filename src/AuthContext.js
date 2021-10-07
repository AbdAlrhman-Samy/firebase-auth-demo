import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const auth = getAuth()

    const [user, setUser] = useState(null)

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            if(user){
                setUser(user)
                console.log('a user is logged in');
            } else {
                setUser(null)
                console.log('no user is logged in');
            }
        })

        return ()=> unsub

    },[])

    return(
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}