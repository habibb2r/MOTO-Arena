import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // To navigate to the all products page
import { useGetAllProductsQuery } from "../../redux/features/products/productApi"; // Assuming RTK Query

import { TProduct } from "../../redux/types/product";
import Title from "./Title";
import ProductCard from "../ui/ProductCard";

const FeatureSection = () => {
  const [featuredProducts, setFeaturedProducts] = useState<TProduct[]>([]);

  const { data, isLoading, error } = useGetAllProductsQuery({});

  useEffect(() => {
    if (data && data.data) {
      setFeaturedProducts(data.data.slice(0, 3));
    }
  }, [data]);

  return (
    <section className="px-14 py-20">
      <Title
        title={"Featured Products"}
        subtitle={"Check out our featured products"}
      ></Title>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="">Error fetching products.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard
                key={product?._id}
                name={product?.name}
                category={product?.category}
                brand={product?.brand}
                price={product?.price}
                inStock={product?.inStock}
                photoURL={product?.photo as string}
                url={`/products/${product?._id}`}
              />
            ))
          ) : (
            <div className="text-center">No featured products available.</div>
          )}
        </div>
      )}

      <div className="text-center mt-6 pt-8 flex justify-center items-center">
        <Link
          to={`/products`}
          className="group flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-all duration-300"
        >
          View More
        </Link>
      </div>
    </section>
  );
};

export default FeatureSection;
