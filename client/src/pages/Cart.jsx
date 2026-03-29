import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Cart() {
  const { cart, removeFromCart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4 md:p-10">

        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-600 text-center md:text-left">
          Your Cart 🛒
        </h2>

        {/* EMPTY */}
        {cart.length === 0 && (
          <div className="text-center py-20 bg-white rounded shadow">
            <h3 className="text-lg text-gray-600">
              Your cart is empty 😕
            </h3>

            <button
              onClick={() => navigate("/products")}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Browse Products
            </button>
          </div>
        )}

        {/* ITEMS */}
        {cart.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-6">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-4">

              {cart.map(item => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow hover:shadow-md transition"
                >

                  {/* IMAGE */}
                  <img
                    src={item.images?.[0] || "https://via.placeholder.com/100"}
                    alt=""
                    className="h-24 w-24 object-cover rounded mx-auto sm:mx-0"
                  />

                  {/* DETAILS */}
                  <div className="flex-1 text-center sm:text-left">

                    <h3 className="font-semibold text-lg">
                      {item.name}
                    </h3>

                    <p className="text-blue-600 font-semibold">
                      ₹{item.price}
                    </p>

                    {/* QTY CONTROL */}
                    <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">

                      <button
                        onClick={() => addToCart(item, -1)}
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        -
                      </button>

                      <span className="font-semibold">
                        {item.qty}
                      </span>

                      <button
                        onClick={() => addToCart(item, 1)}
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        +
                      </button>

                    </div>

                  </div>

                  {/* RIGHT ACTION */}
                  <div className="flex flex-col justify-between items-center sm:items-end">

                    <p className="text-green-600 font-bold">
                      ₹{item.price * item.qty}
                    </p>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:underline text-sm mt-2"
                    >
                      Remove
                    </button>

                  </div>

                </div>
              ))}

            </div>

            {/* RIGHT SUMMARY */}
            <div className="bg-white p-6 rounded-xl shadow h-fit sticky top-6">

              <h3 className="text-xl font-semibold mb-4">
                Order Summary
              </h3>

              <div className="flex justify-between mb-2 text-sm">
                <span>Total Items</span>
                <span>
                  {cart.reduce((acc, i) => acc + i.qty, 0)}
                </span>
              </div>

              <div className="flex justify-between mb-4 text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-600">
                  ₹{total}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Proceed to Checkout →
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
