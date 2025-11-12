// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Shape from '../shape/shape'
import vo from "../../assets/Images/vo.png"; // مثال لصورة تانية
import i from "../../assets/Images/in.png"; // مثال لصورة تانية
import { Lock, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentPage() {
  const handleAddToCart = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
      toast.success(`${product.name} added to cart! 🛒`);
    }, 800); // محاكاة تحميل بسيط
  };

  // 'vodafone', 'instapay' أو null يعني مفيش اختيار
  const [selected, setSelected] = useState(null);

  const handleClick = (id) => {
    // لو عايز النقر على نفس الزر يلغي الاختيار: use toggle
    setSelected(prev => (prev === id ? null : id));

    // لو عايز تمنع إلغاء الاختيار (يعني لازم دايمًا يبقى واحد مختار),
    // استخدم السطر التالى بدلاً من السطر فوق:
    // setSelected(id);
  };

  const base = "flex items-center gap-3 px-4 font-medium py-2 rounded-xl transition-all";
  const unselected = "bg-transparent border border-black text-black hover:bg-[#790000] hover:text-white hover:border-transparent";
  const selectedClass = "bg-[#790000] text-white border-transparent";

  return (
    <>
     <h2 className="text-3xl font-bold mb-10 text-[#ffffff] text-center">
            Your Shopping Cart
          </h2>
    <Shape/>
    
<div className='bg-white container mx-auto max-w-xl rounded-xl mt-20'>
<h1 className='py-10 text-[25px] font-semibold'>Payment method</h1>

<div className="flex justify-center gap-4 pb-10">
      <button
        type="button"
        onClick={() => handleClick("vodafone")}
        aria-pressed={selected === "vodafone"}
        className={`${base} ${selected === "vodafone" ? selectedClass : unselected}`}
      >
        <img src={vo} alt="vodafone" className="h-12" />
        Vodafone Cash
      </button>

      <button
        type="button"
        onClick={() => handleClick("instapay")}
        aria-pressed={selected === "instapay"}
        className={`${base} ${selected === "instapay" ? selectedClass : unselected} px-8`}
      >
        <img src={i} alt="instapay" className="h-12" />
        Instapay
      </button>
    </div>

<div className='mb-4 px-10 font-medium '> 
  <h1> Please enter the mobile number</h1>
  <h1 className='mb-2'> from which the transfer will be made.</h1>
  <input type="text" className='bg-[#E6E6E6] w-full rounded-2xl h-14 px-4 mt-2'  placeholder='EX:01023456789'/>
</div>

<div className='flex justify-center gap-4 pb-10 pt-4 '>
   <button className='flex items-center  gap-3 bg-transparent border border-black px-20 font-medium text-black py-2 rounded-xl hover:bg-[#790000]  hover:text-white hover:border-transparent'>
    Back
  </button>
  <Link to="/details" className="text-white hover:text-black"><button className='flex items-center gap-3 bg-[#790000] hover:bg-transparent hover:border hover:border-black px-12 font-medium text-white hover:text-black py-2 rounded-xl'>
   continuation
  </button></Link>
</div>

</div>
<div className="mt-[20px] flex  justify-center  items-center gap-5 ">
    <LockKeyhole size={32} className="text-[#A59F9F]" />
  <h1 className="text-[#C4C4C4] text-[18px] mt-2"> All transactions are secure and encrypted.</h1>
</div>
    </>
  )
}
