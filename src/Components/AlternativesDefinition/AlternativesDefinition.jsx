import React, { useState } from 'react';

import toast from 'react-hot-toast';
import { useCart } from '../../Context/CartContext1.jsx';
import { Link } from 'react-router-dom';

const alternativesProducts = [
  {
    id: 'alt1',
    title: 'Vape Alternative Device A',
    price: 850 ,
    image: 'https://example.com/images/alt-device-a.jpg',
  },
  {
    id: 'alt2',
    title: 'Alternative E-Liquid Flavor X',
    price: 270 ,
    image: 'https://example.com/images/alt-eliquid-x.jpg',
  },
  {
    id: 'alt3',
    title: 'Vape Alternative Device B',
    price: 920 ,
    image: 'https://example.com/images/alt-device-b.jpg',
  },
  {
    id: 'alt4',
    title: 'Alternative Pod System Z',
    price: 680 ,
    image: 'https://example.com/images/alt-pod-z.jpg',
  },
];

export default function Alternatives() {
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
      <h1 className="text-3xl font-bold mb-8">Alternatives</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {alternativesProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#111] p-4 rounded-lg border border-gray-700 hover:shadow-lg transition duration-300 flex flex-col"
          >
            <Link 
  to={`/product/${product.id}`}
  state={{ productsArray: alternativesProducts }}  
>
            <img
              src={product.image}
              alt={product.title}
              className="mx-auto mb-4 h-48 object-contain"
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
