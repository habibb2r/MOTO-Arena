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
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { Form, Input } from "antd";
import { toast } from "sonner";

export default function AboutUs() {
  const onFinish = () => {
    toast.success("Message sent successfully! We will get back to you soon.");
  };

  const features = [
    {
      icon: <TrophyOutlined className="text-4xl text-orange-500" />,
      title: "Premium Selection",
      description:
        "Curated collection of high-performance motorcycles from world-class manufacturers.",
    },
    {
      icon: <TeamOutlined className="text-4xl text-orange-500" />,
      title: "Expert Support",
      description:
        "Our dedicated team of motorcycle specialists ensures an unmatched buying experience.",
    },
    {
      icon: <SafetyOutlined className="text-4xl text-orange-500" />,
      title: "Quality Assured",
      description:
        "Every motorcycle undergoes comprehensive quality checks and certification process.",
    },
  ];

  const socialLinks = [
    {
      icon: <GithubOutlined />,
      url: "https://github.com/habibb2r",
      label: "GitHub",
    },
    {
      icon: <LinkedinOutlined />,
      url: "https://linkedin.com/in/habibb2r",
      label: "LinkedIn",
    },
    {
      icon: <TwitterOutlined />,
      url: "https://twitter.com/habibb2r",
      label: "Twitter",
    },
    {
      icon: <FacebookOutlined />,
      url: "https://facebook.com/habibb2r",
      label: "Facebook",
    },
  ];

  return (
    <div className="pt-[2%] bg-gray-50">
      <Title
        title="About Moto Arena"
        subtitle="Experience Excellence in Two Wheels"
        variant="gradient"
      />

    
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-center items-center gap-8 px-4 md:px-8 py-12 bg-white shadow-sm"
      >
        <div className=" text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Ride with Confidence
          </h1>
          <p className="text-xl md:text-2xl text-gray-700">
            Your premier destination for exceptional motorcycles and <br />
            unparalleled service since 2010.
          </p>
        </div>
        <motion.div
          className=""
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={banner}
            alt="Moto Arena Showroom"
            className="rounded-2xl shadow-2xl h-[350px]"
          />
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-orange-100"
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

    
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
                Our Journey
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Moto Arena represents a revolution in the motorcycle retail
                  industry. Established with the vision to provide motorcycle
                  enthusiasts with an exceptional buying experience, we've grown
                  to become a trusted name in the industry.
                </p>
                <p className="text-lg">
                  Our collection features carefully selected motorcycles from
                  prestigious manufacturers worldwide. From high-performance
                  sports bikes to comfortable cruisers and versatile adventure
                  bikes, we offer something for every rider.
                </p>
                <p className="text-lg">
                  What truly sets us apart is our dedication to customer
                  satisfaction and our deep understanding of the riding
                  community. Our team consists of passionate riders who share
                  your enthusiasm for two-wheeled adventures.
                </p>
              </div>
            </div>
          </motion.div>

         
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Premium Services
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Premium Motorcycle Sales & Leasing
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Expert Maintenance & Custom Modifications
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Original Parts & Premium Accessories
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Flexible Financing Solutions
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Professional Riding Consultation
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Visit Our Showroom
              </h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-center gap-4">
                  <EnvironmentOutlined className="text-2xl text-orange-500" />
                  <p>789 Motorcycle Boulevard, Racing City, MC 54321</p>
                </div>
                <div className="flex items-center gap-4">
                  <PhoneOutlined className="text-2xl text-orange-500" />
                  <p>+1 (555) 987-6543</p>
                </div>
                <div className="flex items-center gap-4">
                  <ClockCircleOutlined className="text-2xl text-orange-500" />
                  <div>
                    <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                    <p>Saturday: 10:00 AM - 5:00 PM</p>
                    <p>Sunday: By Appointment</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-800">
              Developed By HABIBB2R
            </h2>
            <p className="text-gray-600">
              Passionate about creating exceptional digital experiences
            </p>
            <div className="flex justify-center gap-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-orange-500 hover:text-orange-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  title={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Title
            title="Get In Touch"
            subtitle="Let's discuss your motorcycle dreams"
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
              className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-orange-100"
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
                  placeholder="Tell us about your motorcycle interests..."
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
