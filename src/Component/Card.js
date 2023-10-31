import React, { useState } from "react";
import "../Style/Card.scss"
import { MdDelete } from "react-icons/md";


export const Card=()=>{
    const[array,setArray]=useState(JSON.parse(localStorage.getItem("card")))

    const del=(val,ind)=>{
        let get=JSON.parse(localStorage.getItem("card"))
        let update=get.find((v,i) => {
            return ind===i?v:""
        })
        if(get.length==1){
            if(update.New_ProductCount>1){
                let obj=[{
                    New_Productname:val.New_Productname,
                    New_Productprice:val.New_Productprice,
                    New_Productrating:val.New_Productrating,
                    New_Producturl:val.New_Producturl,
                    New_ProductCount:update.New_ProductCount-1
                }]
                setArray(obj)
                localStorage.setItem("card",JSON.stringify(obj))
            }
            else{
                let rmv=get.filter((v,i) => {
                    return ind===i?"":v
                })
                setArray(rmv)
                localStorage.setItem("card",JSON.stringify(rmv))
            }
        }

        else{
            let get=JSON.parse(localStorage.getItem("card"))
            if(update.New_ProductCount>1){
                let obj={
                    New_Productname:val.New_Productname,
                    New_Productprice:val.New_Productprice,
                    New_Productrating:val.New_Productrating,
                    New_Producturl:val.New_Producturl,
                    New_ProductCount:update.New_ProductCount-1
                }

                get.splice(ind,1,obj)
                setArray(get)
                localStorage.setItem("card",JSON.stringify(get))
            }
            else{
                let rmv=get.filter((v,i) => {
                    return ind===i?"":v
                })
                setArray(rmv)
                localStorage.setItem("card",JSON.stringify(rmv))
            }
        }
    }
 
    return(
        <section className="bg">
            <div className="card-container">
                <div className="row justify-content-center align-items-center vh-100 overflow">
                    <div className="col-10 row backdrop-filter padding">
                        <div className="col-12 card">
                            <h1>CART</h1>
                        </div>

                        <table className="col-12 text-center">
                            <thead>
                                <tr>
                                    <th>Product name</th>
                                    <th>Product price</th>
                                    <th>Product rating</th>
                                    <th>Product count</th>
                                    <th>Product url</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {array.map((val,ind) =>{
                                    return(<tr key={ind}>
                                        <td>{val.New_Productname}</td>
                                        <td>{val.New_Productprice}</td>
                                        <td>{val.New_Productrating}</td>
                                        <td>{val.New_ProductCount}</td>
                                        <td><img src={val.New_Producturl} width="150px" height="100px" style={{borderRadius:"22px"}}/></td>
                                        <td onClick={()=>del(val,ind)} style={{cursor:"pointer",fontSize:"35px"}}><MdDelete/></td>
                                    </tr>)
                                    })
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </section>
    )
}