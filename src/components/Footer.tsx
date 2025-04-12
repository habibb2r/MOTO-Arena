import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { FaSquareFacebook, FaTwitter, FaInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
      className="bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div variants={item} className="space-y-6">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={logo}
              alt="Moto Arena Logo"
              className="h-12"
            />
            <p className="text-gray-600 max-w-xs">
              Your trusted destination for premium bikes & accessories.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: FaSquareFacebook, color: "text-blue-600" },
                { Icon: FaTwitter, color: "text-sky-400" },
                { Icon: FaInstagram, color: "text-pink-600" },
                { Icon: IoLogoYoutube, color: "text-red-600" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className={`${social.color} hover:opacity-80 transition-opacity`}
                >
                  <social.Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={item} className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-4">
              {["About Us", "All Products", "Contact Us"].map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={item} className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Services</h3>
            <ul className="space-y-4">
              {["Parts", "Cleaning", "Servicing"].map((service, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    {service}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={item} className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Newsletter</h3>
            <p className="text-gray-600">
              Subscribe to get the latest news and offers.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={item}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Moto Arena. All rights reserved. Made
            with ❤️ by HABIBB2R
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
