// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../../../State/Store";
// import {
//   fetchStudentsResult,
//   getResult,
// } from "../../../../State/RegisteredStudentResultSlice";

// const StudentResults = () => {
//   const token = localStorage.getItem("authToken");
//   const dispatch = useDispatch<AppDispatch>();

//   const results = useSelector((state: RootState) => state.studentsResult?.data);
//   console.log(results);
//   const loading = useSelector(
//     (state: RootState) => state.studentsResult?.loading
//   );
//   const error = useSelector((state: RootState) => state.studentsResult?.error);
//   const success = useSelector(
//     (state: RootState) => state.studentsResult?.success
//   );
//   //   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     if (success) return;
//     dispatch(fetchStudentsResult(token));
//   }, []);
//   return (
//     <div>
//       <table className="min-w-[50%] !m-auto !mt-[40px] border border-gray-200 rounded-lg overflow-hidden">
//         <thead className="bg-[#0659a6] text-white">
//           <tr>
//             <th className="!px-4 !py-3 text-left text-sm font-semibold">
//               Name
//             </th>
//             <th className="!px-4 !py-3 text-left text-sm font-semibold">
//               Email
//             </th>

//             <th className="!px-4 !py-3 text-center text-sm font-semibold">
//               Action
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan={8} className="text-center py-5">
//                 Loading...
//               </td>
//             </tr>
//           ) : error ? (
//             <tr>
//               <td colSpan={8} className="text-center py-5 text-red-500">
//                 Failed to load data.
//               </td>
//             </tr>
//           ) : (
//             results?.map((res: any, i: any) => (
//               <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
//                 <td className="!px-4 !py-3 text-sm font-medium">
//                   {res.student.name}
//                 </td>
//                 <td className="!px-4 !py-3 text-sm">{res.student.email}</td>

//                 <td className="!px-4 !py-3 text-center">
//                   <button
//                     onClick={() => {
//                       dispatch(getResult(res));
//                     }}
//                     className="!px-3 !py-1  text-blue-500 rounded-lg text-sm transition">
//                     View Result
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentResults;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../State/Store";
import {
  fetchStudentsResult,
  getResult,
} from "../../../../State/RegisteredStudentResultSlice";
import { useNavigate } from "react-router-dom";

const StudentResults = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const results = useSelector((state: RootState) => state.studentsResult?.data);
  const loading = useSelector(
    (state: RootState) => state.studentsResult?.loading
  );
  const error = useSelector((state: RootState) => state.studentsResult?.error);
  const success = useSelector(
    (state: RootState) => state.studentsResult?.success
  );

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (success) return;
    dispatch(fetchStudentsResult(token));
  }, [dispatch, success, token]);

  // Filter results by search input (case-insensitive)
  const filteredResults = results?.filter((res: any) =>
    `${res.student.name} ${res.student.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="!p-4 ">
      {/* 🔍 Search Input */}
      <div className="flex justify-center !mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="!w-[90%] md:w-1/2 !h-[40px] !px-2 !py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0659a6]"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="md:min-w-[50%] !m-auto border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-[#0659a6] text-white">
            <tr>
              <th className="!px-4 !py-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="!px-4 !py-3 text-left text-sm font-semibold">
                Email
              </th>
              <th className="!px-4 !py-3 text-center text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center py-5">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={3} className="text-center py-5 text-red-500">
                  {error || "-"}
                </td>
              </tr>
            ) : filteredResults?.length > 0 ? (
              filteredResults.map((res: any, i: number) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="!px-4 !py-3 text-sm font-medium">
                    {res.student.name}
                  </td>
                  <td className="!px-4 !py-3 text-sm">{res.student.email}</td>
                  <td className="!px-4 !py-3 text-center">
                    <button
                      onClick={() => {
                        dispatch(getResult(res));
                        navigate("/view-result");
                      }}
                      className="!px-3 !py-1 text-blue-500 hover:!bg-transparent hover:text-blue-600 cursor-pointer rounded-lg text-sm transition">
                      View Result
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-5 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentResults;
