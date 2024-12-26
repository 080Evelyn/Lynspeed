import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
interface Payload {
  id: number;
  name: string;
}
const SubBtn = ({ name, id }: Payload) => {
  const [subLoader, setSubLoader] = useState(false);
  const token = localStorage.getItem("authToken");

  const handleActivateSubscription = async () => {
    try {
      setSubLoader(true);
      const response = await axios.post(
        "https://lynspeed.pythonanywhere.com/api/v1/payment/initialize/",

        {
          plan_id: id,
          plan: name,
        },
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
