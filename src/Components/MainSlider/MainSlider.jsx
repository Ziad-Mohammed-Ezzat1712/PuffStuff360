import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slid1 from '../../../images/slid1.png'
import slid2 from '../../../images/slid2.png'
import slid3 from '../../../images/slid3.png'
import slid4 from '../../../images/slid4.png'
import slid5 from '../../../images/slid5.png'
import slid6 from '../../../images/slid6.png'

export default function MainSlider() {
  const [showPopup, setShowPopup] = useState(false);

  const sliderImages = [
   slid1,
   slid2,
   slid3,
   slid4,
   slid5,
   slid6,

  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    const isVerified = localStorage.getItem('ageVerified');
    if (!isVerified) {
      setShowPopup(true);
    }
  }, []);

  const handleOver21 = () => {
    localStorage.setItem('ageVerified', 'true');
    setShowPopup(false);
  };

  const handleUnder21 = () => {
    alert('You must be over 21 to access this website.');
    window.location.href = 'https://www.google.com';
  };

  const handleAddToCart = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
      toast.success(`${product.name} added to cart! 🛒`);
    }, 800); // محاكاة تحميل بسيط
  };

  return (
    <>
      {/* ✅ Age Verification Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-black text-white p-8 rounded-lg text-center max-w-md w-[90%] border border-red-600">
            <h2 className="text-2xl font-bold mb-4">AGE VERIFICATION</h2>
            <img src="/logo.png" alt="Logo" className="mx-auto mb-4 w-24 h-auto" />
            <p className="mb-4 text-sm leading-relaxed">
              MUST BE OVER 21 YEARS OR OLDER<br /><br />
              The products available on this site are age-restricted and intended for adults of legal smoking age only.
              All orders will be verified by an industry leading Age Verification software for validation.
            </p>
            <div className="flex justify-center items-center gap-6">
              <button
                onClick={handleUnder21}
                className="bg-black border border-red-500 px-4 py-2 rounded text-red-500 hover:bg-red-600 hover:text-white transition"
              >
                I am not 21 !
              </button>
              <button
                onClick={handleOver21}
                className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 transition"
              >
                I am over 21
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Main Slider */}
      <div className="w-full flex justify-center mb-10 px-4 overflow-hidden">
        <div className="w-full max-w-8xl">
          <Slider {...settings}>
            {sliderImages.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`slide-${index}`}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[585.8px] object-cover rounded-md"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
