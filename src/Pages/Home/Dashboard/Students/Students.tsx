import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../../State/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRegisteredStudents,
  fetchSub,
} from "../../../../State/StudentSlice";
import Sidebar from "../../../../Components/Sidebar";
import axios from "axios";

const Students = () => {
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch<AppDispatch>();

  const students = useSelector(
    (state: RootState) => state.registeredStudents?.data
  );
  const sub = useSelector((state: RootState) => state.registeredStudents?.sub);
  const loading = useSelector(
    (state: RootState) => state.registeredStudents?.loading
  );
  const error = useSelector(
    (state: RootState) => state.registeredStudents?.error
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [selectedSubId, setSelectedSubId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchRegisteredStudents(token));
    dispatch(fetchSub(token));
  }, [dispatch, token]);

  const filteredStudents = students?.filter((student: any) =>
    `${student.name} ${student.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // ✅ Toggle individual student selection
  const toggleSelect = (id: number) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // ✅ Select all students at once
  const toggleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(
        filteredStudents.map((s: any) => s.enterprise_student_id)
      );
    }
  };

  // ✅ Handle adding students to subscription
  const handleAddToSubscription = async () => {
    if (!selectedSubId) {
      setMessage("Please select a subscription plan.");
      return;
    }
    if (selectedStudents.length === 0) {
      setMessage("Please select at least one student.");
      return;
    }

    try {
      setSubmitting(true);
      setMessage("");

      const payload = {
        subscription_id: selectedSubId,
        student_ids: selectedStudents,
      };

      const res = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }api/v1/enterprise/students/assign-students-to-subscription/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setMessage("✅ Students added successfully!");
        setSelectedStudents([]);
        setSelectedSubId(null);
        dispatch(fetchRegisteredStudents(token)); // Refresh
        dispatch(fetchSub(token));
      }
    } catch (err: any) {
      setMessage(
        err.response?.data?.message ||
          "❌ Failed to add students to subscription."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full !p-4">
        <div className="flex justify-between items-center !mb-4 flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2 h-[40px] !px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0659a6]"
          />

          {/* ✅ Subscription Dropdown */}
          <select
            value={selectedSubId || ""}
            onChange={(e) => setSelectedSubId(Number(e.target.value))}
            className="border rounded-md !px-3 !py-2 text-sm focus:ring-2 focus:ring-[#0659a6]">
            <option value="">Select Subscription</option>
            {sub?.map((plan: any) => (
              <option key={plan.id} value={plan.id}>
                {`Plan: ${plan.plan_name} | Total Slots: ${plan.slots_total} | Used: ${plan.slots_used} | Remaining: ${plan.slots_remaining}`}
              </option>
            ))}
          </select>

          <button
            disabled={submitting}
            onClick={handleAddToSubscription}
            className="bg-[#0659a6] text-white !px-5 !py-2 rounded-md hover:bg-[#054987] disabled:opacity-50">
            {submitting
              ? "Adding..."
              : selectedStudents.length > 0
              ? `Add ${selectedStudents.length} Student${
                  selectedStudents.length > 1 ? "s" : ""
                }`
              : "Add to Subscription"}
          </button>
        </div>

        {message && (
          <p
            className={`text-sm !mb-3 ${
              message.startsWith("✅")
                ? "text-green-600"
                : message.startsWith("❌")
                ? "text-red-600"
                : "text-orange-600"
            }`}>
            {message}
          </p>
        )}

        <div className="max-h-[500px] overflow-y-auto border border-gray-200 rounded-lg">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#0659a6] text-white sticky top-0 z-10">
              <tr>
                <th className="!px-4 !py-3 text-left text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={
                      selectedStudents.length === filteredStudents?.length &&
                      filteredStudents?.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="!h-[18px] !w-[18px]"
                  />
                </th>
                <th className="!px-4 !py-3 text-left text-sm font-semibold">
                  ID
                </th>
                <th className="!px-4 !py-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="!px-4 !py-3 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="!px-4 !py-3 text-left text-sm font-semibold">
                  Created At
                </th>
                <th className="!px-4 !py-3 text-left text-sm font-semibold">
                  Subscription
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center !py-5">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={8} className="text-center !py-5 text-red-500">
                    {error || "Failed to load data."}
                  </td>
                </tr>
              ) : (
                filteredStudents?.map((student: any, i: any) => (
                  <tr
                    key={student.enterprise_student_id}
                    className="hover:bg-gray-50 transition">
                    <td className="!px-4 !py-3 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(
                          student.enterprise_student_id
                        )}
                        onChange={() =>
                          toggleSelect(student.enterprise_student_id)
                        }
                        className="!h-[18px] !w-[18px]"
                      />
                    </td>
                    <td className="!px-4 !py-3 text-sm">{i + 1}</td>
                    <td className="!px-4 !py-3 text-sm font-medium">
                      {student.name}
                    </td>
                    <td className="!px-4 !py-3 text-sm">{student.email}</td>
                    <td className="!px-4 !py-3 text-sm">
                      {new Date(student.created_at).toLocaleDateString()}
                    </td>
                    <td className="!px-4 !py-3 text-sm">
                      {student.subscribed || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredStudents?.length === 0 && !loading && !error && (
          <p className="text-center !mt-6 text-gray-500">No students found.</p>
        )}
      </div>
    </div>
  );
};

export default Students;
