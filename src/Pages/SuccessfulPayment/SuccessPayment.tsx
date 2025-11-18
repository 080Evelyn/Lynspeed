import React, { useEffect, useState } from "react";
import Navbar from "../../Components/ui/Navbar/Navbar";
import Footer from "../../Components/ui/Footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  // NEW STATES
  const [loadingVerification, setLoadingVerification] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<
    "success" | "failed" | null
  >(null);
  const [verificationMessage, setVerificationMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // HANDLE LOGIN
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
  };

  // 🚀 NEW: VERIFY PAYMENT ON LOAD
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const reference = new URLSearchParams(window.location.search).get(
          "reference"
        );

        // Retrieve email stored earlier during subscription initialization
        const storedEmail = localStorage.getItem("payment_email");

        if (!reference || !storedEmail) {
          setVerificationStatus("failed");
          setVerificationMessage(
            "Verification failed: Missing reference or email."
          );
          setLoadingVerification(false);
          return;
        }

        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}api/v1/public/verify/`,
          {
            reference,
            email: storedEmail,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        // If verification was successful
        if (response.status === 200) {
          setVerificationStatus("success");
          setVerificationMessage("Payment verified successfully!");
        }
      } catch (error: any) {
        console.error(error);

        setVerificationStatus("failed");
        setVerificationMessage(
          error?.response?.data?.message || "Payment verification failed."
        );
      }

      setLoadingVerification(false);
    };

    verifyPayment();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center !px-4 text-white">
        <div className="bg-white text-[#0659a6] rounded-2xl shadow-xl !p-8 max-w-xl w-full text-center">
          {/* LOADING STATE */}
          {loadingVerification && (
            <div className="text-center py-10">
              <h1 className="text-2xl font-bold">Verifying Payment...</h1>
              <p className="text-gray-500 mt-2">Please wait.</p>
            </div>
          )}

          {/* FAILED VERIFICATION */}
          {!loadingVerification && verificationStatus === "failed" && (
            <>
              <h1 className="text-3xl font-bold !mb-3 text-red-600">
                ❌ Verification Failed
              </h1>
              <p className="text-gray-700 !mb-4">{verificationMessage}</p>

              <button
                onClick={() => (window.location.href = "/pricing")}
                className="bg-red-600 text-white !px-6 !py-3 rounded-xl hover:bg-red-700 transition font-semibold">
                Try Again
              </button>
            </>
          )}

          {/* SUCCESS SECTION */}
          {!loadingVerification && verificationStatus === "success" && (
            <>
              <h1 className="text-3xl font-bold !mb-3">✅ Payment Verified!</h1>

              <p className="text-lg !mb-4">
                Welcome to the top 1% of students who prepare smart.
              </p>

              <p className="text-base !mb-6 text-gray-700">
                Your subscription includes:
              </p>

              <ul className="text-left text-gray-700 space-y-2 !mb-6 mx-auto w-fit">
                <li>✔ Full JAMB CBT access</li>
                <li>✔ Smart topic breakdowns</li>
                <li>✔ Past exam patterns & simulations</li>
                <li>✔ Score tracking & improvement insights</li>
                <li>✔ 24/7 mobile access to your dashboard</li>
              </ul>
              <p className="text-gray-600 !mb-6">
                Thank you for subscribing. If you don’t have an account yet,
                please register to access all your student resources. If you
                already have an account, feel free to log in and get started.
              </p>
              <div className="flex gap-3 justify-center">
                <Link to={"/register/student"}>
                  <button
                    // onClick={() => setShowModal(true)}
                    className="bg-[#0659a6] text-white !px-6 !py-3 rounded-xl shadow-md hover:bg-[#054b8c] transition font-semibold">
                    Register
                  </button>
                </Link>

                <Link to={"/login"}>
                  <button
                    // onClick={() => setShowModal(true)}
                    className="bg-[#0659a6] text-white !px-6 !py-3 rounded-xl shadow-md hover:bg-[#054b8c] transition font-semibold">
                    Login
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Login Modal */}
        {showModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl shadow-lg !p-6 w-full max-w-md relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-600 text-xl hover:text-gray-800 hover:!bg-transparent">
                ×
              </button>

              <h2 className="text-2xl font-bold text-[#0659a6] !mb-4 text-center">
                Login to Your Dashboard
              </h2>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-gray-700 text-sm">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full !px-4 !py-3 border rounded-lg !mt-1 focus:outline-none focus:ring focus:ring-[#0659a6]/40"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-gray-700 text-sm">Password</label>
                  <input
                    type="password"
                    required
                    className="w-full !px-4 !py-3 border rounded-lg !mt-1 focus:outline-none focus:ring focus:ring-[#0659a6]/40"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0659a6] text-white !py-3 rounded-lg font-semibold hover:bg-[#054b8c] transition">
                  Login
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default PaymentSuccess;
