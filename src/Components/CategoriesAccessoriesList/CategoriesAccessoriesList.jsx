import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'coils', name: 'Coils', image: 'https://www.vapesuperstore.co.uk/cdn/shop/collections/coils.jpg?v=1581440170' },
  { id: 'pods', name: 'Pods', image: 'https://www.vapewholesaleglobal.com/cdn/shop/articles/Lost-Vape-Ursa-S-Pod-System-Kit-VWG-_1.webp?v=1726112402' },
  { id: 'batteries', name: 'Batteries', image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_900,h_900/https://www.redwaypower.com/wp-content/uploads/2024/01/Vape-Lithium-Batteries.jpg' },
  { id: 'chargers', name: 'Chargers', image: 'https://cdn11.bigcommerce.com/s-nlylv/images/stencil/590x590/products/1255/7827/nitecore-q2-chargers__88341.1713327092.jpg?c=2' },
  { id: 'drip-tips', name: 'Drip Tips', image: 'https://img.vawoo.com/images/detailed/339/Sailing-510-Drip-Tip-1.jpg' },
  { id: 'tank-covers', name: 'Tank Covers', image: 'https://www.vapewholesaleglobal.com/cdn/shop/files/Tank-Protective-Cover.jpg?v=1694142001' },
  { id: 'cases', name: 'Cases & Holders', image: 'https://m.media-amazon.com/images/I/61F3rWq2-AL._UF894,1000_QL80_.jpg' },
  { id: 'cleaning-kits', name: 'Cleaning Kits', image: 'https://dubaivapepoint.com/wp-content/uploads/2021/09/IQOS-Cleaning-Tools-kit.jpg' },
];

export default function CategoriesAccessoriesList() {
  const handleAddToCart = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
      toast.success(`${product.name} added to cart! 🛒`);
    }, 800); // محاكاة تحميل بسيط
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">Vape Accessories Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map(cat => (
          <Link
            to={`/accessories/${cat.id}`}
            key={cat.id}
            className="bg-[#111] rounded p-4 flex flex-col items-center hover:shadow-lg transition"
          >
            <img src={cat.image} alt={cat.name} className="h-68 mb-4 object-contain" />
            <h2 className="text-center font-semibold text-lg text-white">{cat.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
