import { CheckCircle } from "lucide-react";
import success from "../../../../assets/successImg.png";
import { CgDanger } from "react-icons/cg";
interface PaymentText {
  text: string;
}

const PaymentValidationText = ({ text }: PaymentText) => {
  return (
    <div className="validation w-[80%] left-[10%] md:w-[40%] md:left-[30%] !py-5">
      <article className="md:w-[60%]  !m-auto">
        <CheckCircle className="w-8 h-8 text-green-500 !mt-1 !mx-auto flex-shrink-0" />
        <h2 className="font-semibold">{text}</h2>
      </article>
      {text === "your payment has been successfully verified" && (
        <img src={success} alt="img" />
      )}
      {text ===
        "Payment status: abandoned. Please contact support if you need assistance." && (
        <div className=" flex justify-center">
          <CgDanger className=" text-red-500" size={36} />
        </div>
      )}
    </div>
  );
};

export default PaymentValidationText;
