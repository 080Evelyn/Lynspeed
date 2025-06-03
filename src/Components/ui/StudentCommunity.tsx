import { useState } from "react";
import img from "../../assets/section3img.png";
import icon1 from "../../assets/Icon5.png";
import icon2 from "../../assets/Frame1.png";
import icon3 from "../../assets/Frame2.png";

const StudentCommunity = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const whatsappGroupLink = "https://chat.whatsapp.com/KYaD5WJWx6b1jyYgHAiwXt";
  const telegramGroupLink = "https://t.me/+ECkwP9Us1CE5Yjhk";
  return (
    <section className="bg-white !py-6 md:!py-16 px-4 md:px-10 relative">
      <h2 className="text-3xl md:text-4xl text-center font-bold !mb-8 text-gray-900">
        Join a Thriving Student Community
      </h2>

      <div className="w-[90%] !mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Left - Image */}
        <div className="flex-shrink-0 w-full lg:w-1/2">
          <img
            src={img}
            alt="Students learning together"
            className="rounded-[24px] w-full h-auto object-cover"
          />
        </div>

        {/* Right - Content */}
        <div className="w-full lg:w-1/2">
          {/* Benefits List */}
          <div className="!space-y-6">
            {[
              {
                title: "Group chats for peer support",
                desc: "Connect with fellow students in real-time group chats. Share ideas, ask questions, and support each other through every stage of your learning journey.",
                icon: icon1,
              },
              {
                title: "Forums for discussion",
                desc: "Dive into thoughtful conversations on study tips, career paths, and exams. Our forums are a space to learn from others and share your experiences.",
                icon: icon3,
              },
              {
                title: "Events and webinars",
                desc: "Stay inspired with expert-led webinars and engaging virtual events. Gain insights, ask questions, and build your knowledge beyond the classroom.",
                icon: icon2,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 border-b border-stone-200 !pb-4">
                <div className="p-2 rounded-full">
                  <img src={item.icon} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Button and Dropdown */}
      <div className="!w-[300px] md:!w-[500px] !m-auto !mt-5 relative">
        <button
          className="!px-4 !py-2 bg-[#0659a6] w-full rounded-full text-white cursor-pointer"
          onClick={() => setDropdownOpen((prev) => !prev)}>
          Join the Conversation
        </button>

        {dropdownOpen && (
          <div className="absolute w-full mt-2 bg-white border rounded-md shadow-lg z-50">
            <a
              href={whatsappGroupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 hover:bg-gray-100 text-gray-800">
              Join via WhatsApp
            </a>
            <a
              href={telegramGroupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 hover:bg-gray-100 text-gray-800">
              Join via Telegram
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentCommunity;
