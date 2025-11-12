import React, { useState } from 'react';
import { useCart } from '../../Context/CartContext1.jsx';
import img1 from '../../../images/prod1.png';
import { Link } from 'react-router-dom';

const trendingProducts = [
  {
    id: 1,
    brand: 'HORIZONTECH',
    title: 'HorizonTech - Binaries Cabin Disposable | 6000 puffs | 15mL',
    price: 500,
    image: img1  },
  {
    id: 2,
    brand: 'SMOK',
    title: 'SMOK Nord 4 Pod Kit | 80W | 2000mAh',
    price: 2000,
    image: 'https://cdn.vapeclub.co.uk/img/products/smok-nord-4-pod-kit_18.jpg',
  },
  {
    id: 3,
    brand: 'Vaporesso',
    title: 'Vaporesso XROS 3 Pod Kit',
    price: 850,
    image: 'https://evspz.b-cdn.net/wp-content/uploads/2023/04/xros-3.webp',
  },
  {
    id: 4,
    brand: 'GeekVape',
    title: 'GeekVape Aegis Boost Pro',
    price: 1200,
    image: 'https://www.ave40.com/media/catalog/product/cache/90749f8613804db36d489c1b87f06735/g/e/geekvape_aegis_boost_pro_100w_pod_mod_kit_1_.jpg' },
  {
    id: 5,
    brand: 'Lost Vape',
    title: 'Lost Vape Orion Q-Pro Pod Kit',
    price: 950,
    image: 'https://cdn4.volusion.store/djqrj-kxptz/v/vspfiles/photos/Lost-Vape-Orion-Q-PRO-KIT-2.jpg?v-cache=1740474339' },
  // ... أضف باقي المنتجات لتصل لـ 20, كلها من نفس المصدر أو روابط صور مشابهة
  {
    id: 6,
    brand: 'Vaporesso',
    title: 'Vaporesso Luxe PM40',
    price: 1300,
    image: 'https://img.vawoo.com/images/detailed/338/Luxe-PM40-Kit-1.jpg' },
  {
    id: 7,
    brand: 'Uwell',
    title: 'Uwell Caliburn G2',
    price: 700,
    image: 'https://evspz.b-cdn.net/wp-content/uploads/2022/02/CALIBURN-G2.jpeg'
   },
  {
    id: 8,
    brand: 'Voopoo',
    title: 'Voopoo Drag S Pro',
    price: 1600,
    image: 'https://static.wixstatic.com/media/a6b702_50b2b7055c2f4dea8e42430b77c0f0d0~mv2.webp/v1/fit/w_500,h_500,q_90/file.webp'  },
  {
    id: 9,
    brand: 'Smok',
    title: 'Smok RPM 5 Kit',
    price: 1100,
    image:'https://www.royalflushvape.co.uk/cdn/shop/products/smok_rpm_5_kit_black_main.jpg?v=1652956949' },
  {
    id: 10,
    brand: 'GeekVape',
    title: 'GeekVape Wenax Stylus',
    price: 780,
    image: 'https://www.vapewholesaleglobal.com/cdn/shop/products/Geekvape-Wenax-Stylus-Pod-Starter-Kit-1100mAh.jpg?v=1661223785'
  },
  // منتجات افتراضية إضافية لتصل 20
  {
    id: 11,
    brand: 'Vaporesso',
    title: 'Vaporesso GEN 200',
    price: 1900,
    image: 'https://vapestationstore.com/wp-content/uploads/2022/09/vaporesso_gen_200_kit_main.jpg'},
  {
    id: 12,
    brand: 'Uwell',
    title: 'Uwell Aeglos Pod',
    price: 800,
    image: 'https://cdn.salla.sa/oTbqCvvC3gEoX5IVDdRvMzJzIOe4RMhKvfZqjE2N.jpg' },
  {
    id: 13,
    brand: 'Voopoo',
    title: 'Voopoo Vinci X 2',
    price: 1400,
    image: 'https://myvapereview.com/wp-content/uploads/2021/11/1-1-8.jpg' },
  {
    id: 14,
    brand: 'SMOK',
    title: 'SMOK Scar-18',
    price: 1700,
    image: 'https://www.vapewholesaleglobal.com/cdn/shop/products/SMOK-Scar-18-Box-Kit-6_5ml.jpg?v=1658404189'  },
  {
    id: 15,
    brand: 'Lost Vape',
    title: 'Lost Vape Ursa Quest Multi',
    price: 2100,
    image: 'https://img.vawoo.com/images/detailed/307/UrsaZQuestAMultiit1.jpg'},
  {
    id: 16,
    brand: 'Vaporesso',
    title: 'Vaporesso Target 80',
    price: 900,
    image: 'https://www.vapewholesaleglobal.com/cdn/shop/products/Vaporesso-Target-80-Pod-Mod-Kit-7.jpg?v=1658407353'},
  {
    id: 17,
    brand: 'GeekVape',
    title: 'GeekVape Aegis X',
    price: 2000,
    image:'https://a1.vaping360.com/geekvape_aegis_x_01_thumbnail_6b539438f0.jpg?auto=compress,format&w=1080&h=auto&fit=clamp&sat=0&crop=edges&q=50' },
  {
    id: 18,
    brand: 'Uwell',
    title: 'Uwell Yearn Pod',
    price: 650,
    image: 'https://el-clan.com/cdn/shop/files/uwell-yearn-neat-2-pod-bwd-yrn-nyt-uwell-lkln-fyb-stwr.jpg?v=1733061652'},
  {
    id: 19,
    brand: 'Smok',
    title: 'Smok Nord 2',
    price: 1200,
    image: 'https://cdn.salla.sa/DGPjbb/eb3428f2-ada3-42ad-80bf-75921f14915c-1000x1000-X4bd5xUatGX4LHto33a8QXJt1jxbZpKvVsvvq3DU.jpg'},
  {
    id: 20,
    brand: 'Voopoo',
    title: 'Voopoo Drag X Plus',
    price: 1700,
    image: 'https://rezkvape.com/wp-content/uploads/2023/09/VOOPOO-DRAG-X-Plus-100W-POD-MOD-K-%D8%AF%D8%B1%D8%A7%D8%AC-%D8%A7%D9%83%D8%B3-%D8%A8%D9%84%D8%B3-%D9%83%D9%8A%D8%AA-%D9%81%D9%88%D8%A8%D9%88-2.jpeg'  },
];

