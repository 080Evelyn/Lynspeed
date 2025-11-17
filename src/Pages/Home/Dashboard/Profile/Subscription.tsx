import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Subscription.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import SubBtn from "./SubBtn";
import { AppDispatch } from "../../../../State/Store";
import { useDispatch } from "react-redux";
import { setValidate } from "../../../../State/PaymentValidationSlice";
import PaymentValidationText from "./PaymentValidationText";

interface SubscriptionStatus {
  status: string;
  end_date: string | number | Date;
  subscription_end_date: string | number | Date;
  subscribed: SubscriptionStatus | null;
  plan: any;
}

interface planStatus {
  map(
    arg0: (plan: any) => import("react/jsx-runtime").JSX.Element
  ): React.ReactNode;
  id: number;
  name: string;
  price: boolean;
  duration: number;
}

const Subscription: React.FC = () => {
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(
    null
  );

  const [plan, setPlan] = useState<planStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [paymentVerify, setPaymentVerify] = useState(false);
  const [paymentNotVerify, setPaymentNotVerify] = useState(false);
  const [verifiactionLoading, setVerificationLoading] = useState(false);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchPlansAndStatus = async () => {
      try {
        setLoading(true);
        const statusResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}api/v1/subscription-status/`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to Authorization header
            },
          }
        );
        // console.log(statusResponse)

        if (statusResponse.statusText === "OK") {
          const planResponse = await axios.get(
            `${import.meta.env.VITE_BASE_URL}api/v1/plans/`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Add token to Authorization header
              },
            }
          );
          setPlan(planResponse.data);
        }
        setSubscription(statusResponse.data);
      } catch (error) {
        setError("Failed to fetch subscription data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlansAndStatus();
  }, []);

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
      if (response.statusText === "OK") {
        setPaymentVerify(true);
        localStorage.removeItem("referenceId");
        setVerificationLoading(false);
        dispatch(setValidate(false));
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
    validatePayment();
  }, []);

  return (
    <div className="subscription-container">
      {/* Backward Arrow */}
      <div className="header-container">
        <span className="back-arrow" onClick={() => window.history.back()}>
          ←
        </span>
        <h2 className="subscription-title">My Subscription</h2>
      </div>
      {loading || verifiactionLoading ? (
        <p>Loading subscription details...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          {subscription && subscription.subscribed ? (
            <div className="subscription-details">
              <h3>
                Current Plan: {subscription.plan && subscription.plan.name}
              </h3>
              <p>
                <strong>Valid Until:</strong>{" "}
                {new Date(
                  subscription.subscription_end_date
                ).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p>You do not have an active subscription.</p>
          )}
          <div className="plans-container">
            {plan &&
              plan.map((plan) => (
                <div key={plan.id} className="plan-card">
                  <h2>{plan.name}</h2>
                  {plan.duration === 7 && (
                    <p>
                      7 days validity, Unlimited access to questions, Full test
                      simulations, Performance analysis, Result History Email
                      support
                    </p>
                  )}
                  {plan.duration === 30 && (
                    <p>
                      30 days validity, Unlimited access to questions, Full test
                      simulations, Performance analysis, Priority customer
                      support, Test result & History.
                    </p>
                  )}
                  {plan.duration === 90 && (
                    <p>
                      90 days validity, Unlimited access to questions, Full test
                      simulations, Performance analysis, Priority customer
                      support, Test result & History.
                    </p>
                  )}
                  <h3>{plan.price}</h3>

                  <SubBtn name={plan.name} id={plan.id} />
                </div>
              ))}
          </div>
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
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Subscription;
