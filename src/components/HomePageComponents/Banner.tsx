import video from "../../assets/5052676-hd_1920_1080_30fps.mp4";
import { motion } from "framer-motion";
const Banner = () => {
  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 object-cover w-full h-full"
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="">
        <motion.h1
          initial={{ color: "#03dea0" }}
          animate={{ color: "#b4e602" }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="moto-heading"
        >
          Welcome to MOTO ARENA
        </motion.h1>

        <p className="moto-subtext">
          Your trusted destination for premium bikes & accessories.
        </p>
      </div>
    </div>
  );
};

export default Banner;
