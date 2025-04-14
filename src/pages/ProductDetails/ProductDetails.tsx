import { Button, Modal, Result, Skeleton } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CheckoutForm from "../../components/ui/CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAppSelector } from "../../redux/hooks";
import { useGetSingleProductQuery } from "../../redux/features/products/productApi";
import { toast } from "sonner";

const ProductDetails = () => {
  const productIdDb = useParams();
  const [openResponsive, setOpenResponsive] = useState(false);
  const [openOnSeccess, setOpenOnSeccess] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState("");

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SECRET);

  const {
    data: singleProduct,
    isLoading,
    refetch,
  } = useGetSingleProductQuery({ id: productIdDb?.id });
  console.log("singleProduct", singleProduct);

  const productImages =
    singleProduct?.data?.photoCollection?.filter(Boolean) ||
    [
      singleProduct?.data?.photo,
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39",
      "https://images.unsplash.com/photo-1558981359-219d6364c9c8",
      "https://images.unsplash.com/photo-1558980664-769d59546b3d",
    ].filter(Boolean);

  useEffect(() => {
    if (singleProduct?.data?.photo) {
      setSelectedImage(singleProduct.data.photo);
    }
  }, [singleProduct]);

  const handleBooking = () => {
    if(user?.role === "admin"){
      return toast.error("Admin cannot purchase product");
    }else{
      setOpenResponsive(!openResponsive);
    }
   
  };

  if (isLoading || !singleProduct) {
    return (
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <Skeleton.Image className="w-full h-[500px] rounded-2xl" />
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <Skeleton
                  active
                  title={{ width: "80%" }}
                  paragraph={{
                    rows: 6,
                    width: ["100%", "90%", "85%", "95%", "80%", "75%"],
                  }}
                />
                <div className="mt-6">
                  <Skeleton.Button active size="large" block />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Product Name and Images */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              {singleProduct?.data?.name}
            </h1>

            {/* Main Image */}
            <div className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4">
              <img
                src={selectedImage || singleProduct?.data?.photo}
                alt="Bike Image"
                className="w-full h-[500px] object-contain rounded-xl"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ${
                    selectedImage === image ? "ring-2 ring-green-500" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-20 object-contain rounded"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Brand</span>
                  <span className="text-gray-800 font-semibold">
                    {singleProduct?.data?.brand}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Category</span>
                  <span className="text-gray-800 font-semibold">
                    {singleProduct?.data?.category}
                  </span>
                </div>

                <div className="py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Description</span>
                  <p className="mt-2 text-gray-700">
                    {singleProduct?.data?.description}
                  </p>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Price</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${singleProduct?.data?.price}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Status</span>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      singleProduct?.data?.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {singleProduct?.data?.inStock
                      ? "Available"
                      : "Out of Stock"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600 font-medium">Stock</span>
                  <span
                    className={`font-semibold ${
                      singleProduct?.data?.quantity > 0
                        ? "text-blue-600"
                        : "text-red-600"
                    }`}
                  >
                    {singleProduct?.data?.quantity > 0
                      ? singleProduct?.data?.quantity
                      : "Out of Stock"}
                  </span>
                </div>
              </div>

              {/* Purchase Controls */}
              {user && user !== null ? (
                <div className="mt-8 flex items-center gap-6">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg">
                    <button
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-gray-800 font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        quantity < singleProduct?.data?.quantity &&
                        setQuantity(quantity + 1)
                      }
                      disabled={quantity >= singleProduct?.data?.quantity}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>

                  <Button
                    type="primary"
                    onClick={handleBooking}
                    disabled={
                      !singleProduct?.data?.inStock ||
                      singleProduct?.data?.quantity < 1 
                    }
                    className="bg-green-600 hover:bg-green-700 h-full py-2 px-8 text-lg"
                  >
                    Buy Now
                  </Button>
                </div>
              ) : (
                <div className="mt-8">
                  {singleProduct?.data?.quantity < 1 ? (
                    <Button
                      type="primary"
                      disabled
                      className="w-full h-12 text-lg"
                    >
                      Out of Stock
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      onClick={() => navigate("/login")}
                      className="w-full h-12 text-lg bg-green-600 hover:bg-green-700"
                    >
                      Please Login to Purchase
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Confirm Payment"
        centered
        open={openResponsive}
        footer={null}
        onCancel={() => setOpenResponsive(false)}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <Elements stripe={stripePromise}>
          <CheckoutForm
            refetch={refetch}
            productName={singleProduct?.data.name}
            productId={singleProduct?.data._id} //TODO
            price={singleProduct?.data.price}
            quantity={quantity}
            setOpenOnSeccess={setOpenOnSeccess}
            setOpenFailed={setOpenFailed}
            setOpenResponsive={setOpenResponsive}
          />
        </Elements>
      </Modal>
      <Modal
        centered
        open={openOnSeccess}
        footer={null}
        onCancel={() => setOpenOnSeccess(false)}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <Result
          status="success"
          title="Payment Successfully"
          subTitle="Thank you for your purchase! Track order in your dashboard"
          extra={[
            <Link to={"/products"} 
              className="bg-green-600 hover:bg-green-700 px-3 py-2 text-white rounded-md"
            >
              View all products
            </Link>,
            <Link
              to={"/dashboard/customer/my-orders"}
              className="border-green-600 text-orange-600 hover:bg-green-50 px-3 py-2 rounded-md"
            >
              Track Order
            </Link>,
          ]}
        />
      </Modal>
      <Modal
        title="Payment Failed"
        centered
        open={openFailed}
        footer={null}
        onCancel={() => setOpenFailed(false)}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <Result
          status="warning"
          title="Your payment has been failed. Contact with us for more information"
          extra={
            <Button type="primary" key="console">
              Contact with us
            </Button>
          }
        />
      </Modal>
    </section>
  );
};

export default ProductDetails;
