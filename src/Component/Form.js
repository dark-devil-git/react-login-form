import React, { useEffect, useState } from "react";
import "../Style/Form.scss"
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate,useParams} from "react-router-dom";


export const Form=()=>{ 

    const[Productname,setProductName]=useState("")
    const[Productprice,setProductprice]=useState("")
    const[Productrating,setProductrating]=useState("")
    const[Producturl,setProducturl]=useState("")
    const[array,setArray]=useState(JSON.parse(localStorage.getItem("Products")))
    const[err,setErr]=useState(false)
    const[show,setShow]=useState(false)
    const[showtable,setShowtable]=useState(false)
    const[editz,setEdit]=useState(false)
    const[ind,setInd]=useState(0) 
    const[paramEdit,setParamEdit]=useState(false)
    const[paramIndex,setParamIndex]=useState(0)


    const param = useParams();

    const Params=()=>{
        const getParam=param.id

        if(getParam>0){
            const Paramvalue=getParam-1
            setParamIndex(parseInt(Paramvalue))
            setParamEdit(true)//changing submit button to update  using this

            var get=JSON.parse(localStorage.getItem("Products"))

            var chk=get.find((val,ind)=>{
                return ind===parseInt(Paramvalue) ? val : ""
            })
            setProductName(chk.New_Productname)
            setProductprice(chk.New_Productprice)
            setProductrating(chk.New_Productrating)
            setProducturl(chk.New_Producturl)
            
            setShow(true)       
        }   
    }
    useEffect(()=>{
        Params()
    },[])
    
    const createProduct=(e)=>{
        if(e.target.name === "Productname"){
            setProductName(e.target.value)
        }
        else if(e.target.name === "Productprice"){
            setProductprice(e.target.value)
        }
        else if(e.target.name === "Productrating"){
            setProductrating(e.target.value)
        }
        else{
            setProducturl(e.target.value)
            setShow(true)
        }
    }

    const add=(e)=>{
        e.preventDefault()
        if(paramEdit===true){
            setProductName(e.target.value)
            setProductprice(e.target.value)
            setProductrating(e.target.value)
            setProducturl(e.target.value)

            var index=paramIndex

            var updateObject={
                New_Productname:Productname,
                New_Productprice:Productprice,
                New_Productrating:Productrating,
                New_Producturl:Producturl
            }
            var get=JSON.parse(localStorage.getItem("Products"))
            get.splice(index,1,updateObject)
            localStorage.setItem("Products",JSON.stringify(get))
            setArray(get)
            setShow(false)
            setShowtable(true)            
            setParamEdit(false)
        }
        else{
            if(editz===true){
                setProductName(e.target.value)
                setProductprice(e.target.value)
                setProductrating(e.target.value)
                setProducturl(e.target.value)

                var index=ind

                var updateObject={
                    New_Productname:Productname,
                    New_Productprice:Productprice,
                    New_Productrating:Productrating,
                    New_Producturl:Producturl
                }
                var get=JSON.parse(localStorage.getItem("Products"))
                get.splice(index,1,updateObject)
                localStorage.setItem("Products",JSON.stringify(get))
                setArray(get)
                
                setEdit(false)
            }
            else{
                if(Productname==="" || Productprice==="" || Productrating==="" || Producturl===""){
                    setErr(true)
                }
                else{
                    if(Productname && Productprice && Productrating && Producturl){
                        setProductName(e.target.value)
                        setProductprice(e.target.value)
                        setProductrating(e.target.value)
                        setProducturl(e.target.value)

                        var get=JSON.parse(localStorage.getItem("Products"))

                        if(get!=null){  
                            get[get.length]={
                                New_Productname:Productname,
                                New_Productprice:Productprice,
                                New_Productrating:Productrating,
                                New_Producturl:Producturl
                            }
                            localStorage.setItem("Products",JSON.stringify(get))
                            setArray(get)
                            setShow(false)
                            setShowtable(true)
                            setErr(false)
                        }
                        else{
                            let items=[{
                                New_Productname:Productname,
                                New_Productprice:Productprice,
                                New_Productrating:Productrating,
                                New_Producturl:Producturl
                            }]
                            localStorage.setItem("Products",JSON.stringify(items))
                            setArray(items)
                            setShow(false)
                            setShowtable(true)
                            setErr(false)
                        }
                    }
                }
            }
        }
    }

    const pageRender=useNavigate()

    const gotohome=()=>{
        pageRender("/home")
    }

    const edit=(val,ind)=>{
        setProductName(val.New_Productname)
        setProductprice(val.New_Productprice)
        setProductrating(val.New_Productrating)
        setProducturl(val.New_Producturl)
        setEdit(true)
        setInd(ind)
    }

    const del=(value,ind)=>{
        let deletee=JSON.parse(localStorage.getItem("Products"))
        let updateDeletion=deletee.filter((val,i) => {
            return ind===i ? "":val
        })
        localStorage.setItem("Products",JSON.stringify(updateDeletion))
        setArray(updateDeletion)
    }

    return(
        <section className="vh-100 bg">
            <div className="form-container">
                <div className="col-12 row justify-content-center align-items-center vh-100 overflow">
                    <div className="row justify-content-around backdrop-filter p-5">
                        <form className="col-4 row backdrop-filter">
                            <div className="col-12 pos">
                                <input type="text" name="Productname" value={Productname} required onInput={createProduct}/>
                                <span>Product Name</span>
                                {err && Productname==="" ? <p className="error">Product name required</p>:""}
                            </div>
                            <div className="col-12 pos">
                                <input type="number" name="Productprice" value={Productprice} required onInput={createProduct}/>
                                <span>Product price</span>
                                {err && Productprice==="" ? <p className="error">Product price required</p>:""}
                            </div>
                            <div className="col-12 pos">
                                <input type="url" name="Producturl" value={Producturl} required onInput={createProduct}/>
                                <span>Product Image Url</span>
                                {err && Producturl==="" ? <p className="error">Product url required</p>:""}
                            </div>
                            <div className="col-12 pos">
                                <input type="number" name="Productrating" value={Productrating} required onInput={createProduct}/>
                                <span>Product Rating</span>
                                {err && Productrating==="" ? <p className="error">Product rating required</p>:""}
                            </div>
                            <div className="col-12 row justify-content-center">
                                <button type="submit" onClick={add}>Add product</button>
                            </div>
                        </form>

                        
                        <div className="col-4 text-center">
                        {show && (
                            <img src={Producturl} className="image-border product-img" height="250px" width="250px"/>
                            )}
                        </div>
                        
                        <div className="justify-content-center row col-12">
                            {showtable &&(
                                <table className="col-12 text-center">
                                    <thead>
                                        <tr>
                                            <th>Product name</th>
                                            <th>Product price</th>
                                            <th>Product rating</th>
                                            <th>Product url</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {array.map((val,ind) =>{
                                            return(<tr key={ind}>
                                                <td>{val.New_Productname}</td>
                                                <td>{val.New_Productprice}</td>
                                                <td>{val.New_Productrating}</td>
                                                <td><img src={val.New_Producturl} width="150px" height="100px" style={{borderRadius:"22px"}}/></td>
                                                <td onClick={()=>edit(val,ind)} style={{cursor:"pointer",fontSize:"35px"}}><BiSolidEditAlt/></td>
                                                <td onClick={()=>del(val,ind)} style={{cursor:"pointer",fontSize:"35px"}}><MdDelete/></td>
                                            </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>
                            )}
                            
                            <form className="col-12 text-center">
                                <button type="submit" onClick={gotohome} className="buttonrenderHome">Go to home</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}