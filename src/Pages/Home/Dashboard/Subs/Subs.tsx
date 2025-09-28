// export default Subs;
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../State/Store";
import { fetchSub, getSubId } from "../../../../State/StudentSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Subs = () => {
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const sub = useSelector((state: RootState) => state.registeredStudents?.sub);
  const loading = useSelector(
    (state: RootState) => state.registeredStudents?.loading
  );
  const error = useSelector(
    (state: RootState) => state.registeredStudents?.error
  );
  const [selectedSubs, setSelectedSubs] = useState<number[]>([]);
  const [oldSubId, setOldSubId] = useState<number | null>(null);
  const [newSubId, setNewSubId] = useState<number | null>(null);
  const [loader, setLoader] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    dispatch(fetchSub(token));
  }, [dispatch, token]);

  const handleCheckboxChange = (id: number) => {
    setSelectedSubs((prev) => {
      if (prev.includes(id)) {
        return prev.filter((sid) => sid !== id);
      }
      if (prev.length < 2) {
        return [...prev, id];
      }
      return prev; // ignore if already 2 selected
    });
  };

  const handleMoveStudents = async () => {
    if (!oldSubId || !newSubId) {
      alert("Please select both Old and New subscriptions.");
      return;
    }

    if (oldSubId === newSubId) {
      alert("Old and New subscription cannot be the same.");
      return;
    }
    setErr("");
    setLoader(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/v1/enterprise/bulk-move-students/`,
        {
          old_subscription_id: oldSubId,
          new_subscription_id: newSubId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.statusText === "OK") {
        alert(res.data.detail);
        dispatch(fetchSub(token));
      }
    } catch (err) {
      console.error(err);
      alert("Error moving students.");
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen !p-4">
      <h1 className="text-center !pt-5 !px-3 font-semibold text-lg">
        All Subscriptions (select 2 rolls to move students to another
        subscription)
      </h1>

      <div className="mt-6">
        {sub?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-[#0659a6] text-white">
                <tr>
                  <th className="!px-4 !py-3 text-left text-sm font-semibold">
                    Select
                  </th>
                  <th className="!px-4 !py-3 text-left text-sm font-semibold">
                    ID
                  </th>
                  <th className="!px-4 !py-3 text-left text-sm font-semibold">
                    Total Slots
                  </th>
                  <th className="!px-4 !py-3 text-left text-sm font-semibold">
                    Slots Used
                  </th>
                  <th className="!px-4 !py-3 text-left text-sm font-semibold">
                    Slots Remaining
                  </th>
                  <th className="!px-4 !py-3 text-left text-sm font-semibold">
                    Start Date
                  </th>
                  <th className="!px-4 !py-3 text-left text-sm font-semibold">
                    End Date
                  </th>
                  <th className="!px-4 !py-3 text-left text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <p className="font-bold text-center">Loading...</p>
                ) : !loading && error ? (
                  <p className="text-center text-red-500">Failed to load</p>
                ) : (
                  sub.map((s: any) => (
                    <tr
                      key={s.id}
                      className={`border-b border-gray-200 hover:bg-gray-50 transition`}>
                      <td className="!px-4 !py-3 text-sm">
                        <input
                          type="checkbox"
                          checked={selectedSubs.includes(s.id)}
                          onChange={() => handleCheckboxChange(s.id)}
                          disabled={
                            !selectedSubs.includes(s.id) &&
                            selectedSubs.length >= 2
                          }
                          className="!h-[20px] text-blue-600 border-gray-300 rounded"
                        />
                      </td>
                      <td className="!px-4 !py-3 text-sm font-medium">
                        {s.id}
                      </td>
                      <td className="!px-4 !py-3 text-sm font-medium">
                        {s.slots_total}
                      </td>
                      <td className="!px-4 !py-3 text-sm">{s.slots_used}</td>
                      <td className="!px-4 !py-3 text-sm">
                        {s.slots_remaining}
                      </td>
                      <td className="!px-4 !py-3 text-sm">
                        {new Date(s.start_date).toLocaleDateString()}
                      </td>
                      <td className="!px-4 !py-3 text-sm">
                        {new Date(s.end_date).toLocaleDateString()}
                      </td>
                      <td
                        onClick={() => {
                          dispatch(getSubId(s.id));
                          navigate("/students-by-id");
                        }}
                        className="!px-4 !py-3 text-sm text-blue-500 cursor-pointer">
                        View More
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 !mt-4">
            No subscriptions found.
          </p>
        )}
      </div>

      {/* Dropdowns for Old/New Sub */}
      {selectedSubs.length === 2 && (
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center !mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 !mb-1">
              Old Subscription
            </label>
            <select
              value={oldSubId ?? ""}
              onChange={(e) => setOldSubId(Number(e.target.value))}
              className="border rounded-md !px-3 !py-2 w-48">
              <option value="">Select Old Sub</option>
              {selectedSubs.map((id) => (
                <option key={id} value={id}>
                  Sub ID: {id}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 !mb-1">
              New Subscription
            </label>
            <select
              value={newSubId ?? ""}
              onChange={(e) => setNewSubId(Number(e.target.value))}
              className="border rounded-md !px-3 !py-2 w-48">
              <option value="">Select New Sub</option>
              {selectedSubs.map((id) => (
                <option key={id} value={id}>
                  Sub ID: {id}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="flex justify-center !mt-6">
        <button
          onClick={handleMoveStudents}
          disabled={!oldSubId || !newSubId || oldSubId === newSubId || loader}
          className={`!px-6 !py-2 rounded-lg font-medium text-white transition 
            ${
              oldSubId && newSubId && oldSubId !== newSubId
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}>
          {loader ? "processing..." : "Move Students"}
        </button>
      </div>
    </div>
  );
};

export default Subs;
