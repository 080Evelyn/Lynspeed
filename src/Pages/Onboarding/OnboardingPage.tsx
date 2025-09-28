import { Link, useNavigate } from "react-router-dom";

const roles = [
  {
    id: "enterprise",
    label: "Enterprise",
    description:
      "For schools and tutorial centers to manage students, track performance, and access reports.",
  },

  {
    id: "student",
    label: "Student",
    description:
      "For individual learners to take practice tests, view results, and track progress.",
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();

  const handleSelect = (role: string) => {
    // Redirect to the role-specific register page

    navigate(`/register/${role}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="!max-w-3xl w-full bg-white rounded-2xl shadow-lg !p-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center !mb-4 text-gray-800">
          Welcome! 👋
        </h1>
        <p className="text-center text-gray-600 !mb-8">
          Select what you want to register as to get started
        </p>

        {/* Role selection grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleSelect(role.id)}
              className="group border border-gray-200 rounded-xl !p-6 text-left hover:!border-indigo-500 hover:shadow-md transition-all duration-200 bg-white">
              <h2 className="text-lg font-semibold text-gray-800 group-hover:!text-white">
                {role.label}
              </h2>
              <p className="text-sm text-gray-400 !mt-2">{role.description}</p>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="!mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Already have an account?
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
