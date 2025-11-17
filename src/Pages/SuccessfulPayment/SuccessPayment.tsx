import React, { useState } from "react";
import Navbar from "../../Components/ui/Navbar/Navbar";
import Footer from "../../Components/ui/Footer/Footer";

const PaymentSuccess: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Add your login API logic here
    console.log("Logging in with:", email, password);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center !px-4 text-white">
        <div className="bg-white text-[#0659a6] rounded-2xl shadow-xl !p-8 max-w-xl w-full text-center">
          <h1 className="text-3xl font-bold !mb-3">✅ Payment Successful!</h1>

          <p className="text-lg !mb-4">
            Welcome to the top 1% of students who don’t just dream about 300+ in
            JAMB… they <span className="font-semibold">prepare</span> for it.
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

          <p className="text-gray-600 text-sm !mb-6">
            If you are not logged in automatically, use your registered details
            to continue.
          </p>

          <p className="text-[#0659a6] font-medium !mb-6">
            💡 Don’t stop now. Your competition is reading. You should be
            practicing. Let’s start winning 🚀
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="bg-[#0659a6] text-white !px-6 !py-3 rounded-xl shadow-md hover:bg-[#054b8c] transition font-semibold">
            Enter Dashboard
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl shadow-lg !p-6 w-full max-w-md relative">
              {/* Close Button */}
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
