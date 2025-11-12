import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../../Context/CartContext1.jsx';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const devices = [
  {
    id: 1,
    title: 'Smok Nord 4',
    price: 39.99,
    image: 'https://capital-vape.com/wp-content/uploads/2023/02/%D8%AA%D9%86%D8%B2%D9%8A%D9%84-2023-02-13T205729.766.jpg',
    rating: 4,
  },
  {
    id: 2,
    title: 'Voopoo Drag X',
    price: 49.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-yrzl6GlybFMSHMGj1OcwV3VFpDHy12vVMA&s',
    rating: 5,
  },
  {
    id: 3,
    title: 'GeekVape Aegis Legend',
    price: 59.99,
    image: 'https://www.vapestore.co.uk/cdn/shop/files/geekvape-aegis-legend-2-black.jpg?v=1729041429',
    rating: 4,
  },
  {
    id: 4,
    title: 'Smok Nord 4',
    price: 39.99,
    image: 'https://capital-vape.com/wp-content/uploads/2023/02/%D8%AA%D9%86%D8%B2%D9%8A%D9%84-2023-02-13T205729.766.jpg',
    rating: 4,
  },
  {
    id: 5,
    title: 'Voopoo Drag X',
    price: 49.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-yrzl6GlybFMSHMGj1OcwV3VFpDHy12vVMA&s',
    rating: 5,
  },
  {
    id: 6,
    title: 'GeekVape Aegis Legend',
    price: 59.99,
    image: 'https://www.vapestore.co.uk/cdn/shop/files/geekvape-aegis-legend-2-black.jpg?v=1729041429',
    rating: 4,
  },
  {
    id: 7,
    title: 'Smok Nord 4',
    price: 39.99,
    image: 'https://capital-vape.com/wp-content/uploads/2023/02/%D8%AA%D9%86%D8%B2%D9%8A%D9%84-2023-02-13T205729.766.jpg',
    rating: 4,
  },
  {
    id: 8,
    title: 'Voopoo Drag X',
    price: 49.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-yrzl6GlybFMSHMGj1OcwV3VFpDHy12vVMA&s',
    rating: 5,
  },
  {
    id: 9,
    title: 'GeekVape Aegis Legend',
    price: 59.99,
    image: 'https://www.vapestore.co.uk/cdn/shop/files/geekvape-aegis-legend-2-black.jpg?v=1729041429',
    rating: 4,
  },
];




export default function VapingDevices() {
  const { addToCart } = useCart();
  const [loadingId, setLoadingId] = useState(null); // لتحديد أي زر عليه لودينج

  

  const handleAddToCart = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
      toast.success(`${product.name} added to cart! 🛒`);
    }, 800); // محاكاة تحميل بسيط
  };

  return (
    <div className="bg-black text-white py-12 px-4 md:px-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#FD0000]">
        Vaping Devices
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {devices.map((device) => (
          <div
            key={device.id}
            className="bg-[#1a1a1a] rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Link
  to={`/product/${device.id}`}
  state={{ productsArray: devices }}
>
            <img
              src={device.image}
              alt={device.title}
              className="w-full h-80 object-contain rounded-md mb-4"
            />
            </Link>
            <h3 className="text-xl font-semibold mb-2">{device.title}</h3>
            <p className="text-gray-300 mb-2">${device.price.toFixed(2)}</p>
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`mr-1 ${i < device.rating ? 'text-yellow-400' : 'text-gray-500'}`}
                />
              ))}
            </div>
            <button
              onClick={() => handleAddToCart(device)}
              disabled={loadingId === device.id}
              className={`w-full py-2 rounded-md text-white font-semibold transition ${
                loadingId === device.id
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-[#FD0000] hover:bg-red-700'
              }`}
            >
              {loadingId === device.id ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Adding...
                </span>
              ) : (
                'Add to Cart'
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

