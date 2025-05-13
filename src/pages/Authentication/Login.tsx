import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaMotorcycle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hooks";
import { verifyToken } from "../../redux/utils/verifyToken";
import { setToken } from "../../redux/features/auth/authSlice";
import { motion } from "framer-motion";

interface TUser {
  name: string;
  email: string;
  role: string;
  photoURL: string;
}

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    user: TUser;
  };
  message?: string;
}

interface ApiError {
  data?: {
    message: string;
  };
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormValues> = async (userData) => {
    try {
      const result = (await login(userData).unwrap()) as LoginResponse;

      const user = verifyToken(result.data.accessToken) as TUser;
      if (result.success) {
        toast.success("Login Successfully..", {
          duration: 2000,
        });
      }
      dispatch(
        setToken({
          token: result.data.accessToken,
          user: { ...user, ...result.data.user },
        })
      );
      navigate("/");
    } catch (error: unknown) {
      const apiError = error as ApiError;
      // console.log("error =>", apiError);
      toast.error(apiError?.data?.message || "Login failed", {
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Demo Credentials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-orange-100 h-fit"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="flex justify-center"
              >
               
              </motion.div>
              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                Demo Credentials
              </h2>
            </div>

            <div className="space-y-6">
              {/* Admin Credentials */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Admin Login</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Email: habibb2r@admin.mail</p>
                    <button
                      onClick={() => copyToClipboard('habibb2r@admin.mail')}
                      className="text-orange-500 hover:text-orange-600 p-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Password: 1234Ha</p>
                    <button
                      onClick={() => copyToClipboard('1234Ha')}
                      className="text-orange-500 hover:text-orange-600 p-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* User Credentials */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">User Login</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Email: customer@mail.usm</p>
                    <button
                      onClick={() => copyToClipboard('customer@mail.usm')}
                      className="text-orange-500 hover:text-orange-600 p-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Password: 12345Aa</p>
                    <button
                      onClick={() => copyToClipboard('12345Aa')}
                      className="text-orange-500 hover:text-orange-600 p-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-orange-100"
          >
            
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome Back!
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Please sign in to your account
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5" />
                      ) : (
                        <FaEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                >
                  Sign In
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
