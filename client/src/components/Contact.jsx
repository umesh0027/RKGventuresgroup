import GetInTouch from "../components/GetInTouch";
import Footer from "./Footer";

function Contact() {
  return (
    <div className="bg-gray-50">

      {/* HERO */}
      <div className="bg-blue-100 text-gray-600 text-center py-16">
        <h1 className="text-4xl font-bold mb-2">
          Contact Us
        </h1>
        <p className="text-lg">
          We’re here to help you 24/7
        </p>
      </div>

      {/* CONTACT INFO CARDS */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">

        <div className="bg-gray-200 p-6 rounded-xl shadow text-center hover:shadow-lg transition">
          <div className="text-3xl mb-3">📍</div>
          <h3 className="font-semibold mb-2">Address</h3>
          <p className="text-blue-600 text-sm">
            H No C-104, Laxmi park, Near Laxmi Mandir Nangloi , Delhi - 110041
          </p>
        </div>

        <div className="bg-gray-200 p-6 rounded-xl shadow text-center hover:shadow-lg transition">
          <div className="text-3xl mb-3">📞</div>
          <h3 className="font-semibold mb-2">Phone</h3>
          <p className="text-blue-600 text-sm">
           +91 8368319749 , +91 8860543933 
          </p>
        </div>

        <div className="bg-gray-200 p-6 rounded-xl shadow text-center hover:shadow-lg transition">
          <div className="text-3xl mb-3">✉️</div>
          <h3 className="font-semibold mb-2">Email</h3>
          <p className="text-blue-600 text-sm">
            rkgventuresgroup@gmail.com
          </p>
        </div>

      </div>

      {/* GET IN TOUCH FORM */}
      <GetInTouch />

      {/* GOOGLE MAP */}
      <div className="max-w-7xl mx-auto px-6 pb-16 py-10">
        <h2 className="text-4xl font-bold mb-4 text-center text-blue-600 py-4">
          Our Location
        </h2>

        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.5390007596457!2d77.06418467529063!3d28.673518975642363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0448951b5e69%3A0x9e0f46d3f3be51e9!2sh%2C%20C-104%2C%20Laxmi%20Park%20Rd%2C%20near%20Laxmi%20Mandir%2C%20Near%20Defence%20foundation%20public%20School%2C%20Laxmi%20Park%2C%20Block%20B%2C%20Lakshmi%20Park%2C%20Nangloi%2C%20Delhi%2C%20110041!5e0!3m2!1sen!2sin!4v1774175936826!5m2!1sen!2sin"
            className="w-full h-full border-0"
            loading="lazy"
          ></iframe>
        </div>
      </div>


<Footer/>
    </div>
  );
}

export default Contact;