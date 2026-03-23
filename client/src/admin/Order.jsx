


import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    API.get("/orders").then(res => setOrders(res.data));
  };

  // 🔥 UPDATE ORDER STATUS (LIVE)
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, { orderStatus: status });

      // ✅ UPDATE UI WITHOUT REFRESH
      setOrders(prev =>
        prev.map(o =>
          o._id === id ? { ...o, orderStatus: status } : o
        )
      );

      toast.success("Order updated ✅");

    } catch (err) {
      toast.error("Update failed ❌");
    }
  };

  return (
    <div className="p-6 md:p-10">

      <h2 className="text-3xl font-bold mb-6 text-white">
        Orders Management 📦
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full bg-white rounded shadow">

          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Items</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Order Status</th>
              <th className="p-3">Address</th>
              <th className="p-3">Phone No.</th>


             
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(o => (
              <tr key={o._id} className="border-t">

                {/* USER */}
                <td className="p-3">
                  {o.user?.name || "N/A"}
                </td>

                {/* ITEMS */}
                <td className="p-3">
                  {o.items.reduce((acc, i) => acc + i.qty, 0)}
                </td>

                {/* AMOUNT */}
                <td className="p-3 text-blue-600 font-semibold">
                  ₹{o.totalAmount}
                </td>

                {/* PAYMENT */}
                <td className="p-3">
                  <span className={`px-2 py-1 text-white text-xs rounded ${
                    o.paymentStatus === "Paid"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}>
                    {o.paymentStatus}
                  </span>
                </td>

                {/* 🔥 STATUS DROPDOWN */}
                <td className="p-3">
                  <select
                    value={o.orderStatus}
                    onChange={(e) =>
                      updateStatus(o._id, e.target.value)
                    }
                    className="border p-1 rounded"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>

                {/* ADDRESS */}
                <td className="p-3 text-sm">
                  {o.shippingAddress}
                </td>

                {/* PHONE */}
                <td className="p-3 text-sm">
                  {o.phone}
                </td>

                {/* DATE */}
                <td className="p-3 text-sm">
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Orders;