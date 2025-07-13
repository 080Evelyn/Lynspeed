import React, { useEffect, useRef, useState } from "react";
import PaymentValidationText from "../Profile/PaymentValidationText";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setValidate } from "../../../../State/PaymentValidationSlice";
import { AppDispatch, RootState } from "../../../../State/Store";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const Verify = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem("authToken");
  const skillId = useSelector((state: RootState) => state.skills.skillId);
  const [link, setLink] = useState("");
  const [paymentVerify, setPaymentVerify] = useState(false);
  const [paymentNotVerify, setPaymentNotVerify] = useState(false);
  const [text, setText] = useState("");
  const hasValidated = useRef(false);
  const [verifiactionLoading, setVerificationLoading] = useState(false);
  const referenceId = localStorage.getItem("referenceId");
  const [formData, setFormData] = useState({
    skill_id: skillId,
    full_name: "",
    phone_number: "",
    paystack_reference: referenceId,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "skill_id" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");
    console.log(formData);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/v2/skills/enroll/complete/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setLink(data.whatsapp_group_link);
        setResponseMessage("Submitted successfully!");
        localStorage.removeItem("referenceId");
        setFormData({
          skill_id: 0,
          full_name: "",
          phone_number: "",
          paystack_reference: "",
        });
      } else {
        setResponseMessage(data.message || "Submission failed.");
      }
    } catch (err) {
      setResponseMessage("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const validatePayment = async () => {
    const referenceId = localStorage.getItem("referenceId");

    if (!referenceId) {
      return;
    }
    setPaymentNotVerify(false);
    setPaymentVerify(false);
    setVerificationLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/v2/skills/pay/verify/`,
        {
          reference: referenceId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      console.log(response.data.message);
      if (response.statusText === "OK") {
        setPaymentVerify(true);

        setVerificationLoading(false);
        dispatch(setValidate(false));
        setText(response.data.message);
      }
    } catch (error: any) {
      console.error("Validation error:", error.response.data.status);
      if (error.response.data.status === "abandoned") {
        dispatch(setValidate(false));
        setPaymentNotVerify(true);
        localStorage.removeItem("referenceId");
      }
    } finally {
      setVerificationLoading(false);
    }
  };
  useEffect(() => {
    if (!hasValidated.current) {
      validatePayment();
      hasValidated.current = true;
    }
  }, []);
  return (
    <div className="text-center  h-full">
      {verifiactionLoading ? (
        <h2>Verifying Payment...</h2>
      ) : (
        <>
          {paymentVerify && (
            <>
              <PaymentValidationText text={text} />
              <div
                onClick={() => {
                  setPaymentVerify(false);
                }}
                className="modal "></div>
            </>
          )}
          {paymentNotVerify && (
            <>
              <PaymentValidationText
                text={
                  "Payment status: abandoned. Please contact support if you need assistance."
                }
              />

              <div
                onClick={() => {
                  setPaymentNotVerify(false);
                }}
                className="modal"></div>
            </>
          )}
        </>
      )}

      {
        // paymentVerify &&
        <div className="max-w-md bg-gray-50 !mx-auto !px-4 !py-8 !mt-[50px]">
          <Link
            className="absolute top-[20px] flex items-center md:left-[100px]"
            to={"/dashboard"}>
            <IoArrowBack />
            Back to homepage
          </Link>
          <p className="text-sm !mb-5">
            We're excited to have you here! Please take a moment to fill out
            this short form so we can get to know you better and enroll you in
            the right program. We just need a few details to get started—nothing
            too complicated.
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white !p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-center">
              🎓 Enroll for Your Program
            </h2>

            <div>
              <label
                htmlFor="full_name"
                className="block text-sm font-medium !mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded !px-3 !py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium !mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                id="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="+234xxxxxxxxxx"
                className="w-full border border-gray-300 rounded !px-3 !py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full border border-blue-600 hover:!text-white rounded-3xl text-blue-600 !mt-4 !py-2  transition">
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            {responseMessage && (
              <p className="text-center text-sm !mt-4 text-gray-700">
                {responseMessage}
              </p>
            )}
            {link && (
              <a href={link} className="!mt-6 text-blue-600" target="_blank">
                Click Link to join Whatsapp group
              </a>
            )}
          </form>
        </div>
      }
    </div>
  );
};

export default Verify;
