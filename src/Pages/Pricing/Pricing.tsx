import React, { useEffect } from "react";
import axios from "axios";
import Footer from "../../Components/ui/Footer/Footer";
import Navbar from "../../Components/ui/Navbar/Navbar";
import "./Pricing.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { Link } from "react-router-dom";

type PlanType = "FREE" | "WEEKLY" | "MONTHLY" | "QUARTERLY";

const Pricing: React.FC = () => {
  const handleSubscribe = async (plan: PlanType) => {
    if (plan === "FREE") {
      toast("You have selected the Free plan. No payment is required.");
      // Add any additional logic needed for the Free plan here
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/v1/subscription/`,
        {
          plan: plan,
        }
      );

      const { paystackUrl } = response.data;

      // Redirect user to Paystack payment page for Weekly and Monthly plans
      window.location.href = paystackUrl;
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("There was an issue. Please try again.");
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <Navbar />
      <h2 className="pricing-title">
        Student Pricing <span className="text-sm">(JAMB)</span>
      </h2>
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
            <h3>₦650</h3>
            <ul>
              <li>7 days validity</li>
              <li>Unlimited access to questions</li>
              <li>Full test simulations</li>
              <li>Performance analysis</li>
              <li>Result History</li>
              <li>Email support</li>
            </ul>
            <button>
              <Link style={{ color: "white" }} to="/login">
                Get Started
              </Link>
            </button>
          </div>
        </div>

        {/* Monthly Plan Card */}
        <div className="card">
          <div className="card-header">
            <div className="corner-icon"></div>
            <div className="rating">★★★★</div>
          </div>
          <div className="card-body">
            <h2>MONTHLY</h2>
            <h3>₦2050</h3>
            <ul>
              <li>30 days validity</li>
              <li>Unlimited access to questions</li>
              <li>Full test simulations</li>
              <li>Performance analysis</li>
              <li>Result History</li>
              <li>Priority customer support</li>
            </ul>
            <button>
              <Link style={{ color: "white" }} to="/login">
                Get Started
              </Link>
            </button>
          </div>
        </div>

        {/* Quarterly Plan Card */}
        <div className="card">
          <div className="card-header">
            <div className="corner-icon"></div>
            <div className="rating">★★★★★</div>
          </div>
          <div className="card-body">
            <h2>QUARTERLY</h2>
            <h3>₦6100</h3>
            <ul>
              <li>90 days validity</li>
              <li>Unlimited access to questions</li>
              <li>Full test simulations</li>
              <li>Advanced Performance analysis</li>
              <li>Result History</li>
              <li>Priority customer support</li>
            </ul>
            <button>
              <Link style={{ color: "white" }} to="/login">
                Get Started
              </Link>
            </button>
          </div>
        </div>
      </div>

      <h2 className="pricing-title">
        Enterprise Pricing <span className="text-sm">(JAMB)</span>
      </h2>
      <div className="pricing-cards">
        {/* Monthly Plan Card */}
        <div className="card">
          <div className="card-header">
            <div className="corner-icon"></div>
            <div className="rating">★★★★</div>
          </div>
          <div className="card-body">
            <h2>MONTHLY</h2>
            <h3>₦30,000</h3>
            <ul>
              <li>Maximum of 20 students </li>
              <li>30 days validity</li>
              <li>Unlimited access to questions</li>
              <li>Full test simulations</li>
              <li>Performance analysis</li>
              <li>Result History</li>
              <li>Priority customer support</li>
            </ul>
            <button>
              <Link style={{ color: "white" }} to="/login">
                Get Started
              </Link>
            </button>
          </div>
        </div>

        {/* Monthly Plan Card */}
        <div className="card">
          <div className="card-header">
            <div className="corner-icon"></div>
            <div className="rating">★★★★</div>
          </div>
          <div className="card-body">
            <h2>MONTHLY</h2>
            <h3>₦70,000</h3>
            <ul>
              <li>Maximum of 50 students </li>
              <li>30 days validity</li>
              <li>Unlimited access to questions</li>
              <li>Full test simulations</li>
              <li>Performance analysis</li>
              <li>Result History</li>
              <li>Priority customer support</li>
            </ul>
            <button>
              <Link style={{ color: "white" }} to="/login">
                Get Started
              </Link>
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Pricing;
