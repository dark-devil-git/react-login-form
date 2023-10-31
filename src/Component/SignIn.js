import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Signin.scss"

export const SignIn=()=>{
    const [Username,setUsername]=useState("")
    const [Password,setPassword]=useState("")
    const [err,setErr]=useState(false)
    const[invalid,setInvalid]=useState(false)
    // const [logged,setLogged]=setState([])

    const Signin=(e)=>{
        if(e.target.name === "Username"){
            setUsername(e.target.value)
            console.log(e.target.value)
        }
        else{
            setPassword(e.target.value)
            console.log(e.target.value)
        }
    }

    //page navigation
    const pageRender=useNavigate()

    const login=(e)=>{
        e.preventDefault()
        var get=JSON.parse(localStorage.getItem("Users"))
        if(get!==null){
            if(Username ==="" && Password === ""){
                setErr(true)
            }
            else{
                if(Username!=="" && Password!==""){
                    setUsername(e.target.value)
                    setPassword(e.target.Password)
                    var get=JSON.parse(localStorage.getItem("Users"))

                    let Matching=get.filter((val)=>{
                        return val.userId===Username && val.Userpassword===Password ? val:""
                    })

                    if(Matching!=0){
                        pageRender("/home")
                    }
                    else{
                        setInvalid(true)
                    }
                }
            }
        }
        else{
            setInvalid(true)
        }
    }

    const accRegistration=()=>{
        pageRender("/signup")
    }

    return(
        <section className="bg">
            <div className="signin-container">
                <div className="row justify-content-center align-items-center vh-100 overflow">
                    <form className="col-5 row backdrop-filter padding">
                        <div className="signin col-12">
                            <h1>SIGNIN</h1>
                        </div>
                        {invalid ? <p className="error col-12 text-center">Invalid username or password</p>:""}
                        <div className="pos col-12">
                            <input type="text" name="Username" required onInput={Signin} />
                            <span>UserId</span>
                            {err && Username==="" ? <p className="error">UserId Required</p>:""}
                        </div>
                        <div className="pos col-12">
                            <input type="password" name="Password" required onInput={Signin} />
                            <span>Password</span>
                            {err && Password==="" ? <p className="error">Password Required</p>:""}
                        </div>
                        <div className="col-12 text-center">
                            <button type="submit" onClick={login}>Login</button>
                        </div>
                        <div className="col-12 text-center">
                            <button type="submit" onClick={accRegistration}>Create new account</button>
                        </div>
                    </form>
                </div>        
            </div>
        </section>
    )
}