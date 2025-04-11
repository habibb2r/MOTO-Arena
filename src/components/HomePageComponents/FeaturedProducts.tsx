import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom'; // To navigate to the all products page
import { useGetAllProductsQuery } from '../../redux/features/products/productApi'; // Assuming RTK Query
import ProductCard from '../ProductCard'; // Assuming you have a ProductCard component
import { TProduct } from '../../redux/types/product';
import Title from './Title';

const FeatureSection = () => {
  const [featuredProducts, setFeaturedProducts] = useState<TProduct[]>([]);


  // Fetch all products from the API
  const { data, isLoading, error } = useGetAllProductsQuery({});

  // Update the featured products once data is fetched
  useEffect(() => {
    if (data && data.data) {
      setFeaturedProducts(data.data.slice(0, 3)); // Get the first 3 products
    }
  }, [data]);

  return (
    <section className="px-14 py-20">
      <Title title={'Featured Products'} subtitle={'Check out our featured products'}></Title>

      {/* Check for loading or error */}
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="">Error fetching products.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="text-center">No featured products available.</div>
          )}
        </div>
      )}

      {/* View More Button */}
      <div className="text-center mt-6 pt-8">
      <Link to={`/products`} className="px-3 py-2 rounded-xl border-none bg-green-700 text-white text-sm hover:bg-green-800 transition duration-300">
            View More
          </Link>
      </div>
    </section>
  );
};

export default FeatureSection;
