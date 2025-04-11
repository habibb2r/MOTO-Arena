import { EyeFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {

  name: string;
  category: string;
  brand: string;
  price: number;
  inStock: boolean;
  photoURL: string;
  url: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  category,
  brand,
  price,
  inStock,
  photoURL,
  url
}) => {
  return (
    <div className="relative group  rounded-lg shadow-xl shadow-green-400 overflow-hidden border-2 border-transparent hover:border-gradient transition-all duration-100">
      <div className="relative p-6 rounded-lg">

        <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
          <img
            src={photoURL}
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <Tooltip title={name} >
          <h2 className="text-lg font-bold text-gray-800 mb-2 truncate">{name}</h2>
        </Tooltip>
       
        <p className="text-sm  mb-1 font-semibold">
          <span className="font-semibold">Category:</span> {category}
        </p>
        <p className="text-sm  mb-1 font-semibold">
          <span className="font-semibold">Brand:</span> {brand}
        </p>
        <p className="text-sm  mb-4 font-semibold">
          <span className="font-semibold">Price:</span> ${price.toLocaleString()}
        </p>
        <div className='flex justify-between p-1 items-center'>
          <div>
            <Link className='px-3 py-2 rounded-full border-none bg-green-700 text-white text-sm' to={url}>
            View Details <EyeFilled/>
            </Link>
          </div>
          <div
            className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${inStock ? 'bg-white text-green-700' : 'bg-red-100 text-red-700'
              }`}
          >
            {inStock ? 'Available' : 'Out of Stock'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;