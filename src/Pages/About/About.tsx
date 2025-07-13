import {
  Target,
  Users,
  TrendingUp,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import Navbar from "../../Components/ui/Navbar/Navbar";
import img from "../../assets/ImgL.png";
import img1 from "../../assets/ImgL1.png";
import img2 from "../../assets/ImgL2.png";
import img3 from "../../assets/ImgL3.png";
import img4 from "../../assets/ImgL4.png";
import Footer from "../../Components/ui/Footer/Footer";
import { Link } from "react-router-dom";
export default function About() {
  const benefits = [
    {
      icon: <Target className="w-8 h-8 text-blue-500 " />,
      title: "JAMB Simulation That Works",
      description:
        "Our practice exams feel just like the real JAMB—smart, timed, and designed to build confidence and performance discipline.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Career Guidance & Counseling",
      description:
        "Feeling uncertain about what to study or where to apply? You can now join our free career guidance group, or book a personal 1-on-1 session with Evelyn, our career counselor. It's affordable, focused, and all about helping you find clarity.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
      title: "Live Skill Classes That Pay",
      description:
        "Learn practical, in-demand skills through live, interactive workshops, and join exclusive group chats to support your learning:",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-blue-500" />,
      title: "A Community That Cares",
      description:
        "You're never alone at Lynspeed. Our vibrant community of students and learners shares tips, motivation, study resources, and peer support every step of the way.",
    },
  ];

  const skillsList = [
    "Basic Computer Literacy ",
    "Graphic Design",
    "No-Code Web Design",
    "UI/UX Design",
    "Writing",
    "Frontend web development",
  ];

  const workSteps = [
    {
      icon: img1,
      title: "Practice JAMB with us",
      description: "",
    },
    {
      icon: img2,
      title: "Join the career guidance group or book a private session",
      description: "",
    },
    {
      icon: img3,
      title: "Sign up for live skill classes and join the chat",
      description: "",
    },
    {
      icon: img4,
      title:
        "Grow academically, professionally, and personally—with people who get you",
      description: "",
    },
  ];

  const whyLynspeedPoints = [
    "All-you-need platform — JAMB prep, career help, skill classes & community, all in one place",
    "Youth-first approach — Designed with your dreams and realities in mind.",
    "Accessible & affordable — Free guidance, low-cost mentoring, paid skill classes.",
    "Homegrown trust — We understand your journey and are here to walk it with you.",
  ];

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8 !py-12">
        {/* About Us Section */}
        <div className="text-center !mb-16">
          <h2 className="text-4xl font-bold text-gray-900 !mb-6">About Us</h2>
          <p className="text-lg text-gray-600 max-w-3xl !mx-auto leading-relaxed">
            At Lynspeed, we’re on a mission to empower Nigeria's youth—not just
            to pass exams, but to thrive in the real world.
          </p>
        </div>

        {/* Benefits of Lynspeed Section */}
        <div className="!mb-20">
          <h3 className="text-3xl font-bold text-center md:!text-justify !mb-12 text-gray-900">
            Benefits of Lynspeed
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl !p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col items-start space-x-6">
                  <div className=" bg-blue-50 !p-3 rounded-lg">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 !mb-4">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                    {index === 2 && (
                      <ul className="!mt-4 space-y-2">
                        {skillsList.map((skill, skillIndex) => (
                          <li
                            key={skillIndex}
                            className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-600 !px-2">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Lynspeed Works Section */}
        <div className="!mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold !mb-12 md:!text-justify text-gray-900">
                Why Lynspeed Works
              </h3>
              {whyLynspeedPoints.map((point, index) => (
                <>
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-green-500 !mt-1 !mx-2 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{point}</p>
                  </div>
                </>
              ))}
            </div>
            <div className="rounded-2xl p-8 lg:!p-12">
              <img src={img} alt="img" />
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="!mb-12">
          <h3 className="text-3xl font-bold !mb-12 text-center md:!text-justify text-gray-900">
            Here's how it works:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {workSteps.map((step, index) => (
              <div
                key={index}
                className="text-center bg-gray-50 shadow-sm group !p-3">
                <div className="!mb-6 flex justify-center">
                  <div className="bg-blue-50 !p-6 rounded-2xl group-hover:bg-blue-100 transition-colors duration-300">
                    <img className="h-30 w-30" src={step.icon} alt="img" />
                  </div>
                </div>
                <h4 className="text-lg font-normal text-gray-900 !mb-3 leading-tight">
                  {step.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className=" w-full md:text-center justify-between items-center flex flex-col md:flex-row rounded-2xl md:!p-12 text-white">
          <div className="!w-[90%] md:!w-[500px] ">
            <p className="md:text-2xl text-black font-semibold !mb-4">
              Lynspeed is where exam prep meets real-life purpose. From reading
              past questions to building actual futures—we dey your back.
            </p>
          </div>
          <Link to={"/login"}>
            <button className="border !items-center bg-blue-900 border-blue-600 hover:!text-blue-600 hover:!bg-white rounded-3xl text-white !px-4 w-[200px] h-[50px] text-sm transition-colors duration-300">
              Join Now
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
