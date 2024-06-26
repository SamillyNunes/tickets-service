import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Private from "./Private";
import Profile from "../pages/Profile";
import Customers from "../pages/Customers";
import NewCall from "../pages/NewCall";

function RoutesApp(){
    return (
        <Routes>
            <Route path="/" element={ <Login/> } />
            <Route path="/register" element={ <SignUp/> } />
            <Route path="/dashboard" element={ <Private> <Dashboard/> </Private> } />
            <Route path="/profile" element={ <Private> <Profile/> </Private> } />
            <Route path="/customers" element={ <Private> <Customers/> </Private> } />
            <Route path="/new-call" element={ <Private> <NewCall/> </Private> } />
            <Route path="/new-call/:id" element={ <Private> <NewCall/> </Private> } />
        </Routes>
    );
}

export default RoutesApp;