import { useState, createContext, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from '../services/firebaseConnection';

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);

    function signIn(email, password){
        console.log(`Email: ${email}, Pass: ${password}`)
        alert('Logado!');
    }

    async function signUp(name, email, password){
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password)
        .then(async (value)=>{
            let uid = value.user.uid;

            await setDoc(doc(db, "users", uid), {
                name: name,
                avatarUrl: null,
            })
            .then( ()=> {
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email,
                    avatarUrl: null,
                };

                setUser(data);
            });
            
            setLoadingAuth(false);
        })
        .catch(error => {
            console.log(error);
            setLoadingAuth(false);
        });
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user, // esses dois !! indicam um boleaano onde, caso user eh nulo, sera falso, e o contrario verdadeiro
            user,
            signIn,
            signUp,
            loadingAuth,
        }} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;