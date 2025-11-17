import React from "react";

interface SubscriptionButtonProps {
  label: string;
  plan: string;
  price: number;
  highlight?: boolean;
  loading?: boolean;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
  label,
  plan,
  price,
  highlight,
}) => {
  const onSubscribe = (plan: string, price: number) => {
    console.log(plan, price);
  };
  return (
    <button
      // disabled={loading}
      onClick={() => onSubscribe(plan, price)}
      className={`!mt-6 w-full text-white !py-3 rounded-lg font-semibold transition
      ${
        highlight
          ? "bg-amber-300 hover:!bg-amber-500"
          : "bg-[#0659a6] hover:bg-blue-900"
      }
     
      `}>
      {label}
    </button>
  );
};

export default SubscriptionButton;
