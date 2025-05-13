import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // To navigate to the all products page
import { useGetAllProductsQuery } from "../../redux/features/products/productApi"; // Assuming RTK Query

import { TProduct } from "../../redux/types/product";
import Title from "./Title";
import ProductCard from "../ui/ProductCard";

const BikeParts = () => {
  const [bikeParts, setbikeParts] = useState<TProduct[]>([]);

  const { data, isLoading, error } = useGetAllProductsQuery({});

  useEffect(() => {
    if (data && data.data) {
        const filteredBikeParts = data.data.filter((product) => product.category === 'Parts');
      setbikeParts(filteredBikeParts.slice(0, 4));
    }
  }, [data]);

  return (
    <section className="px-14 py-20">
      <Title
        title={"Bike Parts"}
        subtitle={"Check out some of our bike parts!"}
      ></Title>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="">Error fetching products.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bikeParts.length > 0 ? (
            bikeParts.map((product) => (
              <ProductCard
                key={product?._id}
                name={product?.name}
                category={product?.category}
                brand={product?.brand}
                price={product?.price}
                quantity={product?.quantity ?? 0}
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

export default BikeParts;