export default function Trending() {
  const { addToCart } = useCart();

  // حالة تحميل زر الإضافة (id المنتج الذي يتم إضافته)
  const [loadingId, setLoadingId] = useState(null);
  // حالة نجاح الإضافة مؤقتًا للتويست
  const [addedId, setAddedId] = useState(null);

  async function handleAddToCart(product) {
    setLoadingId(product.id); // بداية اللودينج
    // محاكاة تأخير إضافة للسلة (مثلاً 1.2 ثانية)
    await new Promise((r) => setTimeout(r, 1200));

    addToCart(product);

    setLoadingId(null); // انتهاء اللودينج
    setAddedId(product.id); // نعرض التويست

    // إخفاء التويست بعد 2 ثانية
    setTimeout(() => setAddedId(null), 2000);
  }

  return (
    <section className="text-white px-4 py-10 bg-black min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Trending Vape Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {trendingProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#111] p-4 rounded-lg border border-gray-700 hover:shadow-lg transition duration-300 flex flex-col"
          >
            <Link 
  to={`/product/${product.id}`}
  state={{ productsArray: trendingProducts }}  
>
            <img
              src={product.image}
              alt={product.title}
              className="mx-auto mb-4 h-80 object-contain"
            />
            </Link>
            <div className="text-left flex-grow">
              <h4 className="text-sm text-gray-400 mb-2">{product.brand}</h4>
              <p className="text-base text-white font-medium mb-2 line-clamp-2">{product.title}</p>
              <span className="text-[#FD0000] font-semibold text-lg">{` ${product.price} EGP`}</span>
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              disabled={loadingId === product.id}
              className={`mt-4 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition duration-300 ${
                loadingId === product.id ? 'cursor-not-allowed opacity-70' : ''
              }`}
            >
              {loadingId === product.id ? (
                // لودينج سبينر بسيط
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
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : addedId === product.id ? (
                <span>Added ✓</span> // التويست، تغير نص الزرار مؤقتاً
              ) : (
                'Add to Cart'
              )}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
