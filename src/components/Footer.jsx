import { SiFacebook } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className="bg-gradient-to-r from-purple-500 to-purple-700 py-10 px-5 md:px-10 flex flex-col md:flex-row justify-between">
        <div className="flex items-center justify-center md:justify-start mb-5 md:mb-0">
          <p className="text-3xl font-bold text-white">Food Ordering App</p>
        </div>
        <div className="text-center md:text-left mb-5 md:mb-0">
          <h1 className="text-xl font-bold text-white mb-2">Useful Links</h1>
          <ul className="space-y-1">
            <li>
              <a className="text-white hover:text-gray-200 transition-colors duration-300" href="#">Home</a>
            </li>
            <li>
              <a className="text-white hover:text-gray-200 transition-colors duration-300" href="#">Contact</a>
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
        <p className="text-sm">&copy; {new Date().getFullYear()} ABIBIZ RESTAURANT | All Rights Reserved</p>
      </div>
    </>
  );
}

export default Footer;
