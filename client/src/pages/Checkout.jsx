




import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Footer from "../components/Footer";

function Checkout() {
  const { cart } = useContext(CartContext);

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  const phone = "+918368319749"; // 👉 +91 format
  const whatsappLink = `https://wa.me/${phone}`;

  return (
    <>
      <div className="p-6 md:p-10 max-w-4xl mx-auto min-h-screen">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Checkout 🧾
        </h2>

        {/* 🛒 ORDER SUMMARY */}
        <div className="bg-white p-5 rounded shadow mb-6">
          <h3 className="font-bold mb-4 text-lg">Order Summary</h3>

          {cart.map(item => (
            <div
              key={item._id}
              className="flex justify-between text-sm mb-2"
            >
              <span>
                {item.name} × {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <hr className="my-3" />

          <h3 className="font-bold text-blue-600 text-lg">
            Total: ₹{total}
          </h3>
        </div>

        {/* 📞 CONTACT SECTION */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl text-center shadow">

          <h3 className="text-xl font-bold text-blue-700 mb-3">
            Bulk Order / Purchase Inquiry 📦
          </h3>

          <p className="text-red-500 mb-5 font-bold">
            Aap apne bulk order ke liye niche diye gaye number par
            WhatsApp ya call kar sakte hain. Hamari team aapko best
            pricing aur support provide karegi.
          </p>
          <p className="text-lg font-semibold text-blue-600 mb-6">
            connect with Rohit
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4">

            {/* WHATSAPP */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              <img
                src="https://img.icons8.com/color/24/whatsapp.png"
                alt=""
              />
              WhatsApp Us
            </a>

            {/* CALL */}
            <a
              href="tel:+918368319749"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              📞 Call Now
            </a>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Checkout;
