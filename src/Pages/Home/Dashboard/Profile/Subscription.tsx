import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Subscription.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

interface SubscriptionStatus {
  plan: string;
  expiration_date: string;
  is_active: boolean;
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
  const [subLoader, setSubLoader] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchPlansAndStatus = async () => {
      try {
        setLoading(true);
        const statusResponse = await axios.get(
          "https://lynspeed.pythonanywhere.com/api/v1/subscription-status/",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to Authorization header
            },
          }
        );
        if (statusResponse.statusText === "OK") {
          const planResponse = await axios.get(
            "https://lynspeed.pythonanywhere.com/api/v1/plans/",
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
  const handleActivateSubscription = async (planName: string, id: number) => {
    try {
      setSubLoader(true);
      const response = await axios.post(
        "https://lynspeed.pythonanywhere.com/api/v1/payment/initialize/",

        {
          plan_id: id,
          plan: planName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      const { payment_url } = response.data;
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
    <div className="subscription-container">
      {/* Backward Arrow */}
      <div className="header-container">
        <span className="back-arrow" onClick={() => window.history.back()}>
          ←
        </span>
        <h1 className="subscription-title">My Subscription</h1>
      </div>
      {loading ? (
        <p>Loading subscription details...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          {subscription && subscription.is_active ? (
            <div className="subscription-details">
              <h2>Current Plan: {subscription.plan}</h2>
              <p>
                <strong>Valid Until:</strong>{" "}
                {new Date(subscription.expiration_date).toLocaleDateString()}
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
                  <h3>{plan.price}</h3>
                  <button
                    disabled={subLoader}
                    className="subscribe-button"
                    onClick={() =>
                      handleActivateSubscription(plan.name, plan.id)
                    }>
                    {subLoader ? "loading..." : "Subscribe"}
                  </button>
                </div>
              ))}
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Subscription;
