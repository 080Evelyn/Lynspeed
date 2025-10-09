import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { AppDispatch } from "../../../../State/Store";
import { useDispatch } from "react-redux";
import { setValidate } from "../../../../State/PaymentValidationSlice";
interface Payload {
  id: number;
  name: string;
}

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
}
const SubBtn = ({ name, id }: Payload) => {
  const dispatch = useDispatch<AppDispatch>();
  const [subLoader, setSubLoader] = useState(false);
  const token = localStorage.getItem("authToken");
  const storedUser = localStorage.getItem("user");
  const user: UserProfile = storedUser !== null ? JSON.parse(storedUser) : null;
  const handleActivateSubscription = async () => {
    const payload =
      user.role === "enterprise_admin"
        ? {
            plan_id: id,
            plan_type: name,
            callback_url: "https://www.lynspeed.com.ng/validate",
            is_enterprise: true,
            // callback_url: "http://localhost:5173/validate",
          }
        : {
            plan_id: id,
            plan_type: name,
            callback_url: "https://www.lynspeed.com.ng/validate",
            // callback_url: "http://localhost:5173/validate",
          };
    try {
      setSubLoader(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/v1/payment/initialize/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      const { payment_url, reference } = response.data;
      // Store referenceId for validation later
      localStorage.setItem("referenceId", reference);
      window.location.href = payment_url;
      dispatch(setValidate(true));
    } catch (error) {
      console.error("Error activating subscription:", error);

      toast.error(
        "There was an issue activating the subscription. Please try again."
      );
    } finally {
      setSubLoader(false);
    }
  };

  return (
    <button
      disabled={subLoader}
      className="subscribe-button"
      onClick={() => handleActivateSubscription()}>
      {subLoader ? "loading..." : "Subscribe"}
    </button>
  );
};

export default SubBtn;
