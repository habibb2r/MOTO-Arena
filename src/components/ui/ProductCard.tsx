import { EyeFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ProductCardProps {
  name: string;
  category: string;
  brand: string;
  price: number;
  quantity: number;
  photoURL: string;
  url: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  category,
  brand,
  price,
  quantity,
  photoURL,
  url,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-300 overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative group h-56 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          src={photoURL}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              quantity> 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {quantity> 0 ?  "In Stock" : "Out of Stock"}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <Tooltip title={name}>
            <h2 className="text-xl font-bold text-gray-800 truncate hover:text-orange-500 transition-colors">
              {name}
            </h2>
          </Tooltip>

          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-600">
              {category}
            </span>
            <span className="px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-600">
              {brand}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-orange-500">
            ${price.toLocaleString()}
          </div>

          <Link
            to={url}
            className="group flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-all duration-300"
          >
            <span>View</span>
            <EyeFilled className="group-hover:scale-110 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
