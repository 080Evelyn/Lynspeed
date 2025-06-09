import { Link } from "react-router-dom";

const CareerPath = ({ img }: any) => {
  return (
    <section className="w-full !py-6 md:!py-16 !mt-[150px] md:!mt-20 bg-[#fcfcfc">
      <h2 className=" w-[90%] text-3xl text-center md:text-4xl font-semibold !py-5 md:py-16">
        Find Your Perfect Career Path
      </h2>
      <div className="w-[90%] !mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <div className="items-center">
          <div className="space-y-6">
            {[
              {
                title: "Career Assessment Quizzes",
                desc: "Discover your strengths and interests with interactive quizzes designed to match you with the best career options.",
              },
              {
                title: "Personalized recommendations",
                desc: "Get tailored career suggestions based on your unique skills, passions, goals, no more guesswork on what you want to become.",
              },
              {
                title: "Access to professional counselors",
                desc: "Connect with expert career mentors, who'll guide you every step of the way, from planning to landing your dream job.",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-2 h-2 md:w-5 md:h-5 !mt-7 md:!mt-5 rounded-full border-4 border-blue-600" />
                <div>
                  <h3 className="!text-left !text-md md:!text-lg md:!text-justify font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Content */}
        <div className="">
          <img
            src={img}
            alt="career guidance"
            className="rounded-xl w-full h-auto object-cover shadow-md"
          />
        </div>
      </div>
      <div className="!w-[300px] md:!w-[500px] !m-auto !mt-5">
        <Link to="/careerQuiz">
          <button className="!px-4 !py-2 bg-[#0659a6] w-full  rounded-full  text-white cursor-pointer">
            Take the Career Quiz
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CareerPath;
