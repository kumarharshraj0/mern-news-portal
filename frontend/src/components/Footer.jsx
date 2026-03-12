import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 w-full text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold text-white">ZIVEK</h2>
          <p className="mt-4 text-sm leading-relaxed">
            Stay updated with the latest news, stories, and insights from around the globe.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaYoutube />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Pages</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">About us</Link></li>
            <li><Link to="/news" className="hover:text-white">News</Link></li>
            <li><Link to="/authors" className="hover:text-white">Authors</Link></li>
            <li><Link to="/subscriptions" className="hover:text-white">Newsletter Plans</Link></li>
            <li><Link to="/contact-us" className="hover:text-white">Contact us</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/news?category=health" className="hover:text-white">Health</Link></li>
            <li><Link to="/news?category=culture" className="hover:text-white">Culture</Link></li>
            <li><Link to="/news?category=sports" className="hover:text-white">Sports</Link></li>
            <li><Link to="/news?category=world-news" className="hover:text-white">World News</Link></li>
            <li><Link to="/news?category=business" className="hover:text-white">Business</Link></li>
            <li><Link to="/news?category=technology" className="hover:text-white">Technology</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/advertise" className="hover:text-white">Advertise</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link to="/license" className="hover:text-white">License</Link></li>
            <li><Link to="/changelog" className="hover:text-white">Changelog</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © 2025 Zivek. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
