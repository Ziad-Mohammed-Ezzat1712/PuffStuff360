import React, { useState } from 'react';
import { useCart } from '../../Context/CartContext1.jsx';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const tanks = [
  {
    id: 'tank1',
    title: 'GeekVape Zeus Sub Ohm',
    price:  1200.00,
    image: 'https://img.vawoo.com/images/thumbnails/340/370/detailed/43/Z-Tank.jpg',
  },
  {
    id: 'tank2',
    title: 'Vaporesso iTank T',
    price:  1150.00,
    image: 'https://cdn.vapeclub.co.uk/img/products/vaporesso-itank-t_2.jpg',
  },
  {
    id: 'tank3',
    title: 'Aspire Nautilus 3',
    price: 950.00,
    image: 'https://www.aspireeciguk.co.uk/image/cache/catalog/Aspire%20avp%20cube/Aspire-Nautilus-3-tank-uk-800x800.jpg',
  },
  {
    id: 'tank4',
    title: 'SMOK TFV18',
    price:  1300.00,
    image: 'https://www.vapewholesaleglobal.com/cdn/shop/products/SMOK-TFV18-Mini-Tank-6.jpg?v=1661224864&width=1445',
  },
  {
    id: 'tank5',
    title: 'Uwell Valyrian 2 Pro',
    price:  1250.00,
    image: 'https://vapebeat.com/wp-content/uploads/2021/07/uwell-valyrian-2.jpg',
  },
  {
    id: 'tank6',
    title: 'Freemax Mesh Pro',
    price: 1100.00,
    image: 'https://www.bigdvapor.net/cdn/shop/products/Freemax-Mesh-Pro-Tank-Kit-with-2-Coils-and-Replacement-Glass-4.png?v=1700525115',
  },
  {
    id: 'tank7',
    title: 'Horizon Falcon King',
    price: 1180.00,
    image: 'https://admin.elementvape.com/media/catalog/product/h/o/horizon_falcon_king_mesh_sub-ohm_tank_1.jpg',
  },
  {
    id: 'tank8',
    title: 'Voopoo PnP Tank',
    price: 980.00,
    image: 'https://cdn.vapeclub.co.uk/img/products/voopoo-pnp-pod-tank_10.jpg',
  },
];

export default function TanksList() {
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
    <section className="text-white px-6 py-12 bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Vape Tanks</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {tanks.map((tank) => (
          <div
            key={tank.id}
            className="bg-[#111] p-4 rounded-lg border border-gray-700 hover:shadow-lg transition duration-300 flex flex-col"
          >
           <Link
  to={`/product/${tank.id}`}
  state={{ productsArray: tanks }}
>
            <img
              src={tank.image}
              alt={tank.title}
              className="mx-auto mb-4 h-48 w-full object-contain"
              loading="lazy"
            />
           </Link>
            <div className="text-left flex-1">
              <h3 className="text-xl font-semibold mb-2">{tank.title}</h3>
              <p className="text-[#FD0000] font-semibold text-lg">{tank.price} EGP</p>
            </div>

            <button
              onClick={() => handleAddToCart(tank)}
              disabled={loadingId === tank.id}
              className="mt-4 w-full bg-[#FD0000] text-white py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
            >
              {loadingId === tank.id ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
