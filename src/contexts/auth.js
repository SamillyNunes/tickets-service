import { useState, createContext, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from '../services/firebaseConnection';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(()=>{
        async function loadUser(){
            const storedUser = localStorage.getItem('supportpro@user');

            if(storedUser){
                setUser(JSON.parse(storedUser));
            }

            setLoading(false);
        }

        loadUser();
    },[]);

    async function signIn(email, password){
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password)
        .then(async (value)=>{
            let uid = value.user.uid;
            
            const docRef = doc(db, "users", uid);
            await getDoc(docRef)
            .then( (v)=> {
                let data = {
                    uid: uid,
                    name: v.data().name,
                    email: value.user.email,
                    avatarUrl: null,
                };

                setUser(data);
                storeUser(data);
                setLoadingAuth(false);
                toast.success('Seja bem-vindo(a) ao sistema!');
                navigate("/dashboard");
            });
        })
        .catch(error => {
            toast.error('Ops! Um erro aconteceu');
            setLoadingAuth(false);
        });
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
                storeUser(data);
                setLoadingAuth(false);
                toast.success('Seja bem-vindo(a) ao sistema!');
                navigate("/dashboard");
            });
            
        })
        .catch(error => {
            console.log(error);
            setLoadingAuth(false);
        });
    }

    function storeUser(data){
        localStorage.setItem("supportpro@user", JSON.stringify(data));
    }

    async function logout(){
        await signOut(auth);
        localStorage.removeItem('supportpro@user');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user, // esses dois !! indicam um boleaano onde, caso user eh nulo, sera falso, e o contrario verdadeiro
            user,
            signIn,
            signUp,
            logout,
            loadingAuth,
            loading,
        }} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;