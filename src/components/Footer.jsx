// import { SiFacebook } from "react-icons/si";
// import { FaXTwitter } from "react-icons/fa6";
// import { FiInstagram } from "react-icons/fi";
// import { FaTiktok } from "react-icons/fa";
// import React, { useState } from 'react';



// function Footer({ onClose }) {
//   return (

   
//     <>
//       <footer className="bg-gradient-to-r from-purple-500 to-purple-700 py-10 px-5 md:px-10 flex flex-col md:flex-row justify-between">
//         <div className="flex items-center justify-center md:justify-start mb-5 md:mb-0">
//           <p className="text-3xl font-bold text-white">Food Ordering App</p>
//         </div>
//         <div className="text-center md:text-left mb-5 md:mb-0">
//           <h1 className="text-xl font-bold text-white mb-2">Useful Links</h1>
//           <ul className="space-y-1">
//             <li>
//               <a className="text-white hover:text-gray-200 transition-colors duration-300" href="/">Home</a>
//             </li>
//             <li>
//               <a className="text-white hover:text-gray-200 transition-colors duration-300" href="#">Contact</a>
       
//             </li>
//             <li>
//               <a className="text-white hover:text-gray-200 transition-colors duration-300" href="#">Privacy Policy</a>
//             </li>
//             <li>
//               <a className="text-white hover:text-gray-200 transition-colors duration-300" href="#">Terms And Conditions</a>
//             </li>
//           </ul>
//         </div>
//         <div className="text-center md:text-left">
//           <h1 className="text-xl font-bold text-white mb-2">Follow Us</h1>
//           <div className="flex justify-center md:justify-start gap-6 text-white">
//             <a href="#" className="text-2xl hover:text-gray-200 transition-colors duration-300">
//               <SiFacebook />
//             </a>
//             <a href="#" className="text-2xl hover:text-gray-200 transition-colors duration-300">
//               <FaXTwitter />
//             </a>
//             <a href="#" className="text-2xl hover:text-gray-200 transition-colors duration-300">
//               <FiInstagram />
//             </a>
//             <a href="#" className="text-2xl hover:text-gray-200 transition-colors duration-300">
//               <FaTiktok />
//             </a>
//           </div>
//         </div>
//       </footer>
//       <div className="bg-black text-white text-center py-2">
//         <p className="text-sm">&copy; {new Date().getFullYear()} ABIBIZ RESTAURANT | All Rights Reserved</p>
//       </div>
//     </>
//   );
// }

// export default Footer;


import { SiFacebook } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";
import React, { useState } from 'react';

// Contact Form Component
const ContactForm = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here
    console.log('Form submitted:', formData);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="border rounded-md p-2 w-full mb-4"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="border rounded-md p-2 w-full mb-4"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="border rounded-md p-2 w-full mb-4"
          rows="4"
          required
        />
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded w-full">
          Send Message
        </button>
        <button type="button" className="mt-2 text-red-500" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

function Footer() {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <>
      <footer className="bg-gradient-to-r from-purple-500 to-purple-700 py-10 px-5 md:px-10 flex flex-col md:flex-row justify-between">
        <div className="flex items-center justify-center md:justify-start mb-5 md:mb-0">
          <p className="text-3xl font-bold text-white">Food Courier's</p>
        </div>
        <div className="text-center md:text-left mb-5 md:mb-0">
          <h1 className="text-xl font-bold text-white mb-2">Useful Links</h1>
          <ul className="space-y-1">
            <li>
              <a className="text-white hover:text-gray-200 transition-colors duration-300" href="/">Home</a>
            </li>
            <li>
              <a
                className="text-white hover:text-gray-200 transition-colors duration-300 cursor-pointer"
                onClick={() => setShowContactForm(true)}
              >
                Contact
              </a>
            </li>
            <li>
              <a className="text-white hover:text-gray-200 transition-colors duration-300" href="#">Privacy Policy</a>
            </li>
            <li>
              <a className="text-white hover:text-gray-200 transition-colors duration-300" href="#">Terms And Conditions</a>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-xl font-bold text-white mb-2">Follow Us</h1>
          <div className="flex justify-center md:justify-start gap-6 text-white">
            <a href="#" className="text-2xl hover:text-gray-200 transition-colors duration-300">
              <SiFacebook />
            </a>
            <a href="#" className="text-2xl hover:text-gray-200 transition-colors duration-300">
              <FaXTwitter />
            </a>
            <a href="#" className="text-2xl hover:text-gray-200 transition-colors duration-300">
              <FiInstagram />
            </a>
            <a href="#" className="text-2xl hover:text-gray-200 transition-colors duration-300">
              <FaTiktok />
            </a>
          </div>
        </div>
      </footer>
      <div className="bg-black text-white text-center py-2">
        <p className="text-sm">&copy; {new Date().getFullYear()} FOOD COURIER'S | All Rights Reserved</p>
      </div>

      {/* Render the Contact Form Modal */}
      {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
    </>
  );
}

export default Footer;

