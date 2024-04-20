import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";

function RoutesApp(){
    return (
        <Routes>
            <Route path="/" element={ <Login/> } />
            <Route path="/register" element={ <SignUp/> } />
            <Route path="/dashboard" element={ <Dashboard/> } />
        </Routes>
    );
}

export default RoutesApp;