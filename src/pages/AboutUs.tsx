import banner from "../assets/banner.png";
import Title from "../components/HomePageComponents/Title";
import { motion } from "framer-motion";
import {
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  TeamOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { Form, Input } from "antd";
import { toast } from "sonner";

export default function AboutUs() {
  const onFinish = () => {
    toast.success("Message sent successfully! We will get back to you soon.");
  };

  const features = [
    {
      icon: <TrophyOutlined className="text-4xl text-red-800" />,
      title: "Premium Quality",
      description:
        "We source only the finest motorcycles from renowned manufacturers worldwide.",
    },
    {
      icon: <TeamOutlined className="text-4xl text-red-800" />,
      title: "Expert Team",
      description:
        "Our passionate team of motorcycle enthusiasts provides expert guidance and support.",
    },
    {
      icon: <SafetyOutlined className="text-4xl text-red-800" />,
      title: "Safety First",
      description:
        "All our bikes undergo rigorous safety checks and maintenance inspections.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Title
        title="About Us"
        subtitle="Learn more about Moto Arena"
        variant="gradient"
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-center items-center gap-8 px-4 md:px-8 py-12"
      >
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 to-violet-700 bg-clip-text text-transparent">
            Welcome to Moto Arena Family
          </h1>
          <p className="text-xl md:text-2xl text-gray-700">
            Your trusted destination for premium bikes & accessories since 2010.
          </p>
        </div>
        <motion.div
          className="md:w-1/2"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={banner}
            alt="Moto Arena Showroom"
            className="rounded-2xl shadow-2xl"
          />
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {feature.icon}
                  <h3 className="text-xl font-bold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Founded in 2010, Moto Arena has grown from a small local shop
                  to one of the region's premier motorcycle dealerships. Our
                  journey began with a simple vision: to provide motorcycle
                  enthusiasts with not just bikes, but an entire riding
                  experience.
                </p>
                <p className="text-lg">
                  We pride ourselves on our extensive collection of motorcycles,
                  ranging from powerful sports bikes to comfortable cruisers and
                  versatile adventure bikes. Our inventory includes renowned
                  brands like Honda, Yamaha, Kawasaki, BMW, and Ducati.
                </p>
                <p className="text-lg">
                  What sets us apart is our commitment to customer satisfaction.
                  We don't just sell motorcycles; we build relationships. Our
                  team of experienced professionals is dedicated to helping you
                  find the perfect bike that matches your riding style and
                  preferences.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Our Services
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  New and Pre-owned Motorcycle Sales
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Professional Maintenance & Repairs
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Genuine Parts & Accessories
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Custom Bike Modifications
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Financing Options Available
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Visit Us
              </h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-center gap-4">
                  <EnvironmentOutlined className="text-2xl text-red-800" />
                  <p>123 Bike Street, Motorcycle City, MC 12345</p>
                </div>
                <div className="flex items-center gap-4">
                  <PhoneOutlined className="text-2xl text-red-800" />
                  <p>+1 (555) 123-4567</p>
                </div>
                <div className="flex items-center gap-4">
                  <ClockCircleOutlined className="text-2xl text-red-800" />
                  <div>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <Title
            title="Get In Touch"
            subtitle="We'd love to hear from you"
            variant="outlined"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Form
              name="contact"
              onFinish={onFinish}
              layout="vertical"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input
                    placeholder="Your Name"
                    className="p-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 hover:border-orange-500 transition-colors"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    placeholder="Your Email"
                    className="p-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 hover:border-orange-500 transition-colors"
                  />
                </Form.Item>
              </div>

              <Form.Item
                name="message"
                rules={[
                  { required: true, message: "Please input your message!" },
                ]}
              >
                <Input.TextArea
                  placeholder="Your Message"
                  rows={5}
                  className="p-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 hover:border-orange-500 transition-colors"
                />
              </Form.Item>

              <Form.Item>
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Send Message
                </button>
              </Form.Item>
            </Form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
