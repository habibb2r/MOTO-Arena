import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import Title from "./Title";
import { motion } from "framer-motion";

interface Client {
  name: string;
  img: string;
  comment: string;
  role: string;
  purchasedBike: string;
}

const clients: Client[] = [
  {
    name: "Alex Rodriguez",
    img: "/src/assets/images/person1.png",
    comment:
      "The Kawasaki Ninja from Moto Arena exceeded my expectations. The buying process was smooth, and their after-sales service is exceptional. A true rider's paradise!",
    role: "Professional Racer",
    purchasedBike: "Kawasaki Ninja ZX-10R",
  },
  {
    name: "Sarah Chen",
    img: "/src/assets/images/person2.png",
    comment:
      "As a first-time rider, the team at Moto Arena guided me perfectly. They helped me choose the perfect bike and provided excellent riding tips. Couldn't be happier!",
    role: "Adventure Enthusiast",
    purchasedBike: "BMW G 310 GS",
  },
  {
    name: "Michael Thompson",
    img: "/src/assets/images/person3.png",
    comment:
      "The collection at Moto Arena is impressive. Found my dream Ducati here, and their financing options made it possible. The staff's knowledge is unmatched!",
    role: "Motorcycle Collector",
    purchasedBike: "Ducati Panigale V4",
  },
  {
    name: "Emma Watson",
    img: "/src/assets/images/person4.png",
    comment:
      "The customization options available at Moto Arena are fantastic. They turned my standard bike into a head-turner. Their mechanics are true artists!",
    role: "Custom Bike Enthusiast",
    purchasedBike: "Harley-Davidson Street Bob",
  },
  {
    name: "David Kim",
    img: "/src/assets/images/person5.png",
    comment:
      "Regular maintenance at Moto Arena keeps my bike running perfectly. Their technical expertise and genuine parts policy give me complete peace of mind.",
    role: "Daily Commuter",
    purchasedBike: "Honda CB650R",
  },
  {
    name: "Lisa Patel",
    img: "/src/assets/images/person6.png",
    comment:
      "The track day events organized by Moto Arena are incredible. Great community, amazing bikes, and professional guidance. Best motorcycle dealer in the region!",
    role: "Track Day Enthusiast",
    purchasedBike: "Yamaha R1",
  },
];

export default function Testimonial() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <Title
          title="Rider Stories"
          subtitle="Experiences from our motorcycle community"
        />

        <div className="mt-16">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            spaceBetween={30}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Autoplay, EffectCoverflow, Pagination]}
            className="testimonial-swiper pb-16"
          >
            {clients.map((client, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={client.img}
                        alt={client.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-orange-500"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {client.name}
                        </h3>
                        <p className="text-orange-500">{client.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{client.comment}</p>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Purchased:</span>{" "}
                        {client.purchasedBike}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>

      <style>{`
        .testimonial-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background-color: #f97316;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .testimonial-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }

        .testimonial-swiper .swiper-slide {
          padding: 20px 0;
        }

        .testimonial-swiper .swiper-slide-active {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
      `}</style>
    </section>
  );
}
