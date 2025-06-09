import { markAsRead } from "../../../../State/NotificationSlice";
import { AppDispatch } from "../../../../State/Store";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
interface NotificationItem {
  id: any;
}
const BtnNotify = ({ id }: NotificationItem) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem("authToken");
  const [loading, setLoading] = useState(false);

  const markNotificationAsRead = async () => {
    if (!id) {
      return;
    }
    setLoading(true);
    try {
      // Ensure you use template literals properly for Authorization header
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}notifications/${id}/`,
        {
          body: null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Properly format the Bearer token string
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      // Dispatch Redux action to update local state
      dispatch(markAsRead(id));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={markNotificationAsRead} className="see">
      {loading ? "Loading more content..." : "See more.."}
    </button>
  );
};

export default BtnNotify;
