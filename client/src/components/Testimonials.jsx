import { useState, useEffect } from "react";

const reviews = [
  {
    name: "Dr. Sharma",
    role: "Orthopedic Specialist",
    text: "Excellent quality products. Highly reliable and durable for medical use.",
  },
  {
    name: "Amit Verma",
    role: "Hospital Supplier",
    text: "Best pricing and wide range of products. Highly recommended.",
  },
  {
    name: "Dr. Neha Gupta",
    role: "Surgeon",
    text: "Precision and quality is top-notch. Great experience working with them.",
  },
  {
    name: "Rahul Medical Store",
    role: "Retailer",
    text: "Fast delivery and genuine products. My go-to supplier.",
  }
];

function Testimonials() {
  const [index, setIndex] = useState(0);

  // 🔥 Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 py-16 px-6">

      <h2 className="text-4xl font-bold text-center text-blue-600 mb-10">
        What Our Clients Say 💬
      </h2>

      {/* MAIN CARD */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center transition duration-500">

        <p className="text-gray-600 text-lg mb-6 italic">
          “{reviews[index].text}”
        </p>

        <h3 className="text-xl font-bold text-gray-800">
          {reviews[index].name}
        </h3>

        <p className="text-sm text-gray-500">
          {reviews[index].role}
        </p>

        {/* ⭐ STARS */}
        <div className="flex justify-center mt-4 text-yellow-400 text-xl">
          ★★★★★
        </div>

      </div>

      {/* DOTS */}
      <div className="flex justify-center mt-6 gap-2">
        {reviews.map((_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-full ${
              i === index ? "bg-blue-600" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

    </div>
  );
}

export default Testimonials;