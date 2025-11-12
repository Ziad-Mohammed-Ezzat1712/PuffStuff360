import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../Context/CartContext1.jsx';
import toast from 'react-hot-toast';


const productsByCategory = {
  coils: [
    { id: 'coil1', title: 'SMOK Coil Pack - 5 pcs', price: 150 , image: 'https://m.media-amazon.com/images/I/719ShrKaqlL._UF1000,1000_QL80_.jpg' },
    { id: 'coil2', title: 'GeekVape Replacement Coil', price: 140 , image: 'https://egyptvape.net/wp-content/uploads/2020/10/coil-geekvape-g-coils-aegis-pod-kit-five-pack-0-6ohm-14024732213337_600x.jpg' },
  ],
  pods: [
    { id: 'pod1', title: 'Uwell Caliburn Pod', price: 250 , image: 'https://www.vapewholesaleglobal.com/cdn/shop/products/Uwell-Caliburn-GK2-Pod-System-Kit-2.jpg?v=1658410073' },
    { id: 'pod2', title: 'SMOK Novo Pod', price: 270 , image: 'https://www.vapewholesaleglobal.com/cdn/shop/products/SMOK-Novo-4-Pod-Kit-800mAh.jpg?v=1658404271' },
  ],
  batteries: [
    { id: 'bat1', title: '18650 Battery - 3700mAh', price: 200 , image: 'https://m.media-amazon.com/images/I/61H8KJTqFzL.jpg' },
    { id: 'bat2', title: '21700 Battery - 3000mAh', price: 350 , image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTASh2VV43g3hKlxY8UCznnxN77OhhQE_qxZg&s' },
  ],
  chargers: [
    { id: 'charge1', title: 'USB Charger Cable', price: 80 , image: 'https://i5.walmartimages.com/asr/442e656f-5753-4f16-8031-f0abe320a657.c30570d441628e7c732dcea65d477ae1.jpeg' },
    { id: 'charge2', title: 'Battery Charger', price: 120 , image: 'https://rezkvape.com/wp-content/uploads/2023/09/Battery-Smart-Charger-LCD-USB-Charger-AWT-C2-2-Slots-26650-Battery-Charger-for-20700-18500.jpg_640x640.jpg' },
  ],
  'drip-tips': [
    { id: 'drip1', title: '810 Drip Tip', price: 50 , image: 'https://m.media-amazon.com/images/I/61T47MolwtL._AC_SL1500_.jpg' },
    { id: 'drip2', title: '510 Drip Tip', price: 45 , image: 'https://m.media-amazon.com/images/I/41O0U8RLglL._UF1000,1000_QL80_.jpg' },
  ],
  'tank-covers': [
    { id: 'cover1', title: 'Silicone Tank Cover', price: 60 , image: 'https://m.media-amazon.com/images/I/61RJcqzzGjL._UF894,1000_QL80_.jpg' },
  ],
  'cases': [
    { id: 'case1', title: 'Vape Case', price: 90 , image: 'https://m.media-amazon.com/images/I/71fILRwcInL._AC_SL1001_.jpg' },
  ],
  'cleaning-kits': [
    { id: 'clean1', title: 'Vape Cleaning Kit', price: 70 , image: 'https://vapepensales.com/cdn/shop/products/SmoqCleaningTools1.jpg?v=1625511975' },
  ],
};

export default function AccessoriesCategory() {
  const { category } = useParams();
  

 const { addToCart } = useCart();
  const [loadingId, setLoadingId] = useState(null);

  const products = productsByCategory[category] || [];

 

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
      <h1 className="text-3xl font-bold mb-8">{category.replace(/-/g, ' ').toUpperCase()}</h1>

      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
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
                loading="lazy"
              />
              </Link>
              <div className="text-left flex-1">
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-[#FD0000] font-semibold text-lg">{product.price} EGP</p>
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
      )}
    </section>
  );
}
