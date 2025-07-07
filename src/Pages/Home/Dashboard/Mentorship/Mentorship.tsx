import { FaRegClock, FaTv } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { TbMoneybag } from "react-icons/tb";
import { Link } from "react-router-dom";
const Mentorship = () => {
  const whatsappGroupLink = "https://chat.whatsapp.com/KYaD5WJWx6b1jyYgHAiwXt";
  return (
    <section className="bg-white !py-16 !px-4 md:!px-10">
      <Link
        className="absolute top-[30px] md:top-[50px] flex items-center md:left-[100px]"
        to={"/dashboard"}>
        <IoArrowBack />
        Back to homepage
      </Link>
      {/* Top Text Section */}
      <div className="max-w-4xl !mx-auto text-center !mb-12">
        <h2 className="text-2xl md:text-4xl font-bold !mb-4">
          Your Career Starts with the <br className="hidden md:block" />
          <span className="text-black">Right Guidance</span>
        </h2>
        <p className="text-gray-600 !mb-6">
          Get support choosing a course, planning your future, and navigating
          school and exam challenges
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#003E9C] text-white !px-6 !py-2 rounded-full text-sm font-medium">
            Book 1-on-1 Counseling
          </button>
          <button className="border border-[#003E9C] hover:!bg-transparent text-[#003E9C] !px-6 !py-2 rounded-full text-sm font-medium">
            <a href={whatsappGroupLink} target="_blank">
              Join JAMB Support Group
            </a>
          </button>
        </div>
      </div>

      {/* Counselor Card */}
      <h2 className="text-center font-semibold text-gray-700 text-lg md:text-2xl !mb-5">
        Meet your Career Councelor
      </h2>
      <div className="max-w-lg !mx-auto !mb-16">
        <div className="bg-white flex flex-col md:flex-row md:gap-4 justify-between rounded-lg shadow-md border !p-6 text-center">
          <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full !mb-4"></div>
          <div className="">
            <div className="text-start">
              <h3 className="text-xl !text-start font-semibold">Evelyn</h3>
              <p className="text-gray-500 text-sm !mb-2">Career Counselor</p>
              <div className="text-sm text-gray-700 !mb-2 flex gap-1.5 items-center">
                <TbMoneybag /> ₦1,000
              </div>
              <div className="text-sm text-gray-700 !mb-2 flex gap-1.5 items-center">
                <FaTv />
                WhatsApp/Zoom
              </div>
              <div className="text-sm text-gray-700 !mb-4 flex gap-1.5 items-center">
                <FaRegClock />
                30mins
              </div>
            </div>

            <p className="text-left text-gray-600 text-sm !mb-4">
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Tailored advice based on your interests and strengths</li>
                <li>School/course selection help</li>
                <li>Lite goals check-in</li>
              </ul>
            </p>

            <button className="bg-[#003E9C] float-start text-white !px-6 !py-2 rounded-full text-sm font-medium">
              Book a Session
            </button>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="text-center">
        <h4 className="text-lg font-bold !mb-10">How It Works (3 Steps)</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl !mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full !mb-4 flex items-center justify-center">
              📱
            </div>
            <p className="text-sm font-medium">
              Join the JAMB group or <br /> book 1-on-1
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full !mb-4 flex items-center justify-center">
              💬
            </div>
            <p className="text-sm font-medium">
              Get mentorship, clarity, <br /> and direction
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full !mb-4 flex items-center justify-center">
              🚀
            </div>
            <p className="text-sm font-medium">
              Start making smarter <br /> school & life decisions
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center !mt-4">
        <button className="border border-[#003E9C] hover:!bg-transparent text-[#003E9C] !px-6 !py-2 rounded-full text-sm font-medium">
          <a href={whatsappGroupLink} target="_blank">
            Join JAMB Support Group
          </a>
        </button>
      </div>
    </section>
  );
};

export default Mentorship;
