import React, { useEffect, useState } from "react";
import "../Style/Home.scss"
import { json, useNavigate,useSearchParams } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";


export const Home=()=>{
    
    const pageRender=useNavigate()
    const[show,setShow]=useState(false)
    const[err,setErr]=useState(false)
    const[carderr,setCardErr]=useState(false)
    const[valCount,setValcount]=useState("") 


    const submit=()=>{
        pageRender('/form/hii')
    }

    const cardPage=()=>{
        var get=JSON.parse(localStorage.getItem("card"))
        // console.log(get)
        if(get===null || get.length===0){
            setCardErr(true)
        }
        else{
            pageRender("/card")
        }
    }

    const showCard=(e)=>{
        e.preventDefault()
        var get=JSON.parse(localStorage.getItem("Products"))
        if(get===null || get.length===0){
            setErr(true)   
        }
        else{
            setShow(true)
        }
    }


    const addtocart=(val,ind)=>{
        //checking whether the input is available or not by checking using this
        var cardCount=document.getElementById("cardCount")
        setValcount(val) 

        var localstorageCard=JSON.parse(localStorage.getItem("card"))
        if(localstorageCard===null){
            let obj=[{
                    New_Productname:val.New_Productname,
                    New_Productprice:val.New_Productprice,
                    New_Productrating:val.New_Productrating,
                    New_Producturl:val.New_Producturl,
                    New_ProductCount:1
                }
            ]
            localStorage.setItem("card",JSON.stringify(obj))
            let count=obj.length
            cardCount.innerHTML=count
        }
        else{
            var checkDuplication=JSON.parse(localStorage.getItem("card"))
            const show=checkDuplication.filter((v,i)=>{
                return v.New_Productname===val.New_Productname ? v:""
            })

            if(show.length===0){
                localstorageCard[localstorageCard.length]={
                        New_Productname:val.New_Productname,
                        New_Productprice:val.New_Productprice,
                        New_Productrating:val.New_Productrating,
                        New_Producturl:val.New_Producturl,
                        New_ProductCount:1
                    }
                localStorage.setItem("card",JSON.stringify(localstorageCard))

                let count=localstorageCard.length
                cardCount.innerHTML=count
            }
            else{
                var checkDuplication=JSON.parse(localStorage.getItem("card"))
                var findDup=checkDuplication.find((v,i)=>{
                    return v.New_Productname===val.New_Productname ? v:""
                })
                console.log(checkDuplication)

                var findDupind=checkDuplication.indexOf(findDup)

                var obj={
                    New_Productname:val.New_Productname,
                    New_Productprice:val.New_Productprice,
                    New_Productrating:val.New_Productrating,
                    New_Producturl:val.New_Producturl,
                    New_ProductCount:findDup.New_ProductCount+1
                }
                
                console.log(ind)
                localstorageCard.splice(findDupind,1,obj)
                console.log(localstorageCard)
                localStorage.setItem("card",JSON.stringify(localstorageCard))
            }
        }
    }

    const rendereditform=(val,ind)=>{
        pageRender(`/form/${ind+1}`) 
    }

    return( 
        <section className="bg">
            <div className="home-container">
                <div className="row justify-content-center align-items-center vh-100 overflow">
                    <div className="col-10 row backdrop-filter padding">
                        <div className="home col-12">
                            <h1>WELCOME HOME</h1>
                        </div>
                        <form className="col-12 row text-center">
                            <div className="col-5" style={{padding:"0px"}}>
                                <button type="submit" onClick={submit}>Go To Form</button>
                            </div>
                            <div className="col-2" style={{padding:"0px"}}>
                                <h3 className="card-count" onClick={cardPage}>cart <sup id="cardCount"></sup> </h3>
                            </div>
                            <div className="col-5" style={{padding:"0px"}}>
                                <button type="submit" onClick={showCard}>View card</button>
                            </div>                     
                        </form>
                            <div className="col-12 row" id="rating">
                                {err ? <p className="error text-center col-12">No cards in local storage</p>:""}
                                {carderr ? <p className="error text-center col-12">No items added in card</p>:""}
                                {
                                    show && (
                                        JSON.parse(localStorage.getItem("Products")).map((val,ind) => {
                                            return(
                                                <div className="col-3 card" key={ind}>
                                                    <img src={val.New_Producturl} width="100%" height="150px"/>
                                                    <h4>Product Name : <span>{val.New_Productname}</span></h4>
                                                    <h4>Product Price : <span>{val.New_Productprice}</span></h4>
                                                    <h4>Product Rating : <span>{val.New_Productrating}</span></h4>
                                                    <span className="col-4 addtocart" onClick={()=>addtocart(val,ind)}>Add to cart <span className="icon"><AiOutlineShoppingCart/></span></span>
                                                    <form className="col-12">
                                                        <button type="submit" onClick={()=>rendereditform(val,ind)}>edit</button>
                                                    </form>
                                                </div>
                                            )
                                        })
                                    )
                                }
                            </div>
                    </div>
                </div>
            </div>
        </section>
    )
}