import React from 'react';
import { useParams, Link } from 'react-router-dom';

// بيانات ماركات لكل كاتيجوري (مثال)
const brandsByCategory = {
  'egyptian-liquid': [
    { id: 'vape-station'    ,name: 'Vape Station', image: 'https://www.elkoteg.com/wp-content/uploads/2024/09/Untitled-design_20240906_124130_0000-300x300.webp' },
    { id: 'splash-vape'     ,    name: 'Splash Vape', image: 'https://scontent.fcai20-5.fna.fbcdn.net/v/t39.30808-6/408197896_730888215766004_5907314961299318242_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=NaSo63W9OFkQ7kNvwHu5RiF&_nc_oc=AdmFtOdVo7brX3SCb634ZRpybgEbNUl85FMhYexV_UQMhsWH_UNkjyxhDUZ1O625sjE&_nc_zt=23&_nc_ht=scontent.fcai20-5.fna&_nc_gid=0Hof3nx_egkO8aOx65B3QQ&oh=00_AfUTr-ckqrwcbD0bRvi5G8aZWa33o2SUUMqp07BzG-wxSQ&oe=689D0000' },
    { id: '8-ball'           ,         name: '8-Ball', image: 'https://www.elkoteg.com/wp-content/uploads/2024/06/8-ball-300x300.jpg' },
    { id: 'plus-18-liquid'   , name: 'PLUS 18 LIQUID', image: 'https://www.elkoteg.com/wp-content/uploads/2024/06/plus-18.jpg' },
    { id: 'prestige-eliquid'   , name: 'PRESTIGE ELIQUID', image: 'https://www.elkoteg.com/wp-content/uploads/2024/06/prestige-300x300.jpg' },
    { id: 'uno-eliquid'       , name: 'UNO ELIQUID', image: 'https://rezkvape.com/wp-content/uploads/2023/09/Uno-Ejuice-%D9%84%D9%8A%D9%83%D9%88%D9%8A%D8%AF-%D8%A7%D9%88%D9%86%D9%88-16-1.jpg' },
    { id: 'elephant-ejuice'  , name: 'ELEPHANT EJUICE', image: 'https://www.elkoteg.com/wp-content/uploads/2024/06/elephant.jpg' },
    { id: 'eagle-eliquid'      , name: 'EAGLE ELIQUID', image: 'https://www.elkoteg.com/wp-content/uploads/2024/06/eagle-300x300.jpg' },
   ],
};


export default function BrandsELiquids() {
  const { category } = useParams();
  const brands = brandsByCategory[category] || [];

  const handleAddToCart = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
      toast.success(`${product.name} added to cart! 🛒`);
    }, 800); // محاكاة تحميل بسيط
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-10 text-white">{category.replace(/-/g, ' ').toUpperCase()}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
       {brands.map((brand) => (
  <Link
    key={brand.id}
    to={`/productseLiquids/${brand.id}`}
    className=" rounded shadow hover:shadow-lg text-center p-0 relative overflow-hidden"
  >
    <img
      src={brand.image}
      alt={brand.name}
      className="w-full  object-cover"
    />
    <div className="absolute bottom-6  left-0 right-0 bg-white bg-opacity-80 w-80 mx-auto py-5 px-3">
      <h3 className="font-semibold text-center">{brand.name}</h3>
    </div>
  </Link>
))}

      </div>
    </div>
  );
}


