import { Link } from "react-router-dom";

const MasterJamb = ({ img1, img2, img3 }: any) => {
  return (
    <section className="bg-[#c7c7c7]  !py-5 md:!py-16 md:!mt-10">
      <h2 className="text-center text-3xl md:text-4xl font-semibold !py-5">
        Master JAMB with Confidence
      </h2>
      <div className="flex flex-col md:flex-row w-[90%] !m-auto justify-between !mt-5">
        <div className="bg-white !p-5 !mb-3 rounded-md md:w-[450px]">
          <img
            className="!m-auto !h-[250px] md:!h-[350px] !w-[90%]"
            src={img1}
          />
          <article className="max-w-[400px]">
            <h3>Realistic CBT simulations</h3>
            <p>
              Our practice tests are designed to mirror the actual JAMB exam,
              from the question format to the time limits. This helps you get
              familiar with the exam structure and reduces surprises on the big
              day.
            </p>
          </article>
        </div>
        <div className="bg-white !p-5 !mb-3 md:w-[450px] rounded-md">
          <img
            className="!m-auto !h-[250px] md:!h-[350px] !w-[90%]"
            src={img2}
          />
          <article className="max-w-[400px]">
            <h3>Performance analytics</h3>
            <p>
              Quality JAMB preparation shouldn’t break the bank. Lynspeed offers
              premium features at an affordable price, making top-tier exam prep
              accessible to everyone.
            </p>
          </article>
        </div>
        <div className="bg-white !p-5 !mb-3 md:w-[450px] rounded-md">
          <img
            className="!m-auto !h-[250px] md:!h-[350px] !w-[90%]"
            src={img3}
          />
          <article className="max-w-[400px]">
            <h3>Topic-wise practice</h3>
            <p>
              Choose from full-length mock exams or topic-specific quizzes.
              Practice at your own pace, anytime, anywhere, and tailor your
              study sessions to fit your schedule.
            </p>
          </article>
        </div>
      </div>
      <div className="!w-[300px] md:!w-[500px] !m-auto !mt-5">
        <Link to="/login">
          <button className="!px-4 !py-2 bg-[#0659a6] w-full  rounded-full  text-white cursor-pointer">
            Start Practicing Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default MasterJamb;
