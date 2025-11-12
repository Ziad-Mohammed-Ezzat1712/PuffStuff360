// eslint-disable-next-line no-unused-vars
import React from 'react'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const handleAddToCart = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
      toast.success(`${product.name} added to cart! 🛒`);
    }, 800); // محاكاة تحميل بسيط
  };

  return (
    <>
      <Navbar/>

      <div className=" w-full max-w-[1800px] mx-auto my-5 py-20 lg:py-12">
      <Outlet/>
      </div>
      <Footer/>
    </>
  )
}
