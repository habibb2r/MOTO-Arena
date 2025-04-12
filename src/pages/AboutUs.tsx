
import banner from "../assets/banner.png";
import Title from "../components/HomePageComponents/Title";

export default function Home() {
  return (
    <div>
     <Title title="About Us" subtitle="Learn more about Moto Arena"></Title>

      {/* Hero Section */}
      <div className="flex justify-center items-center gap-5">
      <section className="text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold">
          Welcome to Moto Arena Family
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Your trusted destination for premium bikes & accessories.
        </p>
      </section>
      <div>
        <img src={banner} alt="" />
      </div>
      </div>

      {/* About Moto Arena Section */}
      <section className="bg-gray-100 py-16 px-4 mx-[4%] rounded-2xl shadow-lg">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            About Moto Arena
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
            At Moto Arena, we are passionate about motorcycles and the thrill
            of the ride. As a premier motorcycle shop, we offer a wide range of
            bikes, from sleek sports models to rugged adventure bikes, catering
            to riders of all styles and preferences. Our mission is to provide
            top-quality motorcycles, accessories, and exceptional customer
            service to help you embark on your next journey with confidence.
          </p>
          <p className="mt-4 text-lg md:text-xl text-gray-600 leading-relaxed">
            Whether you're a seasoned rider or just starting your biking
            adventure, Moto Arena is your one-stop destination for all things
            motorcycles. Explore our diverse collection and experience the
            freedom of the open road like never before.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 w-full">
        <h2 className="text-3xl font-semibold text-center mb-10">Contact Us</h2>
        <form className="max-w-3xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded border-1 border-blue-400 w-full"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded border-1 border-blue-400 w-full"
            />
          </div>
          <textarea
            placeholder="Your Message"
            rows={5}
            className="p-3 rounded border-1 border-blue-400 w-full"
          ></textarea>
          <button type="submit" className="myBtn">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}