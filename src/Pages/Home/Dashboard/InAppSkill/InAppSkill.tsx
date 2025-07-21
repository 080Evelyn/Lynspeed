import { IoArrowBack } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../State/Store";
import { useEffect } from "react";
import { fetchSkills } from "../../../../State/SkillsSlice";
import { useSelector } from "react-redux";
import Bookbtn from "./Bookbtn";
import { ToastContainer } from "react-toastify";

const InAppSkill = () => {
  const dispatch = useDispatch<AppDispatch>();
  const skills = useSelector((state: RootState) => state.skills?.data);
  const loading = useSelector((state: RootState) => state.skills?.loading);
  const error = useSelector((state: RootState) => state.skills?.error);
  const success = useSelector((state: RootState) => state.skills?.success);
  const filteredSkills = skills?.filter(
    (skill: any) => skill.name.toLowerCase() !== "career guidance"
  );

  useEffect(() => {
    if (success) {
      return;
    }
    dispatch(fetchSkills());
  }, []);
  return (
    <section className="!py-12 !px-4 md:px-12 bg-white text-gray-800">
      {loading ? (
        <p className="text-center !mt-20">Loading...</p>
      ) : !loading && error ? (
        <p className="text-center !mt-20">
          Somrthing went wrong, check internet connection
        </p>
      ) : (
        <>
          <Link
            className="absolute top-[20px] flex items-center md:left-[100px]"
            to={"/dashboard"}>
            <IoArrowBack />
            Back to homepage
          </Link>
          <h2 className="text-3xl md:text-4xl font-bold text-center !mb-12">
            Skills we Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {filteredSkills?.map((skill: any, index: any) => (
              <div
                key={index}
                className=" bg-gray-50  rounded-xl !p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition">
                <div>
                  <h3 className="text-xl  font-bold !text-gray-900 !mb-1">
                    {skill.name}
                  </h3>
                  <p className="text-sm font-semibold text-center text-gray-600 italic !mb-4">
                    {skill.description}
                  </p>
                </div>
                <div className="!mt-6 flex justify-between items-center">
                  <Bookbtn id={skill.id} />

                  <p className="text-lg font-bold text-gray-900">
                    ₦{skill.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <ToastContainer />
    </section>
  );
};

export default InAppSkill;
