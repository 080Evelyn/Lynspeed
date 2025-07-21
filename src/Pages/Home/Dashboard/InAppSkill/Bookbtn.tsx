import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../../../../State/Store";
import { setSkillId } from "../../../../State/SkillsSlice";
interface Payload {
  id: number;
}
const Bookbtn = ({ id }: Payload) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loader, setLoader] = useState(false);
  const token = localStorage.getItem("authToken");
  // const skillId = useSelector((state: RootState) => state.skills.skillId);
  // console.log(skillId);

  const handleBooking = async () => {
    dispatch(setSkillId(id));
    try {
      setLoader(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/v2/skills/pay/initialize/`,

        {
          skill_id: id,
          callback_url: " https://www.lynspeed.com.ng/verify",
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
    } catch (error: any) {
      console.error("Error activating subscription:", error);

      if (error.status === 409) {
        toast.error(`${error.response.data.detail}`);
      } else {
        toast.error(
          "There was an issue activating the subscription. Please try again."
        );
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <button
      className="border border-blue-600 hover:!text-white rounded-3xl text-blue-600 !px-4 !py-2 text-sm"
      disabled={loader}
      onClick={handleBooking}>
      {loader ? "loading..." : "Book a session"}
    </button>
  );
};

export default Bookbtn;
