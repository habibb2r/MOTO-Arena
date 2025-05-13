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
  // console.log("singleProduct", singleProduct);

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
    <section className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Product Images Section */}
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                src={selectedImage || singleProduct?.data?.photo}
                alt={singleProduct?.data?.name}
                className="w-full h-[400px] object-contain rounded-xl"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ${
                    selectedImage === image 
                      ? "ring-2 ring-orange-500 shadow-orange-100" 
                      : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`${singleProduct?.data?.name} view ${index + 1}`}
                    className="w-full h-16 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {singleProduct?.data?.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-orange-600">
                  ${singleProduct?.data?.price}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  singleProduct?.data?.quantity > 0 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {singleProduct?.data?.quantity > 0 ? 'In Stock' : "Out of Stock"}
                </span>
              </div>

              <div className="space-y-4 divide-y divide-gray-100">
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600 font-medium">Brand</span>
                  <span className="text-gray-800 font-semibold">{singleProduct?.data?.brand}</span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600 font-medium">Category</span>
                  <span className="text-gray-800 font-semibold">{singleProduct?.data?.category}</span>
                </div>

                <div className="py-3">
                  <span className="text-gray-600 font-medium block mb-2">Description</span>
                  <p className="text-gray-700 leading-relaxed">
                    {singleProduct?.data?.description}
                  </p>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600 font-medium">Available Stock</span>
                  <span className="text-gray-800 font-semibold">
                    {singleProduct?.data?.quantity}
                  </span>
                </div>
              </div>

              {/* Purchase Controls */}
              {user && user !== null ? (
                <div className="mt-8 flex items-center gap-4">
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
                      onClick={() => quantity < singleProduct?.data?.quantity && setQuantity(quantity + 1)}
                      disabled={quantity >= singleProduct?.data?.quantity}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>

                  <Button
                    type="primary"
                    onClick={handleBooking}
                    disabled={!singleProduct?.data?.inStock || singleProduct?.data?.quantity < 1}
                    className="flex-1 !bg-orange-500 hover:!bg-orange-600 !h-12 !text-lg !font-medium !rounded-lg"
                  >
                    Purchase Now
                  </Button>
                </div>
              ) : (
                <div className="mt-8">
                  <Link to="/login" className="block">
                    <Button
                      type="primary"
                      className="w-full !bg-orange-500 hover:!bg-orange-600 !h-12 !text-lg !font-medium !rounded-lg"
                    >
                      Login to Purchase
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      <Modal
        centered
        open={openResponsive}
        onCancel={() => setOpenResponsive(false)}
        footer={null}
        width={800}
        className="!rounded-2xl"
      >
        <Elements stripe={stripePromise}>
          <CheckoutForm
            setOpenResponsive={setOpenResponsive}
            setOpenOnSeccess={setOpenOnSeccess}
            setOpenFailed={setOpenFailed}
            productInfo={singleProduct?.data}
            price={singleProduct?.data?.price * quantity}
            quantity={quantity}
            refetch={refetch}
          />
        </Elements>
      </Modal>

      {/* Success Modal */}
      <Modal
        centered
        open={openOnSeccess}
        onCancel={() => setOpenOnSeccess(false)}
        footer={null}
        width={500}
        className="!rounded-2xl"
      >
        <Result
          status="success"
          title="Payment Successful!"
          subTitle="Your order has been processed successfully."
          extra={[
            <Button
              type="primary"
              key="dashboard"
              onClick={() => navigate("/dashboard/user")}
              className="!bg-orange-500 hover:!bg-orange-600"
            >
              Go to Dashboard
            </Button>,
          ]}
        />
      </Modal>

      {/* Failed Modal */}
      <Modal
        centered
        open={openFailed}
        onCancel={() => setOpenFailed(false)}
        footer={null}
        width={500}
        className="!rounded-2xl"
      >
        <Result
          status="error"
          title="Payment Failed"
          subTitle="There was an error processing your payment. Please try again."
          extra={[
            <Button
              type="primary"
              key="retry"
              onClick={() => {
                setOpenFailed(false);
                setOpenResponsive(true);
              }}
              className="!bg-orange-500 hover:!bg-orange-600"
            >
              Try Again
            </Button>,
          ]}
        />
      </Modal>
    </section>
  );
};

export default ProductDetails;
