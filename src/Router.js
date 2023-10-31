import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {SignIn} from "./Component/SignIn"
import { Signup } from "./Component/SignUp";
import { Home } from "./Component/Home";
import { Form } from "./Component/Form";
import { Card } from "./Component/Card";

export const Router=()=>{
    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<SignIn/>}></Route>
                <Route path="/signup" element={<Signup/>}></Route>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/card" element={<Card/>}></Route>
                <Route path="/form/:id/" element={<Form/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}