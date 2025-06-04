import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import img1 from "../../assets/icon1.png";
import img2 from "../../assets/Icon2.png";
import img3 from "../../assets/Icon3.png";
// import img4 from "../../assets/Icon4.png";
const skills = [
  {
    title: "Hard Skills (Technical Skills)",
    desc: "Build practical, hands-on skills that solve real challenges in your environment. From coding to critical thinking, these are the tools that open doors to lasting success.",
    icon: img1,
  },
  {
    title: "Soft Skills (Interpersonal Skills)",
    desc: "Master the art of leadership, clear communication and teamwork. With emotional intelligence and people skills, you'll stand out and build strong connections wherever you go.",
    icon: img2,
  },
  {
    title: "Digital Skills",
    desc: "From social media to online marketing and virtual tools, gain the digital edge you need to thrive in today’s tech-driven world; anytime, anywhere.",
    icon: img3,
  },
  {
    title: "Creative Skills",
    desc: "Bring your ideas to life! Whether you're writing, storytelling or solving problems in new ways, your creativity can set you apart and make a real difference.",
    icon: img2,
  },
  // Add more as needed
];

const SkillsCarousel = () => {
  return (
    <section className="text-white !py-6 md:!py-16">
      <div className="w-[90%] bg-[#026FD4] !py-6 md:!py-16 !mx-auto text-center relative">
        <h2 className="text-3xl md:text-4xl font-bold !mb-10">
          Learn In-Demand Skills
        </h2>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          pagination={{ clickable: true }}>
          {skills.map((skill, index) => (
            <SwiperSlide key={index}>
              <div className="bg-[#003260] text-white rounded-lg max-w-[300px] !pb-4 mt-11  md:!ml-[20%] !mx-auto p-6 shadow-lg !h-full flex flex-col justify-between">
                <img
                  className="h-[50px] w-[50px] !mt-5 !ml-5"
                  src={skill.icon}
                />
                <h3 className="text-lg  font-semibold !text-white mb-2">
                  {skill.title}
                </h3>
                <p className="text-sm text-[#E6E6E6]">{skill.desc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination styling */}
        <style>
          {`
            .swiper-pagination-bullet {
              background-color: #e2e8f0;
              opacity: 1;
              width: 10px;
              height: 10px;
              margin: 0 6px;
              border-radius: 9999px;
              transition: all 0.3s ease;
            }

            .swiper-pagination-bullet-active {
              background-color: #facc15;
              transform: scale(1.2);
            }
                .swiper-pagination-bullet {
            background-color: #e2e8f0;
            opacity: 1;
            width: 10px;
            height: 10px;
            margin: 0 6px;
            border-radius: 9999px;
            transition: all 0.3s ease;
            }

            .swiper-pagination-bullet-active {
            background-color: #facc15;
            transform: scale(1.2);
            }

            /* Navigation arrows */
            .swiper-button-next,
            .swiper-button-prev {
            color: #facc15; /* Yellow */
            }

            .swiper-button-next::after,
            .swiper-button-prev::after {
            font-size: 20px;
            font-weight: bold;
            }
          `}
        </style>
      </div>
      <div className="!w-[300px] md:!w-[500px] !m-auto !mt-5">
        <Link to="/">
          <button className="!px-4 !py-2 bg-[#0659a6] w-full  rounded-full  text-white cursor-pointer">
            Discover Skills to Learn
          </button>
        </Link>
      </div>
    </section>
  );
};

export default SkillsCarousel;
