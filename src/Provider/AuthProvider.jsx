import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../Firebase/Firebase.config";


export const AuthContext = createContext();
const auth = getAuth(app);


const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)



    // User create
const createUser = (email,password) =>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
}

// user SignIn
const SignIn = (email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
}

// logOut User
const logOut = ()=>{
    setLoading(true)
    return signOut(auth)
}



useEffect(()=>{
 const unsubscribe=   onAuthStateChanged(auth, currentUser=>{
        setUser(currentUser)
        console.log('currentUser',currentUser);
        setLoading(false)
    })
    return()=>{
        return unsubscribe();
    }
},[])


const authInfo = {
    user,
    loading,
    createUser,
    SignIn,
    logOut
}


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;