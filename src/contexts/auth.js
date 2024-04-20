import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user, setUser] = useState(null);

    function signIn(email, password){
        console.log(`Email: ${email}, Pass: ${password}`)
        alert('Logado!');
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user, // esses dois !! indicam um boleaano onde, caso user eh nulo, sera falso, e o contrario verdadeiro
            user,
            signIn,
        }} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;