// src/pages/BestSellersPage.jsx
import React, { useState } from 'react';
import best1 from '../../../images/best1.png';
import best2 from '../../../images/best2.png';
import best3 from '../../../images/best3.png';
import best4 from '../../../images/best4.png';
import toast from 'react-hot-toast';
import { useCart } from '../../Context/CartContext1.jsx';
import { Link } from 'react-router-dom';

export default function BestSellersPage() {

 const { addToCart } = useCart();
  const [loadingId, setLoadingId] = useState(null);

  const products = [
    { id: 1, brand: 'JOOS', title: 'Tango Twist Freeze by Voodoo Joos Salt Series 30mL', price: 300, image: best1 },
    { id: 2, brand: 'RUTHLESS', title: 'Cherry Drank by Ruthless Series 120ml', price: 250 , image: best2 },
    { id: 3, brand: 'ORGNX', title: 'ORGNX Disposable | 4000 puffs | 9mL | 5%', price:  200 , image: best3 },
    { id: 4, brand: 'GEEKVAPE', title: 'Geekvape Obelisk 65 Kit', price:  200 , image: best4 },
  ];

  const handleAdd = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
      toast.success(`${product.title} added to cart`);
    }, 800); 
  };

  const handleAddToCart = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
      toast.success(`${product.name} added to cart! 🛒`);
    }, 800); // محاكاة تحميل بسيط
  };

  return (
    <section className="text-white px-4 py-10 bg-black min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Best Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-[#111] p-4 rounded-lg border border-gray-700 hover:shadow-lg transition duration-300">
              <Link 
  to={`/product/${product.id}`}
  state={{ productsArray: products }}  
>
            
            <img src={product.image} alt={product.title} className="mx-auto mb-4 h-48 object-contain" />
           </Link> 
            <div className="text-left">
              <h4 className="text-sm text-gray-400 mb-2">{product.brand}</h4>
              <p className="text-base text-white font-medium mb-2 line-clamp-2">{product.title}</p>
              <span className="text-[#FD0000] font-semibold text-lg block mb-4">{product.price} EGP</span>
              <button
                onClick={() => handleAdd(product)}
                disabled={loadingId === product.id}
                className="w-full bg-[#FD0000]  hover:bg-red-700 text-white py-2 rounded"
              >
                {loadingId === product.id ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
