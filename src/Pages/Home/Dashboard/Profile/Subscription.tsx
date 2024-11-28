import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Subscription.css";

interface Plan {
  name: string;
  price: string;
  description: string;
}

interface SubscriptionStatus {
  plan: string;
  expiration_date: string;
  is_active: boolean;
}

const Subscription: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch subscription plans and current subscription status
  useEffect(() => {
    const fetchPlansAndStatus = async () => {
      try {
        setLoading(true);

        // Fetch available subscription plans
        const plansResponse = await axios.get(
          "https://lynspeed.pythonanywhere.com/api/v1/subscription/name/"
        );
        setPlans(plansResponse.data);

        // Fetch current subscription status
        const statusResponse = await axios.get(
          "https://lynspeed.pythonanywhere.com/api/v1/subscription/status/"
        );
        setSubscription(statusResponse.data);
      } catch (error) {
        setError("Failed to fetch subscription data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlansAndStatus();
  }, []);

  // Activate or upgrade a subscription
  const handleActivateSubscription = async (planName: string) => {
    try {
      const response = await axios.post(
        "https://lynspeed.pythonanywhere.com/api/v1/subscription/activate/",
        {
          plan: planName,
        }
      );

      const { paystackUrl } = response.data;
      // Redirect to Paystack payment page
      window.location.href = paystackUrl;
    } catch (error) {
      console.error("Error activating subscription:", error);
      alert("There was an issue activating the subscription. Please try again.");
    }
  };

  return (
    
      <div className="subscription-container">
        <h1 className="subscription-title">My Subscription</h1>

        {loading ? (
          <p>Loading subscription details...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            {/* Current Subscription Details */}
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

            {/* Available Plans */}
            <div className="plans-container">
              {plans.map((plan) => (
                <div key={plan.name} className="plan-card">
                  <h2>{plan.name}</h2>
                  <p>{plan.description}</p>
                  <h3>{plan.price}</h3>
                  <button
                    className="subscribe-button"
                    onClick={() => handleActivateSubscription(plan.name)}
                  >
                    Subscribe
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
     
  );
};

export default Subscription;
