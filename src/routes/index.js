import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Private from "./Private";

function RoutesApp(){
    return (
        <Routes>
            <Route path="/" element={ <Login/> } />
            <Route path="/register" element={ <SignUp/> } />
            <Route path="/dashboard" element={ <Private> <Dashboard/> </Private> } />
        </Routes>
    );
}

export default RoutesApp;