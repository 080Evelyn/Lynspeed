import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../../State/Store";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegisteredStudents } from "../../../../State/StudentSlice";

const Students = () => {
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch<AppDispatch>();

  const students = useSelector(
    (state: RootState) => state.registeredStudents?.data
  );
  const loading = useSelector(
    (state: RootState) => state.registeredStudents?.loading
  );
  const error = useSelector(
    (state: RootState) => state.registeredStudents?.error
  );
  const success = useSelector(
    (state: RootState) => state.registeredStudents?.success
  );

  const [searchQuery, setSearchQuery] = useState("");
  // const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  // const [showModal, setShowModal] = useState(false);
  // const [removeType, setRemoveType] = useState<"single" | "bulk" | null>(null);
  // const [targetId, setTargetId] = useState<number | null>(null);

  // Show confirmation modal for single delete
  // const handleRemove = (id: number) => {
  //   setRemoveType("single");
  //   setTargetId(id);
  //   setShowModal(true);
  // };

  // Show confirmation modal for bulk delete
  // const handleBulkRemove = () => {
  //   setRemoveType("bulk");
  //   setShowModal(true);
  // };

  // Confirm delete after modal approval
  // const confirmRemove = () => {
  //   if (removeType === "single" && targetId) {
  //     console.log("Removing single student:", targetId);
  //     // call DELETE endpoint for single student here
  //   } else if (removeType === "bulk") {
  //     console.log("Removing multiple students:", selectedStudents);
  //     // call DELETE endpoint for bulk here
  //   }
  //   setShowModal(false);
  //   setTargetId(null);
  //   setRemoveType(null);
  //   setSelectedStudents([]); // clear selection after removal
  // };

  // const toggleSelect = (id: number) => {
  //   setSelectedStudents((prev) =>
  //     prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
  //   );
  // };

  // const toggleSelectAll = () => {
  //   if (selectedStudents.length === filteredStudents.length) {
  //     setSelectedStudents([]); // clear all
  //   } else {
  //     setSelectedStudents(filteredStudents.map((s: any) => s.student_id)); // select all
  //   }
  // };

  useEffect(() => {
    if (success) return;
    dispatch(fetchRegisteredStudents(token));
  }, []);

  const filteredStudents = students?.filter((student: any) =>
    `${student.name} ${student.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div className="flex justify-center !mt-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="!w-[90%] md:w-1/2 !h-[40px] !px-2 !py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0659a6]"
        />
      </div>
      <div className="overflow-x-auto">
        <span
          className="back-arrow cursor-pointer"
          onClick={() => window.history.back()}>
          ←
        </span>
        <h1 className="text-center !py-4 md:text-2xl">
          All Registered Students
        </h1>

        {/* {selectedStudents.length > 0 && (
          <div className="flex justify-end !mb-2">
            <button
              onClick={handleBulkRemove}
              className="!px-4 !py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition">
              Remove Selected ({selectedStudents.length})
            </button>
          </div>
        )} */}

        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-[#0659a6] text-white">
            <tr>
              {/* <th className="!px-4 !py-3 text-left text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={
                    selectedStudents.length === filteredStudents?.length &&
                    filteredStudents?.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="md:!h-[20px]"
                />
              </th> */}
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
                Subscribed
              </th>

              {/* <th className="!px-4 !py-3 text-center text-sm font-semibold">
                Action
              </th> */}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center py-5">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={8} className="text-center py-5 text-red-500">
                  {error || "Failed to load data."}
                </td>
              </tr>
            ) : (
              filteredStudents?.map((student: any) => (
                <tr
                  key={student.student_id}
                  className="border-b border-gray-200 hover:bg-gray-50">
                  {/* <td className="!px-4 !py-3 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.student_id)}
                      onChange={() => toggleSelect(student.student_id)}
                      className="md:!h-[20px]"
                    />
                  </td> */}
                  <td className="!px-4 !py-3 text-sm">
                    {student.enterprise_student_id}
                  </td>
                  <td className="!px-4 !py-3 text-sm font-medium">
                    {student.name}
                  </td>
                  <td className="!px-4 !py-3 text-sm">{student.email}</td>
                  <td className="!px-4 !py-3 text-sm">
                    {new Date(student.created_at).toLocaleDateString()}
                  </td>
                  <td className="!px-4 !py-3 text-sm">
                    {student.subscribed ? "True" : "False"}
                  </td>

                  {/* <td className="!px-4 !py-3 text-center">
                    <button
                      onClick={() => handleRemove(student.student_id)}
                      className="!px-3 !py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition">
                      Remove
                    </button>
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {filteredStudents?.length === 0 && !loading && !error && (
          <p className="text-center mt-6 text-gray-500">No students found.</p>
        )}
      </div>

      {/* Confirmation Modal */}
      {/* {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg !p-6 w-[90%] !max-w-md">
            <h2 className="text-lg font-semibold !mb-4">Confirm Removal</h2>
            <p className="!mb-6 text-gray-700">
              {removeType === "single"
                ? "Are you sure you want to remove this student?"
                : `Are you sure you want to remove ${selectedStudents.length} students?`}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="!px-4 !py-2 bg-gray-300 text-gray-800 rounded-lg text-sm hover:bg-gray-400 transition">
                Cancel
              </button>
              <button
                // onClick={confirmRemove}
                className="!px-4 !py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Students;
