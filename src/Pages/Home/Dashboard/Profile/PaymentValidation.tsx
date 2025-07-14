import { useEffect, useState } from "react";
import { AppDispatch } from "../../../../State/Store";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setValidate } from "../../../../State/PaymentValidationSlice";
import PaymentValidationText from "./PaymentValidationText";

const PaymentValidation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem("authToken");

  const [paymentVerify, setPaymentVerify] = useState(false);
  const [paymentNotVerify, setPaymentNotVerify] = useState(false);
  const [error, setError] = useState("");
  const [verifiactionLoading, setVerificationLoading] = useState(false);
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
        `${import.meta.env.VITE_BASE_URL}api/v1/payment/verify/`,
        {
          reference: referenceId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      console.log(response);
      if (response.statusText === "OK") {
        setPaymentVerify(true);
        localStorage.removeItem("referenceId");
        setVerificationLoading(false);
        dispatch(setValidate(false));
      }
    } catch (error: any) {
      console.error("Validation error:", error.response.data.message);
      if (error.response.data.status === "abandoned") {
        dispatch(setValidate(false));
        setPaymentNotVerify(true);
        localStorage.removeItem("referenceId");
      }
      setError(error.response.data.message);
    } finally {
      setVerificationLoading(false);
    }
  };
  useEffect(() => {
    validatePayment();
  }, []);
  return (
    <div className="text-center">
      {verifiactionLoading ? (
        <h2 className="!mt-12">loading...</h2>
      ) : !verifiactionLoading && error ? (
        <h2 className="!mt-12">{error}</h2>
      ) : (
        <>
          {paymentVerify && (
            <>
              <PaymentValidationText
                text={"your payment has been successfuly verified"}
              />
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
    </div>
  );
};

export default PaymentValidation;
