import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

function RoutesApp(){
    return (
        <Routes>
            <Route path="/" element={ <Login/> } />
            <Route path="/register" element={ <SignUp/> } />
        </Routes>
    );
}

export default RoutesApp;