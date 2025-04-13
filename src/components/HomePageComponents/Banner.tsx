import video from "../../assets/5052676-hd_1920_1080_30fps.mp4";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="relative w-full h-[100vh] overflow-hidden mt-[-3%]">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 object-cover w-full h-full"
      >
        <source src={video} type="video/mp4" />
      </video>

     
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl space-y-6"
        >
          <motion.h1
            initial={{ color: "#ffffff" }}
            animate={{
              color: ["#ffffff", "#ffa500", "#ffffff"],
              textShadow: [
                "0 0 20px rgba(255,165,0,0)",
                "0 0 20px rgba(255,165,0,0.5)",
                "0 0 20px rgba(255,165,0,0)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            Welcome to <br />
            <span className="text-orange-500">MOTO ARENA</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl"
          >
            Your trusted destination for premium bikes & accessories.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full 
                        font-semibold shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
            >
              Explore Now
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
