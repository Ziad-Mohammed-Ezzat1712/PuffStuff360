// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Shape from '../shape/shape'
import Done from "../../assets/Images/Done.svg"; 

import { Lock, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";

export default function ConfirmationPage() {

  

  return (
    <>
     <h2 className="text-3xl font-bold mb-10 text-[#ffffff] text-center">
            Your Shopping Cart
          </h2>
    <Shape/>
    
<div className='bg-white container mx-auto max-w-xl rounded-xl mt-20'>
<h1 className='py-10 text-[25px] font-semibold'>Payment method</h1>
<div className="bg-[#DCFCE7] rounded-full w-[100px] h-[100px] mx-auto py-5">
  <img src={Done} alt="DoneIcon" className="w-[60px] h-[60px] mx-auto"/>
</div>
<h1 className="text-xl my-6">Successful operation</h1>
<h1 className="text-lg my-6 text-[#A0A0A0]"> The transfer will be reviewed shortly.</h1>
<div className='mb-4 px-10 font-normal '> 
  <h1 className="mb-3 text-lg">You’ll get a confirmation on WhatsApp or </h1>
  <h1 className='mb-3 text-lg'>email once reviewed.</h1>
 
</div>

<div className='flex justify-center gap-4 pb-10 px-10 pt-4 '>
<Link to="/" className="w-full flex items-center text-xl  gap-3 bg-transparent border-2 border-[#790000]  justify-center font-normal text-black py-3 rounded-xl hover:bg-[#790000]  hover:text-white hover:border-transparent">   <button >
   Back Home
  </button>
</Link>
</div>

</div>
<div className="mt-[20px] flex  justify-center  items-center gap-5 ">
    <LockKeyhole size={32} className="text-[#A59F9F]" />
  <h1 className="text-[#C4C4C4] text-[18px] mt-2"> All transactions are secure and encrypted.</h1>
</div>
    </>
  )
}
