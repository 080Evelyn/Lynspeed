import axios from "axios";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../../State/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRegisteredStudents,
  fetchSub,
} from "../../../../State/StudentSlice";
import Sidebar from "../../../../Components/Sidebar";

interface FormData {
  email: string;
  subscriptionId: string;
}

const StudentLink = () => {
  const token = localStorage.getItem("authToken");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    subscriptionId: "",
  });
  const [errors, setErrors] = useState<Partial<FormData> & { api?: string }>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const sub = useSelector((state: RootState) => state.registeredStudents?.sub);
  const loader = useSelector(
    (state: RootState) => state.registeredStudents?.loading
  );
  const error = useSelector(
    (state: RootState) => state.registeredStudents?.error
  );

  useEffect(() => {
    dispatch(fetchSub(token));
  }, [dispatch, token]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    if (!formData.subscriptionId) {
      newErrors.subscriptionId = "Please select a subscription";
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
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
        {
          email: formData.email,
          subscription_id: formData.subscriptionId, // Send subscription ID here
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess(response.data.message || "Student linked successfully!");
        setFormData({
          email: "",
          subscriptionId: "",
        });
        dispatch(fetchRegisteredStudents(token));
      }
    } catch (error: any) {
      setErrors({
        api: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loader) {
    <div>
      <p className="text-center pt-[50px]">Loading...</p>
    </div>;
  }

  if (!loader && error) {
    <div>
      <p className="text-center pt-[50px] text-red-500">
        failed to fetch subcriptions
      </p>
    </div>;
  }

  return (
    <div className="flex ">
      <Sidebar />

      <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full !px-4">
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

          {/* Subscription Dropdown */}
          <div className="!mb-4">
            <label
              htmlFor="subscriptionId"
              className="block text-sm font-medium text-gray-700">
              Select Subscription
            </label>
            <select
              name="subscriptionId"
              id="subscriptionId"
              value={formData.subscriptionId}
              onChange={handleChange}
              className={`!mt-1 w-full !p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.subscriptionId ? "border-red-500" : "border-gray-300"
              }`}>
              <option value="">-- Select Subscription --</option>
              {sub.length > 0 ? (
                sub?.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {`Plan: ${item.plan_name} | Total Slots: ${item.slots_total} | Used: ${item.slots_used} | Remaining: ${item.slots_remaining}`}
                  </option>
                ))
              ) : (
                <option>No subscription found.</option>
              )}
            </select>
            {errors.subscriptionId && (
              <p className="text-red-500 text-sm !mt-1">
                {errors.subscriptionId}
              </p>
            )}
          </div>

          {/* API Error */}
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
    </div>
  );
};

export default StudentLink;
