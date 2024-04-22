import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export default function Private({ children }){
    
    const  { signed } = useContext(AuthContext);

    if(!signed){
        return <Navigate to="/" />;
    }
    
    return children;
}