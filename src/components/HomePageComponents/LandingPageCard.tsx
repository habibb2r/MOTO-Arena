import explore from "../../assets/images/explore.png"; //

const LandingPageCard = () => {
    return (
        <div className="bg-orange-50 mx-[3%] rounded-xl shadow-lg shadow-green-500 px-[5%] py-[3%]">
      <h4 className="text-xl md:text-2xl font-medium text-orange-500 mb-4 md:mb-5 lg:mb-8 capitalize text-center">
              Discover the Latest Models -
            </h4>
        <div className="flex flex-col-reverse  md:flex-row lg:flex-row items-center justify-between px-10 py-26 gap-16 container mx-auto ">
          {/* Left Side - Large Text */}
          <div className="md:w-1/2 text-center lg:text-left">
            
            <h2 className="text-3xl lg:text-5xl font-extrabold text-orange-600 mb-4 md:mb-5 lg:mb-8 capitalize">
              Experience Innovation & Style with Our Bikes
            </h2>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-4 md:mb-5 lg:mb-8">
              Dive into our exclusive range of motorcycles, designed for both
              adventure and elegance. From cutting-edge technology to timeless
              designs, we have it all.
            </p>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 font-semibold transition-colors text-white px-6 py-3 rounded"
            >
              Explore Now
            </button>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src={explore}
              alt="Explore Our Bikes"
              className="rounded-2xl shadow-xl w-full max-w-4xl"
            />
          </div>
        </div>
      </div>
    );
};

export default LandingPageCard;