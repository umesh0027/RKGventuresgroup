import { useEffect, useState } from "react";
import API from "../services/api";
import Footer from "../components/Footer";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders/my").then(res => setOrders(res.data));
  }, []);

  return (
    <>
      <div className="p-6 md:p-10 min-h-screen bg-gray-100">

        <h2 className="text-3xl font-bold mb-6 text-center">
          My Orders 📦
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">
            No orders yet 😕
          </p>
        ) : (
          <div className="space-y-6">

            {orders.map(o => (
              <div key={o._id} className="bg-white p-5 rounded shadow">

                {/* ITEMS */}
                <div className="mb-3">
                  {o.items.map((i, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{i.name} × {i.qty}</span>
                      <span>₹{i.price * i.qty}</span>
                    </div>
                  ))}
                </div>

                {/* TOTAL */}
                <p className="font-bold text-blue-600 mb-2">
                  Total: ₹{o.totalAmount}
                </p>

                {/* STATUS */}
                <div className="flex justify-between items-center text-sm">

                  <span className={`px-2 py-1 rounded text-white ${
                    o.orderStatus === "Delivered"
                      ? "bg-green-500"
                      : o.orderStatus === "Shipped"
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                  }`}>
                    {o.orderStatus}
                  </span>

                  <span className="text-gray-500">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default MyOrders;