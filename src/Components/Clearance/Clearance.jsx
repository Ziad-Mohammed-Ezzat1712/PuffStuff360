import React, { useState } from 'react';
import { useCart } from '../../Context/CartContext1.jsx';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const clearanceProducts = [
  {
    id: 'clear1',
    title: 'SMOK Starter Kit - Clearance',
    price: 750 ,
    image: 'https://cdn11.bigcommerce.com/s-og5cwbhm/images/stencil/1280x1280/products/5460/20234/SMOK_Vape_Pen_V2_Pen_Kits__49289.1627130123.jpg?c=2',
  },
  {
    id: 'clear2',
    title: 'GeekVape Coil Pack - Clearance',
    price: 100 ,
    image: 'https://lavaporwholesale.com/cdn/shop/files/image_2024_02_20T00_15_52_028Z_1.png?v=1708535488',
  },
  {
    id: 'clear3',
    title: 'Vape Battery Charger - Clearance',
    price:70 ,
    image: 'https://cdn11.bigcommerce.com/s-og5cwbhm/images/stencil/290x360/products/4121/14750/Xtar_VC2_Charger_Lead__46260.1554715208.jpg?c=2',
  },
  {
    id: 'clear4',
    title: 'Berry Blast E-Liquid - Clearance',
    price: 200 ,
    image: 'https://cdn.vapeclub.co.uk/img/products/berry-blast-e-liquid-by-doozy-vape-co.jpg',
  },
];

export default function Clearance() {
  const { addToCart } = useCart();
  const [loadingId, setLoadingId] = useState(null);

  

  const handleAddToCart = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
      toast.success(`${product.name} added to cart! 🛒`);
    }, 800); // محاكاة تحميل بسيط
  };

  return (
    <section className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">Clearance Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {clearanceProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#111] p-4 rounded-lg border border-gray-700 hover:shadow-lg transition duration-300 flex flex-col"
          >
                       <Link 
  to={`/product/${product.id}`}
  state={{ productsArray: clearanceProducts }}  
>
            <img
              src={product.image}
              alt={product.title}
              className="mx-auto mb-4 h-80 object-contain"
              loading="lazy"
            />
            </Link>
            <div className="text-left flex-1">
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-white font-semibold text-lg">{product.price} EGP</p>
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
