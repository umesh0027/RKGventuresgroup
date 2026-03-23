
import { useState } from "react";
import API from "../services/api";
import { toast } from "react-hot-toast";
function GetInTouch() {

    const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/contact", form);
      toast.success("Message sent successfully ✅");
      setForm({ name: "", email: "", message: "" });
    } catch {
       toast.error("Failed to send message ❌");
    }
  };
  return (
    <div className="bg-blue-100 py-16 px-6">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

        {/* LEFT INFO */}
        <div>

          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Get In Touch
          </h2>

          <p className="text-gray-600 mb-6">
            Have questions about our healthcare products? Reach out to us
            anytime — we’re here to help you with the best solutions.
          </p>

          <div className="space-y-4 text-gray-700">

            <p>📍 H No C-104, Laxmi park, Near Laxmi Mandir Nangloi , Delhi - 110041</p>
            <p>📞 +91 8368319749 , +91 8860543933 , +91 9315517506 </p>
            <p>✉️ rkgventuresgroup@gmail.com </p>

          </div>

          {/* WHATSAPP BUTTON */}
          <a
            href="https://wa.me/+918368319749"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-6 bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
          >
            <img
              src="https://img.icons8.com/color/24/whatsapp.png"
              alt=""
            />
            Chat on WhatsApp
          </a>

        </div>

        {/* RIGHT FORM */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="text-xl font-semibold mb-4">
            Send Message
          </h3>

          {/* <form className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-3 rounded"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-3 rounded"
            />

            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full border p-3 rounded"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
            >
              Send Message
            </button>

          </form> */}

           <form onSubmit={handleSubmit} className="space-y-4">

      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="w-full border p-3 rounded"
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        className="w-full border p-3 rounded"
      />

      <textarea
        placeholder="Message"
        value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
        className="w-full border p-3 rounded"
      />

      <button className="bg-blue-600 hover:bg-blue-800 text-white px-5 py-2 rounded">
        Send Message
      </button>

    </form>

        </div>

      </div>

    </div>
  );
}

export default GetInTouch;
