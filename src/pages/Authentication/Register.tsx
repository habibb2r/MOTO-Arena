import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  FaEye,
  FaEyeSlash,
  FaMotorcycle,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { useSignupMutation } from "../../redux/features/auth/authApi";
import { motion } from "framer-motion";
import GeneratePhotoURL from "../../components/UploadPhoto/GeneratePhotoURL";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  image: FileList;
}

interface RegisterResponse {
  success: boolean;
  message: string;
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<RegisterFormValues>();

  const [registerUser] = useSignupMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      setLoading(true);
      const image = data.image[0];
      const imageUrl = await GeneratePhotoURL(image)
      const userInfo = {
        ...data,
        photoURL : imageUrl,
      };

      console.log("userInfo", userInfo);
      const result = (await registerUser(
        userInfo
      ).unwrap()) as RegisterResponse;
      if (result.success) {
        toast.success("Registration Successfully..", {
          duration: 2000,
        });
        reset();
        setLoading(false);
        navigate("/login");
      }
    } catch (error: unknown) {
      const apiError = error as { data?: { message: string } };
      // console.log("error =>", apiError);
      toast.error(apiError?.data?.message || "Registration failed", {
        duration: 2000,
      });
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <RingLoader size={80} color="#f97316" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 pt-8 pb-6 bg-gradient-to-r from-orange-500 to-orange-600">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg"
            >
              <FaMotorcycle className="text-3xl text-orange-500" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-center text-white mt-4"
            >
              Get Started
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-white/80 mt-2"
            >
              Join the Moto Arena family and start your journey
            </motion.p>
          </div>

          <div className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    placeholder="Enter your name..."
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                      errors.name
                        ? "border-orange-500 focus:border-orange-600"
                        : "border-gray-200 focus:border-orange-500"
                    } focus:outline-none`}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-orange-500 text-sm mt-1"
                    >
                      {errors.name.message}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    placeholder="Enter your email..."
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                      errors.email
                        ? "border-orange-500 focus:border-orange-600"
                        : "border-gray-200 focus:border-orange-500"
                    } focus:outline-none`}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-orange-500 text-sm mt-1"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password..."
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                        errors.password
                          ? "border-orange-500 focus:border-orange-600"
                          : "border-gray-200 focus:border-orange-500"
                      } focus:outline-none`}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="w-5 h-5" />
                      ) : (
                        <FaEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-orange-500 text-sm mt-1"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Image
                  </label>
                  <div className="relative">
                    <input
                      {...register("image", {
                        required: "Profile image is required",
                      })}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="profile-image"
                    />
                    <label
                      htmlFor="profile-image"
                      className={`w-full px-4 py-3 rounded-lg border-2 border-dashed transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                        errors.image
                          ? "border-orange-500 hover:border-orange-600"
                          : "border-gray-200 hover:border-orange-500"
                      }`}
                    >
                      <FaCloudUploadAlt className="text-2xl text-gray-400" />
                      <span className="text-gray-500">
                        Choose a profile image
                      </span>
                    </label>
                  </div>
                  {errors.image && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-orange-500 text-sm mt-1"
                    >
                      {errors.image.message}
                    </motion.p>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg 
                           transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  Create Account
                </button>

                <p className="text-center mt-6 text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="text-orange-500 hover:text-orange-600 font-medium hover:underline transition-colors"
                  >
                    Sign In
                  </Link>
                </p>
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
