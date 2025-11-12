import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../Context/CartContext1.jsx';
import toast from 'react-hot-toast';

// مثال بيانات المنتجات لكل ماركة
const productsByBrand = {
  'vape-station': [
    {
      id: 1,
      title: 'Vape Station Mango Blast | 60ml | 3mg',
      price: 250,
      image: 'https://example.com/products/vape-station-mango.webp',
    },
    {
      id: 2,
      title: 'Vape Station Blueberry Rush | 60ml | 6mg',
      price:  270 ,
      image: 'https://example.com/products/vape-station-blueberry.png',
    },
  ],
  'splash-vape': [
    {
      id: 3,
      title: 'Splash Vape Citrus Mix | 60ml | 3mg',
      price: 260 ,
      image: 'https://example.com/products/splash-vape-citrus.png',
    },
    {
      id: 4,
      title: 'Splash Vape Mint Breeze | 60ml | 6mg',
      price:  280 ,
      image: 'https://example.com/products/splash-vape-mint.png',
    },
  ],
  '8-ball': [
    {
      id: 5,
      title: '8-Ball Classic Tobacco | 60ml | 3mg',
      price:  240 ,
      image: 'https://example.com/products/8-ball-tobacco.png',
    },
    {
      id: 6,
      title: '8-Ball Watermelon | 60ml | 6mg',
      price: 255 ,
      image: 'https://example.com/products/8-ball-watermelon.png',
    },
  ],
  'plus-18-liquid': [
    {
      id: 7,
      title: 'PLUS 18 Liquid Strawberry | 60ml | 3mg',
      price:  260,
      image: 'https://example.com/products/plus18-strawberry.png',
    },
  ],
  'prestige-eliquid': [
    {
      id: 8,
      title: 'Prestige E-Liquid Vanilla Custard | 60ml | 3mg',
      price: 275 ,
      image: 'https://example.com/products/prestige-vanilla.png',
    },
    {
      id: 9,
      title: 'Prestige E-Liquid Mango Tango | 60ml | 6mg',
      price: 290 ,
      image: 'https://example.com/products/prestige-mango.webp',
    },
  ],
  'uno-eliquid': [
    {
      id: 10,
      title: 'UNO E-Liquid Berry Blast | 60ml | 3mg',
      price: 250 ,
      image: 'https://example.com/products/uno-berry.png',
    },
  ],
  'elephant-ejuice': [
    {
      id: 11,
      title: 'Elephant Ejuice Cola | 60ml | 3mg',
      price:  265 ,
      image: 'https://example.com/products/elephant-cola.png',
    },
  ],
  'eagle-eliquid': [
    {
      id: 12,
      title: 'Eagle E-Liquid Menthol | 60ml | 3mg',
      price: 270 ,
      image: 'https://example.com/products/eagle-menthol.png',
    },
  ],
};


export default function ProductsELiquids() {
  const { brand } = useParams();
  
 const { addToCart } = useCart();
  const [loadingId, setLoadingId] = useState(null);

  const products = productsByBrand[brand] || [];


  const handleAddToCart = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
      toast.success(`${product.name} added to cart! 🛒`);
    }, 800); // محاكاة تحميل بسيط
  };

  return (
    <section className="text-white bg-black min-h-screen px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">{brand.replace(/-/g, ' ').toUpperCase()}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-[#111] p-4 rounded-lg border border-gray-700 hover:shadow-lg transition duration-300 flex flex-col"
          >
            <Link 
             to={`/product/${product.id}`}
             state={{ productsArray: products  }}  
           >
            <img
              src={product.image}
              alt={product.title}
              className="mx-auto mb-4 h-48 object-contain"
            />
            </Link>
            <div className="text-left flex-1">
              <p className="text-base text-white font-medium mb-2 line-clamp-2">{product.title}</p>
              <span className="text-[#FD0000] font-semibold text-lg">{product.price} EGP</span>
            </div>

            <button
              onClick={() => handleAddToCart(product)}
              disabled={loadingId === product.id}
              className="mt-4 w-full bg-[#FD0000] text-white py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
            >
              {loadingId === product.id ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}




