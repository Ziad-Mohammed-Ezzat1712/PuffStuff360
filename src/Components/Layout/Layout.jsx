// eslint-disable-next-line no-unused-vars
import React from 'react'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
let {pathname} = useLocation(); 
console.log(pathname);

  return (
    <>
    
      <Navbar className={pathname === "/about" ? "hidden" : ""}/>

      <div className=" w-full max-w-[1800px] mx-auto my-5 py-20 lg:py-12">
      <Outlet/>
      </div>
      <Footer/>
    </>
  )
}
