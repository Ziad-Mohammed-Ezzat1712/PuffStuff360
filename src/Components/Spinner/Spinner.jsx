// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

export default function Spinner() {
  const [spinner, setSpinner] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  // ================= FETCH ACTIVE SPINNER =================
  useEffect(() => {
    axios
      .get(
        `https://dashboard.splash-e-liquid.com/spinner/getActiveSpinnerForUser.php?nocache=${Date.now()}`
      )
      .then((res) => {
        if (res.data.status) {
          setSpinner(res.data.data);
          setTimeout(() => setShow(true), 500);
        }
      });
  }, []);

  if (!spinner || !show) return null;

  const segments = spinner.segments;
  const segmentAngle = 360 / segments.length;

  const colors = ["#b91c1c", "#dc2626", "#ef4444", "#f87171", "#fb7185"];

  // ================= SPIN (API BASED) =================
  const spinWheel = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    if (spinning) return;
    setSpinning(true);

    try {
      const res = await axios.post(
        `https://dashboard.splash-e-liquid.com/spinner/spinSpinner.php?spinner_id=${spinner.id}`,
        { email }
      );

      if (!res.data.status) {
        alert(res.data.message || "Spin failed");
        setSpinning(false);
        return;
      }

      const result = res.data.data;

      const winningIndex = segments.findIndex(
        (s) => s.id === result.segment_id
      );

      if (winningIndex === -1) {
        alert("Invalid spinner result");
        setSpinning(false);
        return;
      }

      const stopAngle =
        360 * 5 +
        (360 - winningIndex * segmentAngle - segmentAngle / 2);

      setRotation(stopAngle);

      setTimeout(() => {
        setSpinning(false);
        alert(`🎉 You won: ${result.label}`);
        setShow(false);
      }, 5000);
    } catch (err) {
      alert("Something went wrong");
      setSpinning(false);
    }
  };

  // ================= GRADIENT =================
  const gradient = segments
    .map((_, i) => {
      const start = i * segmentAngle;
      const end = start + segmentAngle;
      return `${colors[i % colors.length]} ${start}deg ${end}deg`;
    })
    .join(", ");

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" />

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="relative bg-[#f5eaea] rounded-2xl shadow-2xl max-w-4xl w-full p-10 flex gap-10">

          {/* ❌ CLOSE BUTTON */}
          <button
            onClick={() => setShow(false)}
            className="absolute top-4 right-4 bg-white hover:bg-gray-100 rounded-full p-2 shadow transition"
          >
            <X size={20} />
          </button>

          {/* ===== WHEEL ===== */}
          <div className="relative flex justify-center items-center">
            <div
              className="absolute -top-4 z-20 w-0 h-0 
              border-l-[12px] border-r-[12px] border-b-[24px]
              border-l-transparent border-r-transparent border-b-white"
            />

            <div
              className="relative w-72 h-72 rounded-full border-[8px] border-white"
              style={{
                background: `conic-gradient(${gradient})`,
                transform: `rotate(${rotation}deg)`,
                transition: spinning
                  ? "transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                  : "none",
              }}
            >
              {segments.map((seg, i) => (
                <div
                  key={seg.id}
                  className="absolute text-xs font-bold text-white"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `
                      rotate(${i * segmentAngle + segmentAngle / 2}deg)
                      translateY(-115px)
                      rotate(-90deg)
                      translateX(-50%)
                    `,
                    whiteSpace: "nowrap",
                  }}
                >
                  {seg.label}
                </div>
              ))}

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xs shadow">
                  SPIN<br />&<br />WIN
                </div>
              </div>
            </div>
          </div>

          {/* ===== CONTENT ===== */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-3">
              Your Special Bonus Offer <br /> Has Been Unlocked!
            </h2>

            <p className="text-gray-600 mb-6">
              Enter your email for a chance to spin the wheel and win exclusive discounts!
            </p>

            <input
              type="email"
              placeholder="Enter your email here..."
              className="border p-3 rounded mb-4 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={spinWheel}
              disabled={spinning}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white py-3 rounded font-semibold transition"
            >
              {spinning ? "Spinning..." : "Try Your Luck!"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
