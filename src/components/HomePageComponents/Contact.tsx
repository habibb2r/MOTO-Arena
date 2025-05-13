import { Button, Form, Input } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import Title from "./Title";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [form] = Form.useForm<ContactFormValues>();
  const [sending, setSending] = useState(false);

  const onFinish = async (values: ContactFormValues) => {
    setSending(true);
    try {
      console.log(values);
      toast.success("Message sent successfully! We'll get back to you soon.");
      form.resetFields();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <Title
        title="Contact Us"
        subtitle="Get in Touch with Our Team"
        variant="gradient"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1  gap-8 mt-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            <div className="bg-white p-8 rounded-xl shadow-md border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">How to Reach Us</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <EnvironmentOutlined className="text-2xl text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Visit Our Showroom</h4>
                    <p className="text-gray-600">123 Motorbike Street, Dhaka, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <PhoneOutlined className="text-2xl text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Contact Numbers</h4>
                    <p className="text-gray-600">+880 1234-567890</p>
                    <p className="text-gray-600">+880 1234-567891</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <MailOutlined className="text-2xl text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email Us</h4>
                    <p className="text-gray-600">info@motoarena.com</p>
                    <p className="text-gray-600">support@motoarena.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <ClockCircleOutlined className="text-2xl text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Business Hours</h4>
                    <p className="text-gray-600">Monday - Saturday: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

             {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
              
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="space-y-4"
              >
                <Form.Item
                  name="name"
                  label={<span className="text-gray-700 font-medium">Your Name</span>}
                  rules={[{ required: true, message: "Please enter your name" }]}
                >
                  <Input 
                    className="rounded-lg py-2 border-2 hover:border-orange-400 focus:border-orange-500 transition-colors" 
                    placeholder="Enter your name" 
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label={<span className="text-gray-700 font-medium">Email Address</span>}
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" }
                  ]}
                >
                  <Input 
                    className="rounded-lg py-2 border-2 hover:border-orange-400 focus:border-orange-500 transition-colors" 
                    placeholder="Enter your email" 
                  />
                </Form.Item>

                <Form.Item
                  name="subject"
                  label={<span className="text-gray-700 font-medium">Subject</span>}
                  rules={[{ required: true, message: "Please enter a subject" }]}
                >
                  <Input 
                    className="rounded-lg py-2 border-2 hover:border-orange-400 focus:border-orange-500 transition-colors" 
                    placeholder="Enter message subject" 
                  />
                </Form.Item>

                <Form.Item
                  name="message"
                  label={<span className="text-gray-700 font-medium">Message</span>}
                  rules={[{ required: true, message: "Please enter your message" }]}
                >
                  <Input.TextArea 
                    className="rounded-lg border-2 hover:border-orange-400 focus:border-orange-500 transition-colors" 
                    rows={4} 
                    placeholder="Enter your message"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    htmlType="submit"
                    loading={sending}
                    className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium text-lg rounded-lg transition-colors"
                  >
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Map */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Location</h3>
              <div className="rounded-lg overflow-hidden h-[300px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.8223908687!2d90.27923710000001!3d23.780887399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1630825600000!5m2!1sen!2sbd" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy"
                  title="MOTO Arena Location"
                ></iframe>
              </div>
            </div>

           
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;