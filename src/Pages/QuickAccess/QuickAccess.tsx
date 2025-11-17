import React from "react";
import Navbar from "../../Components/ui/Navbar/Navbar";
import Footer from "../../Components/ui/Footer/Footer";
import { Link } from "react-router-dom";
import SubscriptionButton from "./SubscriptionButton";

// ------------------ COMPONENT TYPES ------------------
interface FeatureProps {
  text: string;
}

interface ReasonProps {
  emoji: string;
  title: string;
  text: string;
}

interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  button: string;
  highlight?: boolean;
}

// ------------------ PAGE COMPONENT ------------------
const QuickAccess: React.FC = () => {
  return (
    <>
      <Navbar />

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
              <p className="text-3xl font-bold">98%</p>
              <p className="text-sm opacity-80">Pass Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold">20,000+</p>
              <p className="text-sm opacity-80">Active Students</p>
            </div>
            <div>
              <p className="text-3xl font-bold">300+</p>
              <p className="text-sm opacity-80">Avg Score Jump</p>
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

      {/* WHY JOIN SECTION */}
      <section className="!py-14 !px-6">
        <div className="max-w-5xl !mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Why 2026 JAMB Students Are Joining Lynspeed Now
          </h2>

          <div className="!mt-10 grid md:grid-cols-3 gap-6">
            <Reason
              emoji="🎯"
              title="Beat Competition Early"
              text="JAMB starts in May 2026. Champions are training in 2025."
            />
            <Reason
              emoji="💡"
              title="Learn Faster"
              text="Smart CBT patterns that repeat real JAMB questions."
            />
            <Reason
              emoji="📈"
              title="Track Performance"
              text="Know weak topics, fix them, and increase your score daily."
            />
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
            />
          </div>
        </div>
      </section>

      {/* CTA WARNING SECTION */}
      <section className="!py-16 !px-6 text-center bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-red-600">
          ⚠ 92% of Students Who Start Late Score Under 200
        </h2>
        <p className="!mt-3 text-gray-600 max-w-xl !mx-auto">
          Starting now can be the difference between celebrating admission or
          rewriting JAMB.
        </p>
        <Link to={"/login"}>
          <button className="!mt-6 bg-[#0659a6] text-white !px-10 !py-3 rounded-xl text-lg font-semibold hover:bg-blue-900 transition">
            Start Your 300+ Journey Now
          </button>
        </Link>
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

const Reason: React.FC<ReasonProps> = ({ emoji, title, text }) => (
  <div className="!p-6 bg-white shadow rounded-xl">
    <div className="text-4xl !mb-3">{emoji}</div>
    <h3 className="font-bold text-lg !mb-1">{title}</h3>
    <p className="text-gray-600 text-sm">{text}</p>
  </div>
);

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  features,
  button,
  highlight,
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
      plan={name}
      price={Number(price.replace(/\D/g, ""))} // extract "2050" from "₦2,050"
      highlight={highlight}
    />
  </div>
);
