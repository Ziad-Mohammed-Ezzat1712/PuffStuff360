import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useCart } from '../../Context/CartContext1.jsx';
import { Link } from 'react-router-dom';

const disposableProducts = [
  {
    id: 'disp1',
    title: 'Elf Bar 1500 Puff Disposable Vape',
    price: 350 ,
    image: 'https://img.vawoo.com/images/detailed/324/Elf_Bar_Lux_1500_Puffs_Disposable_Kit.jpg',
  },
  {
    id: 'disp2',
    title: 'Puff Bar Plus Disposable Vape',
    price:320 ,
    image: 'https://bsg-i.nbxc.com/product/93/f7/22/a8d3a80f25707a07e2680489bf.jpg@95Q.webp',
  },
  {
    id: 'disp3',
    title: 'Geek Bar Disposable Vape',
    price:340 ,
    image: 'https://ar.allbarvape.com/uploads/202437317/geek-bar-pulse-15000-puffs-vape6b0eb801-d3b9-4069-a1c3-eea6add5c4ce.jpg',
  },
  {
    id: 'disp4',
    title: 'HQD Cuvie Plus Disposable Vape',
    price: 300 ,
    image: 'https://ohmcityvapes.com/cdn/shop/products/hqd-cuvie_plus_disposable_vape_device_flavors_580x.jpg?v=1618597162',
  },
];

export default function DisposableVapes() {
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
      <h1 className="text-3xl font-bold mb-8">Disposable Vapes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {disposableProducts.map(product => (
          <div
            key={product.id}
            className="bg-[#111] p-4 rounded-lg border border-gray-700 hover:shadow-lg transition duration-300 flex flex-col"
          >
            <Link 
  to={`/product/${product.id}`}
  state={{ productsArray: disposableProducts }}  
>
            <img
              src={product.image}
              alt={product.title}
              className="mx-auto mb-4 h-80  object-contain"
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
