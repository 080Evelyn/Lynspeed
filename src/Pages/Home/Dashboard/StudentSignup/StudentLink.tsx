import axios from "axios";
import { useState } from "react";
import { AppDispatch } from "../../../../State/Store";
import { useDispatch } from "react-redux";
import { fetchRegisteredStudents } from "../../../../State/StudentSlice";
interface FormData {
  email: string;
}
const StudentLink = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const [errors, setErrors] = useState<Partial<FormData> & { api?: string }>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // Validate fields
  const validate = () => {
    let newErrors: Partial<FormData> = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    return newErrors;
  };

  // Handle form submission
  const token = localStorage.getItem("authToken");
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setSuccess("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/v1/enterprise/students/link/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      console.log(response.data.message);
      if (response.status === 200) {
        setSuccess(response.data.message);
        setFormData({
          email: "",
        });
        dispatch(fetchRegisteredStudents(token));
      }
    } catch (error: any) {
      setErrors({
        api: error.response?.data || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <span className="back-arrow" onClick={() => window.history.back()}>
        ←
      </span>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 !px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white !p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center !mb-6 text-gray-800">
            Link Existing Students to Your Enterprise
          </h2>

          {/* Email */}
          <div className="!mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`!mt-1 w-full !p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter student email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm !mt-1">{errors.email}</p>
            )}
          </div>

          {/* API error */}
          {errors.api && (
            <p className="text-red-500 text-sm !mb-4">{errors.api}</p>
          )}

          {/* Success Message */}
          {success && <p className="text-green-600 text-sm !mb-4">{success}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0659a6] text-white !py-2 !px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50">
            {loading ? "Submitting..." : "Link"}
          </button>
        </form>
      </div>
    </>
  );
};

export default StudentLink;
