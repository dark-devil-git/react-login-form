import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import "../Style/Signup.scss"

export const Signup=()=>{
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[id,setId]=useState("")
    const[password,setPassword]=useState("")
    const[confpass,setConfPass]=useState("")
    const[dob,setDob]=useState("")
    const[array,setArray]=useState([])
    const[err,setErr]=useState(false)
    const[passerr,setPassErr]=useState(false)
    const[existed,setExist]=useState(false)

    
    const Register=(e)=>{
        if(e.target.name==="Registername"){
            setName(e.target.value)
        }
        else if(e.target.name === "Registeremail"){
            setEmail(e.target.value)
        }
        else if(e.target.name === "Registid"){
            setId(e.target.value)
        }
        else if(e.target.name === "Registpass"){
            setPassword(e.target.value)
        }
        else if(e.target.name === "Registconfpass"){
            setConfPass(e.target.value)
        }
        else{
            setDob(e.target.value)
        }
    }

    //page navigation
    const pageRender=useNavigate()

    const Submit=(e)=>{ 
        e.preventDefault()

        if(name==="" || email==="" || id==="" || password==="" || confpass==="" || dob===""){
            setErr(true)
        }
        else{
            setName(e.target.value)
            setEmail(e.target.value)
            setId(e.target.value)
            setPassword(e.target.value)
            setConfPass(e.target.value)
            setDob(e.target.value)

            //check id is already taken or not
            let match=matching()
            console.log(match)

            if(match!==null){
                if(match===0){
                    if(password === confpass){
                        let get=JSON.parse(localStorage.getItem("Users"))
                        get[get.length]={
                            Username:name,
                            userEmail:email,
                            userId:id,
                            Userpassword:password,
                            Userdob:dob
                        }
                        localStorage.setItem("Users",JSON.stringify(get))
                        pageRender("/")
                        setErr(false)
                    }   
                    else{
                        setPassErr(true)
                        setErr(false)
                    }
                }           
                else{
                    setExist(true)
                }
            }
            else{
                let object=[{
                    Username:name,
                    userEmail:email,
                    userId:id,
                    Userpassword:password,
                    Userdob:dob
                }]
                localStorage.setItem("Users",JSON.stringify(object))
                pageRender("/")
            }
        }
    }

    const matching=()=>{
        let get=JSON.parse(localStorage.getItem("Users"))
        if(get){
            let count=get.filter((val)=>{
                return val.userId===id ? val:""
            })
            return count.length
        }
        else{
            return null
        }
    }
    

    const havingAccount=()=>{
        pageRender("/")
    }


    return(
        <section className="bg">
            <div className="signup-container">
                <div className="col-12 row justify-content-center align-items-center vh-100 overflow">
                    <form className="col-5 backdrop-filter">
                        <div className="signup">
                            <h1>SIGNUP</h1>
                        </div>
                        {passerr && password===confpass ? <p className="error col-12 text-center">Password incorrect</p>:""}
                        {existed ? <p className="error col-12 text-center">userd already taken</p>:""}
                        <div className="col-12 pos">
                            <input type="text" name="Registername" value={name} required onInput={Register}/>
                            <span>Name</span>
                            {err && name==="" ? <p className="error">Username Required</p>:""}
                        </div>
                        <div className="col-12 pos">
                            <input type="email" name="Registeremail" value={email} required onInput={Register}/>
                            <span>Email</span>
                            {err && email==="" ? <p className="error">Email Required</p>:""}
                        </div>
                        <div className="col-12 pos">
                            <input type="text" name="Registid" value={id} required onInput={Register}/>
                            <span>Create id</span>
                            {err && id==="" ? <p className="error">Id Required</p>:""}
                        </div>
                        <div className="col-12 pos">
                            <input type="Password" name="Registpass" value={password} required onInput={Register}/>
                            <span>Password</span>
                            {err && password==="" ? <p className="error">Password Required</p>:""}
                        </div>
                        <div className="col-12 pos">
                            <input type="text" name="Registconfpass" value={confpass} required onInput={Register}/>
                            <span>Confirm password</span>
                            {err && confpass==="" ? <p className="error">confirm password Required</p>:""}
                        </div>
                        <div className="col-12">
                            <input type="date" name="Registerdob" value={dob} onInput={Register}/>
                            <span>DOB</span>
                            {err && dob==="" ? <p className="error">Date of birth Required</p>:""}
                        </div>
                        <div className="col-12 text-center">
                            <button type="submit" onClick={Submit}>Register</button>
                        </div>
                        <div className="col-12 text-center">
                            <button type="submit" onClick={havingAccount}>Already have an account ?</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}