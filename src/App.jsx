import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import   { Toaster } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout';
import Allorders from './Components/Allorders/Allorders';
import DashboardLayout from './Components/DashboardLayout/DashboardLayout';
import ProductsDashboard from './Components/ProductsDashboard/ProductsDashboard';
import BrandsList from './Components/BrandsList/BrandsList';
import PremiumProducts from './Components/PremiumProducts/PremiumProducts';
import VapingDevices from './Components/VapingDevices/VapingDevices';
import Trending from './Components/Trending/Trending';
import OrderConfirmation from './Components/OrderConfirmation/OrderConfirmation';
import VapeReviewsPage from './Components/VapeReviewsPage/VapeReviewsPage';
import StarterKitsPage from './Components/StarterKitsPage/StarterKitsPage';
import CategoriesELiquidsPage from './Components/CategoriesE-LiquidsPage/CategoriesE-LiquidsPage';
import BrandsELiquids from './Components/BrandsE-Liquids/BrandsE-Liquids';
import ProductsELiquids from './Components/ProductsE-Liquids/ProductsE-Liquids';
import TanksList from './Components/TanksList/TanksList';
import CategoriesAccessoriesList from './Components/CategoriesAccessoriesList/CategoriesAccessoriesList';
import AccessoriesCategory from './Components/AccessoriesCategory/AccessoriesCategory';
import DisposableVapes from './Components/DisposableVapes/DisposableVapes';
import Alternatives from './Components/AlternativesDefinition/AlternativesDefinition';
import Clearance from './Components/Clearance/Clearance';
import NewArrivalsPage from './Components/NewArrivalsPage/NewArrivalsPage';
import { CartProvider } from './Context/CartContext1';
import BestSellersPage from './Components/BestSellersPage/BestSellersPage';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import ShippingPage from './Components/shippingPage/shippingPage';
import PaymentPage from './Components/PaymentPage/PaymentPage';
import DetailsPage from "./Components/DetailsPage/DetailsPage";
import ConfirmationPage from "./Components/ConfirmationPage/ConfirmationPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AboutUs from "./Components/AboutUs/AboutUs";



// eslint-disable-next-line no-unused-vars
let x = createBrowserRouter([
    {path : "" , element:<Layout/>,children:[
    {index : true,element:<Home/> },
    {path:"cart",element:<Cart/>},
    {path:"login",element:<Login/>},
    {path:"register",element:<Register/>},
    {path:"*",element:<NotFound/>},
    {path:"premium-products",element:<PremiumProducts/>},
    {path:"vaping-devices",element:<VapingDevices/>},
    { path: '/order-confirmation', element: <OrderConfirmation /> },
    {path:"trending",element:<Trending/>},
    {path:"checkout",element:<Checkout/>},
    {path:"allorders",element:<Allorders/>},
    {path:"brandlist",element:<BrandsList/>},
    {path:"reviews",element:<VapeReviewsPage/>},
    {path:"shopstartkits",element:<StarterKitsPage/>},
    {path:"e-liquids",element:<CategoriesELiquidsPage/>},
    {path:"brandseLiquids/:category",element:<BrandsELiquids/>},
    {path:"productseLiquids/:brand",element:<ProductsELiquids/>},
    {path:"tanks",element:<TanksList/>},
    {path:"accessories",element:<CategoriesAccessoriesList/>},
    {path:"/accessories/:category",element:<AccessoriesCategory/>},
    {path:"disposable",element:<DisposableVapes/>},
    {path:"alternatives",element:<Alternatives/>},
    {path:"clearance",element:<Clearance/>},
    {path:"new-arrivals",element:<NewArrivalsPage/>},
    {path:"best-sellers",element:<BestSellersPage/>},
    {path:"/product/:id",element:<ProductDetails />},
    {path:"/shippingpage",element:<ShippingPage />},
    {path:"/paymentpage",element:<PaymentPage />},
    {path:"/details",element:<DetailsPage />},
    {path:"/confirmation",element:<ConfirmationPage/>},
    ,


  ]},
{
  path:"/about",element:<AboutUs/>
  }
]

)

function App() {


  return(
  
  <>
   <ToastContainer />
  <CartProvider>
       <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={x}></RouterProvider>
   
    
  
 
  </CartProvider>
  </>
  )
}

export default App;
