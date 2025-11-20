import React, { useEffect, useState } from "react";
import Navbar from "../../Components/ui/Navbar/Navbar";
import Footer from "../../Components/ui/Footer/Footer";
import SubscriptionButton from "./SubscriptionButton";
import axios from "axios";
import img1 from "../../assets/ad1.png";
import img2 from "../../assets/ad2.png";
import img3 from "../../assets/ad3.png";

// ------------------ COMPONENT TYPES ------------------
interface FeatureProps {
  text: string;
}

// interface ReasonProps {
//   emoji: string;
//   title: string;
//   text: string;
// }

interface PricingCardProps {
  name: string;
  price: string;
  id: number;
  features: string[];
  button: string;
  highlight?: boolean;
  setShowModal: any;
  setSelectedPlan: any;
  planType: string;
}

interface Testimonial {
  name: string;
  photo?: string;
  before?: string;
  after: string;
  note?: string;
}

// ------------------ PAGE COMPONENT ------------------
const QuickAccess: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<{
    id: number;
    planType: string;
  } | null>(null);

  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Countdown timer (example: early-access ends in X days from now)
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    // default to 3 days in seconds
    return 4500;
  });
  const [slotsLeft, _] = useState<number>(() => 30); // sample initial slots

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // helper to format time
  const formatCountdown = (t: number) => {
    const days = Math.floor(t / (24 * 3600));
    const hrs = Math.floor((t % (24 * 3600)) / 3600);
    const mins = Math.floor((t % 3600) / 60);
    const secs = Math.floor(t % 60);
    return `${days}d ${String(hrs).padStart(2, "0")}h ${String(mins).padStart(
      2,
      "0"
    )}m ${String(secs).padStart(2, "0")}s`;
  };

  // sample testimonials (replace with real data)
  const testimonials: Testimonial[] = [
    {
      name: "Chinonso I.",
      photo: img2,
      before: "189",
      after: "312",
      note: "From panic to confidence — Lynspeed changed the game.",
    },
    {
      name: "Aisha M.",
      photo: img1,
      before: "205",
      after: "327",
      note: "Mock exams and tracking made all the difference.",
    },
    {
      name: "Tunde O.",
      photo: img3,
      before: "220",
      after: "338",
      note: "I practiced daily and the results spoke for themselves.",
    },
  ];

  const handleSubscribe = async () => {
    if (!email) return alert("Please enter a valid email.");

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/v1/public/initialize/`,
        {
          email,
          plan_id: selectedPlan?.id,
          plan_type: selectedPlan?.planType,
          callback_url: "https://www.lynspeed.com.ng/sale",
          is_enterprise: false,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data) {
        localStorage.setItem("payment_email", email);

        // if there's a payment url returned
        if (response.data.payment_url) {
          window.location.href = response.data.payment_url;
        }
      }

      setShowModal(false);
      setEmail("");
    } catch (error: any) {
      console.error(error);

      const msg =
        error?.response?.data?.email?.[0] || "Something went wrong. Try again.";

      alert(msg);
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center px-4 z-50">
          <div className="bg-white !w-80 !p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold !mb-3">
              Subscribe to {selectedPlan?.planType}
            </h2>

            <label className="text-sm font-medium !mb-1 block">
              Enter your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg !p-2 !mb-4"
              placeholder="you@example.com"
            />

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full bg-[#0659a6] text-white !py-2 rounded-lg font-semibold hover:bg-blue-900 transition">
              {loading ? "Processing..." : "Continue"}
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="w-full !mt-3 text-gray-500 hover:!bg-gray-300 !py-2 text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="bg-[#0659a6] text-white !py-16 !px-6">
        <div className="max-w-5xl !mx-auto text-center">
          <h1 className="!mt-4 text-lg md:text-2xl font-light">
            🔥2026 JAMB PREPARATION STARTS NOW!
          </h1>
          <p className="text-3xl md:text-5xl font-extrabold leading-tight text-amber-300 ">
            Score <span className="font-bold text-amber-300">300+</span> in JAMB
            or Get Left Behind
          </p>

          <p className="!mt-4 max-w-3xl !mx-auto text-base opacity-90">
            Join 20,000+ smart students using Lynspeed’s CBT system, exam
            drills, past questions, and performance tracking to smash JAMB 2026.
          </p>

          <button
            onClick={() => {
              const section = document.getElementById("pricing");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="!mt-8 bg-white text-[#0659a6] hover:!bg-amber-300  !px-8 !py-3 rounded-xl font-semibold text-lg shadow-md  transition">
            Start Free CBT Training
          </button>

          <p className="!mt-3 text-sm opacity-80">
            No registration fee • Cancel anytime
          </p>

          {/* HERO STATS */}
          <div className="!mt-10 grid grid-cols-3 gap-8 text-center">
            <div>
              <p className=" md:text-3xl font-bold">98%</p>
              <p className="text-sm opacity-80">Pass Rate</p>
            </div>
            <div>
              <p className="md:text-3xl font-bold">20,000+</p>
              <p className="text-sm opacity-80">Active Students</p>
            </div>
            <div>
              <p className="md:text-3xl font-bold">300+</p>
              <p className="text-sm opacity-80">Avg Score Jump</p>
            </div>
          </div>
        </div>
      </section>

      {/* URGENCY / SCARCITY SECTION */}
      <section className="!py-6 !px-6 bg-amber-50">
        <div className="max-w-5xl !mx-auto text-center">
          <div className="inline-block bg-white rounded-xl !px-4 !py-3 shadow-md border">
            <p className="text-sm font-semibold text-gray-700">
              EARLY ACCESS BONUS
            </p>
            <p className="text-lg font-bold text-[#0659a6] !mt-1">
              Secure your 2026 advantage — limited early slots
            </p>

            <div className="!mt-3 flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">Seats left</p>
                <p className="text-2xl font-bold text-red-600">{slotsLeft}</p>
              </div>
              <div className="h-12 border-l"></div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Offer ends in</p>
                <p className="text-2xl font-bold">
                  {formatCountdown(timeLeft)}
                </p>
              </div>
            </div>

            <div className="!mt-4">
              <button
                onClick={() => {
                  // scroll to pricing
                  const section = document.getElementById("pricing");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-[#0659a6] text-white !px-6 !py-2 rounded-xl font-semibold shadow">
                Reserve Your Seat Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="!py-14 !px-6 bg-gray-50">
        <div className="max-w-5xl !mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Students Who Prepare with Lynspeed Don’t Beg for Admission
          </h2>

          <div className="!mt-10 grid md:grid-cols-2 gap-6">
            <Feature text="Real CBT Exam Practice" />
            <Feature text="Topic Breakdown in Minutes" />
            <Feature text="Personalized Performance Tracking" />
            <Feature text="24/7 Study Access on Phones" />
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION (ENHANCED) */}
      <section className="!py-10 !px-6">
        <div className="max-w-5xl !mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Why Lynspeed Works
          </h2>

          <div className="!mt-8 grid md:grid-cols-4 gap-4">
            <div className="!p-4 bg-white rounded-lg shadow flex items-start gap-3">
              <div className="text-2xl text-[#0659a6]">🧠</div>
              <div>
                <h4 className="font-semibold">Train Like The Real Exam</h4>
                <p className="text-sm text-gray-600">
                  Timed CBT practice that mirrors JAMB.
                </p>
              </div>
            </div>

            <div className="!p-4 bg-white rounded-lg shadow flex items-start gap-3">
              <div className="text-2xl text-[#0659a6]">📚</div>
              <div>
                <h4 className="font-semibold">Repeated Exam Patterns</h4>
                <p className="text-sm text-gray-600">
                  Past questions, shortcuts & pro tips.
                </p>
              </div>
            </div>

            <div className="!p-4 bg-white rounded-lg shadow flex items-start gap-3">
              <div className="text-2xl text-[#0659a6]">📈</div>
              <div>
                <h4 className="font-semibold">Progress Tracking</h4>
                <p className="text-sm text-gray-600">
                  Daily analytics to fix weak topics fast.
                </p>
              </div>
            </div>

            <div className="!p-4 bg-white rounded-lg shadow flex items-start gap-3">
              <div className="text-2xl text-[#0659a6]">⏱</div>
              <div>
                <h4 className="font-semibold">Micro Practice</h4>
                <p className="text-sm text-gray-600">
                  Short drills that fit busy student lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / TESTIMONIALS */}
      <section className="!py-12 !px-6 bg-white">
        <div className="max-w-5xl !mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Success Stories
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Real students, real score improvements
          </p>

          <div className="!mt-8 grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 !p-4 rounded-lg shadow">
                <div className="flex items-center gap-3">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover border border-gray-300"
                  />

                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm text-gray-500">
                      {t.before ? `From ${t.before}` : ""} →{" "}
                      <span className="text-[#0659a6] font-bold">
                        {t.after}
                      </span>
                    </p>
                  </div>
                </div>
                <p className="!mt-3 text-gray-700 text-sm">{t.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO / HOW IT WORKS */}
      <section className="!py-12 !px-6 bg-gray-50">
        <div className="max-w-5xl !mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            How Lynspeed Works (3 Steps)
          </h2>
          <p className="text-gray-600 !mt-2">
            Simple, repeatable, results-driven
          </p>

          <div className="!mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg !p-6 shadow">
              <div className="text-4xl">1️⃣</div>
              <h4 className="font-bold !mt-3">Subscribe & Get Access</h4>
              <p className="text-sm text-gray-600 !mt-2">
                Choose Weekly, Monthly or Quarterly and start immediately.
              </p>
            </div>
            <div className="bg-white rounded-lg !p-6 shadow">
              <div className="text-4xl">2️⃣</div>
              <h4 className="font-bold !mt-3">Train Daily</h4>
              <p className="text-sm text-gray-600 !mt-2">
                Timed CBT tests, topic drills and weekly challenges.
              </p>
            </div>
            <div className="bg-white rounded-lg !p-6 shadow">
              <div className="text-4xl">3️⃣</div>
              <h4 className="font-bold !mt-3">Track & Improve</h4>
              <p className="text-sm text-gray-600 !mt-2">
                Instant feedback and targeted practice until you reach 300+.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="!py-16 !px-6 bg-gray-50">
        <div className="max-w-5xl !mx-auto text-center">
          <h2 className="text-3xl font-bold">Start Now. Choose Your Plan.</h2>

          <div className="!mt-10 grid md:grid-cols-3 gap-6">
            <PricingCard
              name="Weekly Boost"
              price="₦650/week"
              features={[
                "JAMB CBT Practice",
                "Past Questions",
                "Score Tracking",
                "24/7 Mobile Access",
              ]}
              button="Start 7 Days"
              id={1}
              setShowModal={setShowModal}
              setSelectedPlan={setSelectedPlan}
              planType="Weekly"
            />

            <PricingCard
              highlight
              name="Monthly Pro"
              price="₦2,050/month"
              features={[
                "Everything in Weekly",
                "Topic-by-topic Insights",
                "Weakness Analysis",
                "Higher Score Guarantee",
              ]}
              button="Start 1 Month"
              id={2}
              setShowModal={setShowModal}
              setSelectedPlan={setSelectedPlan}
              planType="Monthly"
            />

            <PricingCard
              name="Quarter Master"
              price="₦6,100/3 months"
              features={[
                "Long term score growth",
                "AI Performance Guide",
                "All study resources",
                "Best success rate",
              ]}
              button="Start 3 Months"
              id={3}
              setShowModal={setShowModal}
              setSelectedPlan={setSelectedPlan}
              planType="Quarterly"
            />
          </div>

          <p className="text-red-600 text-center font-bold !mt-6">
            Prices will go up soon!
          </p>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="!py-10 !px-6 bg-white">
        <div className="max-w-5xl !mx-auto text-center">
          <h3 className="text-xl font-bold">Our Promise</h3>
          <p className="text-gray-600 mt-2">
            Try Lynspeed risk-free — cancel anytime. We’re confident our 300+
            system will help you improve your score or get actionable guidance
            to keep improving.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="!py-12 !px-6 bg-gray-50">
        <div className="max-w-5xl !mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Frequently Asked Questions
          </h2>

          <div className="!mt-8 space-y-4">
            <FaqItem
              q="How do I start practicing immediately?"
              a="Choose a plan and complete payment — you'll get instant access to the dashboard and CBT practice."
            />
            <FaqItem
              q="Can I cancel anytime?"
              a="Yes. You can cancel your subscription at any time from your account settings."
            />
            <FaqItem
              q="Do I need a laptop?"
              a="No. Lynspeed is optimized for mobile — you can practice on any smartphone or tablet."
            />
            <FaqItem
              q="What payment methods are accepted?"
              a="Paystack and Flutterwave (cards, bank transfers, and mobile payments)."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="!py-16 !px-6 text-center bg-white">
        <h2 className="text-3xl md:text-4xl text-red-600 font-extrabold">
          ⚠ 92% of Students Who Start Late Score Under 200
        </h2>
        <p className="!mt-4 text-gray-600 max-w-xl !mx-auto">
          Starting now can be the difference between Celebrating Admission or
          Rewriting JAMB.
        </p>
        <div className="!mt-6 flex items-center justify-center gap-4">
          <a
            href="#pricing"
            className="bg-[#0659a6] text-white !px-8 !py-3 rounded-xl text-lg font-semibold hover:bg-blue-900 transition">
            Start Your 300+ Journey Now
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default QuickAccess;

// ------------------ REUSABLE COMPONENTS ------------------

const Feature: React.FC<FeatureProps> = ({ text }) => (
  <div className="flex items-center !gap-3 bg-white shadow !p-4 rounded-lg">
    <span className="text-[#0659a6] text-xl">✔</span>
    <p className="font-medium text-gray-700">{text}</p>
  </div>
);

// const Reason: React.FC<ReasonProps> = ({ emoji, title, text }) => (
//   <div className="!p-6 bg-white shadow rounded-xl">
//     <div className="text-4xl !mb-3">{emoji}</div>
//     <h3 className="font-bold text-lg !mb-1">{title}</h3>
//     <p className="text-gray-600 text-sm">{text}</p>
//   </div>
// );
const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  id,
  features,
  button,
  highlight,
  setSelectedPlan,
  setShowModal,
  planType,
}) => (
  <div
    className={`!p-6 rounded-xl shadow-lg border ${
      highlight ? "border-blue-600 scale-105 bg-white" : "bg-white"
    }`}>
    {highlight && (
      <p className="text-sm text-amber-300 font-bold !mb-2">
        Most Students Choose This
      </p>
    )}

    <h3 className="text-xl font-bold">{name}</h3>
    <p className="text-3xl font-bold !mt-2 text-[#0659a6]">{price}</p>

    <ul className="!mt-4 space-y-2 text-gray-600 text-sm">
      {features.map((f, i) => (
        <li key={i}>✔ {f}</li>
      ))}
    </ul>

    <SubscriptionButton
      label={button}
      plan={planType}
      price={Number(price.replace(/\D/g, ""))}
      highlight={highlight}
      id={id}
      onSelectPlan={(planName, planId) => {
        setSelectedPlan({ id: planId, planType: planName });
        setShowModal(true);
      }}
    />
  </div>
);

// FAQ item component
const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg !p-4 bg-white">
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex justify-between items-center w-full hover:!bg-transparent"
        aria-expanded={open}>
        <span className="font-semibold">{q}</span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="!mt-3 text-gray-600">{a}</p>}
    </div>
  );
};
