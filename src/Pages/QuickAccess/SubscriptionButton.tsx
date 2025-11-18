import React from "react";

interface SubscriptionButtonProps {
  label: string;
  plan: string;
  price: number;
  highlight?: boolean;
  loading?: boolean;
  id: number;
  onSelectPlan?: (plan: string, id: number) => void; // NEW
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
  label,
  plan,
  highlight,
  id,
  onSelectPlan,
}) => {
  return (
    <button
      onClick={() => onSelectPlan?.(plan, id)}
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
