

import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Cart() {
  const { cart, removeFromCart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // ✅ TOTAL CALCULATION
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <>
      <div className="p-6 md:p-10 min-h-screen bg-gray-100">

        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-600">
          Your Cart 🛒
        </h2>

        {/* EMPTY CART */}
        {cart.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl text-gray-600">
              Your cart is empty 😕
            </h3>
          </div>
        )}

        {/* CART ITEMS */}
        {cart.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">

            {/* LEFT ITEMS */}
            <div className="md:col-span-2 space-y-4">

              {cart.map(item => (
                <div
                  key={item._id}
                  className="flex gap-4 bg-white p-4 rounded shadow items-center"
                >

                  {/* IMAGE */}
                  <img
                    src={item.images?.[0] || "https://via.placeholder.com/100"}
                    alt=""
                    className="h-20 w-20 object-cover rounded"
                  />

                  {/* DETAILS */}
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-blue-600">₹{item.price}</p>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-2 mt-2">

                      <button
                        onClick={() => addToCart(item, -1)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        -
                      </button>

                      <span>{item.qty}</span>

                      <button
                        onClick={() => addToCart(item, 1)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        +
                      </button>

                    </div>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>

                </div>
              ))}

            </div>

            {/* RIGHT SUMMARY */}
            <div className="bg-white p-6 rounded shadow h-fit">

              <h3 className="text-xl font-semibold mb-4">
                Order Summary
              </h3>

              <div className="flex justify-between mb-2">
                <span>Total Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Total Price</span>
                <span className="text-blue-600 font-bold">
                  ₹{total}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
              >
                Proceed to Checkout
              </button>

            </div>

          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default Cart;