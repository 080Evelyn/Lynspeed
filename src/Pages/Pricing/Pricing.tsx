import React from "react";
import axios from "axios";
import Footer from "../../Components/ui/Footer/Footer";
import Navbar from "../../Components/ui/Navbar/Navbar";
import "./Pricing.css";

type PlanType = "FREE" | "WEEKLY" | "MONTHLY";

const Pricing: React.FC = () => {

  const handleSubscribe = async (plan: PlanType) => {
    if (plan === "FREE") {
      alert("You have selected the Free plan. No payment is required.");
      // Add any additional logic needed for the Free plan here
      return;
    }

    try {
      const response = await axios.post("https://lynspeed.pythonanywhere.com/api/v1/subscription/", {
        plan: plan,
      });

      const { paystackUrl } = response.data;

      // Redirect user to Paystack payment page for Weekly and Monthly plans
      window.location.href = paystackUrl;
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("There was an issue. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="pricing-title">Pricing List</h1>
      <div className="pricing-cards">

        {/* Free Plan Card */}
        <div className="card">
          <div className="card-header">
            <div className="corner-icon"></div>
            <div className="rating">★</div>
          </div>
          <div className="card-body">
            <h2>FREE</h2>
            <h3>₦0</h3>
            <ul>
              <li>Two trials</li>
              <li>Access to basic questions</li>
              <li>Limited test simulations</li>
              <li>24 hours validity</li>
            </ul>
            <button onClick={() => handleSubscribe("FREE")}>Get Started</button>
          </div>
        </div>

        {/* Weekly Plan Card */}
        <div className="card">
          <div className="card-header">
            <div className="corner-icon"></div>
            <div className="rating">★★★</div>
          </div>
          <div className="card-body">
            <h2>WEEKLY</h2>
            <h3>₦600</h3>
            <ul>
              <li>7 days validity</li>
              <li>Unlimited access to questions</li> 
              <li>Full test simulations</li>
              <li>Performance analysis</li>
              <li>Result History</li>
              <li>Email support</li>
            </ul>
            <button onClick={() => handleSubscribe("WEEKLY")}>Get Started</button>
          </div>
        </div>

        {/* Monthly Plan Card */}
        <div className="card">
          <div className="card-header">
            <div className="corner-icon"></div>
            <div className="rating">★★★★★</div>
          </div>
          <div className="card-body">
            <h2>MONTHLY</h2>
            <h3>₦2000</h3>
            <ul>
              <li>30 days validity</li>
              <li>Unlimited access to questions</li>
              <li>Full test simulations</li>
              <li>Performance analysis</li>
              <li>Priority customer support</li>
              <li>Test result & History</li>
            </ul>
            <button onClick={() => handleSubscribe("MONTHLY")}>Get Started</button>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Pricing;
