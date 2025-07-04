import { FaUserAlt } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const Mentorship = () => {
  const mentors = [
    {
      id: 1,
      name: "John Doe",
      title: "Graphic Designer",
      description:
        "Dui egestas leo blandit leo. Sit pulvinar mi amet vulputate. mi amet vulputate",
      services: "Graphic Design Path guide",
      availability: "2 sessions/wk",
      price: "N5,000",
      topRated: true,
    },
    {
      id: 2,
      name: "John Doe",
      title: "Graphic Designer",
      description:
        "Dui egestas leo blandit leo. Sit pulvinar mi amet vulputate. mi amet vulputate",
      services: "Graphic Design Path guide",
      availability: "2 sessions/wk",
      price: "N5,000",
      topRated: true,
    },
    {
      id: 3,
      name: "John Doe",
      title: "Graphic Designer",
      description:
        "Dui egestas leo blandit leo. Sit pulvinar mi amet vulputate. mi amet vulputate",
      services: "Graphic Design Path guide",
      availability: "2 sessions/wk",
      price: "N5,000",
      topRated: true,
    },
    {
      id: 4,
      name: "John Doe",
      title: "Graphic Designer",
      description:
        "Dui egestas leo blandit leo. Sit pulvinar mi amet vulputate. mi amet vulputate",
      services: "Graphic Design Path guide",
      availability: "2 sessions/wk",
      price: "N5,000",
      topRated: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 !bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-40 -right-40 w-80 h-80 !bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-15 blur-3xl"></div>
      </div>

      <div className="relative z-10 !max-w-5xl !mx-auto !px-6 !py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/dashboard">
            <button className="flex cursor-pointer items-center text-gray-600 hover:text-gray-800 hover:!bg-transparent transition-colors">
              <IoArrowBack className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Back</span>
            </button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg !p-8 backdrop-blur-sm bg-opacity-95">
          {/* Title Section */}
          <div className="text-center !mb-12">
            <h1 className="text-3xl font-bold text-gray-900 !mb-4">
              Get Career Guidance from Verified
              <br />
              Counselors
            </h1>
            <p className="text-gray-600 !max-w-2xl !mx-auto leading-relaxed">
              Not sure which path to follow after secondary school? Whether it’s
              university, skills, or entrepreneurship — our counselors are
              here to guide you.
            </p>
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-gray-50 rounded-xl !p-6 hover:!shadow-md !transition-shadow">
                <div className="">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="!w-16 !h-16 bg-gray-300 rounded-full !m-auto flex !items-center !justify-center">
                      <FaUserAlt className="w-8 h-8 text-gray-600" />
                    </div>
                    {mentor.topRated && (
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-semibold !px-2 !py-1 rounded-full">
                        Top Rated
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-semibold !text-black text-lg !mb-1">
                      {mentor.name}
                    </h3>
                    <p className="text-sm text-gray-800 text-center font-medium !mb-3">
                      {mentor.title}
                    </p>
                    <p className="text-gray-600 text-sm text-center !mb-4 leading-relaxed">
                      {mentor.description}
                    </p>

                    <div className="space-y-2 !mb-4">
                      <div className="flex justify-between gap-2 text-sm">
                        <span className="font-medium text-gray-700 w-20">
                          Services:
                        </span>
                        <span className="text-gray-600">{mentor.services}</span>
                      </div>
                      <div className="flex justify-between gap-2 !mt-3 text-sm">
                        <span className="font-medium text-gray-700 w-20">
                          Availability:
                        </span>
                        <span className="text-gray-600">
                          {mentor.availability}
                        </span>
                      </div>
                    </div>

                    {/* Connect Button and Price */}
                    <div className="flex items-center justify-between">
                      <button className="bg-white border-2 border-blue-500 text-[#0659a6] rounded-full font-semibold !px-6 !py-2 hover:bg-blue-50 transition-colors">
                        Connect
                      </button>
                      <span className="text-xl font-bold text-gray-900">
                        {mentor.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
