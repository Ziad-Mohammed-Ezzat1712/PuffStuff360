import React, { useState } from 'react';

const brands = [
  "Acrohm", "Adam Bomb", "A final Course", "Air Factory", "Al Fakher", "Alien Vape", "Bad Drip Labs", "Bazooka", "BB Tank",
  "Cali Alternatives", "Candy King", "CCELL", "Dab Rite", "Delta Extrax", "Dinner Lady", "Drip More", "Dotmod","Efest",'EHPro','ELEAF','ELEAF','Elysian','Enou','Fair Grounds','Fire Disposables','Flawless','Flum'
  // ⬆️ Add full brand list here...
];

export default function BrandsList() {
  const [searchTerm, setSearchTerm] = useState('');

  // تصفية الماركات حسب البحث
  const filteredBrands = brands
    .filter(brand => brand.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort();

  // تجميع الماركات تحت الحروف الأبجدية
  const groupedBrands = filteredBrands.reduce((acc, brand) => {
    const firstLetter = brand[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(brand);
    return acc;
  }, {});

  // توليد الحروف من A إلى Z
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  const handleAddToCart = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
      toast.success(`${product.name} added to cart! 🛒`);
    }, 800); // محاكاة تحميل بسيط
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <h2 className="text-2xl font-bold text-center mb-4">Brands We Carry</h2>
      <p className="text-left mb-6 text-gray-300">
       The vape community has garnered hundreds of phenomenal e-cigarettes brands. If you're looking for hardware brands that span across the globe, we've got you covered with e-cigarette companies like GeekVape, SMOK, Voopoo and more. Need a change of pace with a vape juice brand that hits your flavor palette just how you like? Browse below through our hundreds of e-liquid brands with favorites like Reds, BLVK, Bad Drip, Naked, and more!

      </p>

      {/* 🔍 مربع البحث */}
      <div className="mb-6 flex justify-start">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 w-full max-w-md rounded border bg-black border-gray-500 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 🅰️ 🅱️ تصنيف بالحروف */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
        {alphabet.map(letter => (
          <div key={letter}>
            <h3 className="text-lg text-left font-bold border-b border-gray-700 mb-2">{letter}</h3>
            <ul className="space-y-1">
              {groupedBrands[letter]?.map((brand, index) => (
                <li key={index} className="text-sm text-left">{brand}</li>
              )) || (
                <li className="text-sm text-gray-600 italic">No brands</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
