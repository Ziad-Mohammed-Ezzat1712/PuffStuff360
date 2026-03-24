import axios, { Axios } from "axios";
import { createContext, useState, useEffect } from "react";


export let BrandContext=createContext();

export default function BrandContextProvider(props){


     const [Brands, setBrands] = useState([])
function AllBrands(params) {
   axios.get(`https://dashboard.splash-e-liquid.com/brand/getBrands.php?nocache=${Date.now()}`)
    .then((res)=> {
         console.log(res);
         setBrands(res.data.data)
    })
    .catch((err)=> err)
  
   
}



    return <BrandContext.Provider  value={{AllBrands,Brands,setBrands}}>

        {props.children}
    </BrandContext.Provider>
}