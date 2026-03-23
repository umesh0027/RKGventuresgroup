



import { useEffect, useState } from "react";
import API from "../services/api";

function ContactMessages() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = () => {
    API.get("/contact").then(res => setMessages(res.data));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMsg = async (id) => {
    if (window.confirm("Delete this message?")) {
      await API.delete(`/contact/${id}`);
      setMessages(prev => prev.filter(m => m._id !== id));
    }
  };

  const toggleImportant = async (id) => {
    const res = await API.put(`/contact/${id}/important`);
    setMessages(prev =>
      prev.map(m => (m._id === id ? res.data : m))
    );
  };

  return (
    <div className="p-10">

      <h2 className="text-3xl font-bold mb-6 text-white text-center">
        Contact Messages
      </h2>

      <div className="space-y-4">

        {messages.map(msg => (
          <div
            key={msg._id}
            className={`p-5 rounded shadow ${
              msg.isImportant ? "bg-yellow-100 border-l-4 border-yellow-500" : "bg-white"
            }`}
          >

            <div className="flex justify-between items-center mb-2">

              <h3 className="font-bold">{msg.name}</h3>

              <div className="flex gap-4">

                {/* ⭐ IMPORTANT */}
                <button
                  onClick={() => toggleImportant(msg._id)}
                  className="text-yellow-500 text-2xl"
                >
                  {msg.isImportant ? "★" : "☆"}
                </button>

                {/* ✉️ REPLY */}
                <a
                  href={`mailto:${msg.email}?subject=Reply from RKG Ventures Group&body=Hello ${msg.name},`}
                  className="text-blue-500 text-xl text-semibold"
                >
                  Reply
                </a>

                {/* 🗑 DELETE */}
                <button
                  onClick={() => deleteMsg(msg._id)}
                  className="text-red-500 text-semibold text-xl"
                >
                  Delete
                </button>

              </div>

            </div>

            <p className="text-sm text-gray-500 mb-1">
              {msg.email}
            </p>

            <p className="text-gray-700">
              {msg.message}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              {new Date(msg.createdAt).toLocaleString()}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ContactMessages;