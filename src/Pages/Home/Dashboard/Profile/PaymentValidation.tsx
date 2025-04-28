// import { useEffect, useState } from "react";
// import { AppDispatch, RootState } from "../../../../State/Store";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { setValidate } from "../../../../State/PaymentValidationSlice";
// import PaymentValidationText from "./PaymentValidationText";

// const PaymentValidation = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const token = localStorage.getItem("authToken");
//   //   const validate = useSelector(
//   //     (state: RootState) => state.paymentValidate.validate
//   //   );
//   const [paymentVerify, setPaymentVerify] = useState(false);
//   const [paymentNotVerify, setPaymentNotVerify] = useState(false);
//   //   const [error, setError] = useState("");
//   const [verifiactionLoading, setVerificationLoading] = useState(false);
//   const validatePayment = async () => {
//     const referenceId = localStorage.getItem("referenceId");

//     if (!referenceId) {
//       return;
//     }
//     setPaymentNotVerify(false);
//     setPaymentVerify(false);
//     setVerificationLoading(true);

//     try {
//       const response = await axios.post(
//         `https://lynspeed.pythonanywhere.com/api/v1/payment/verify/`,
//         {
//           reference: referenceId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Add token to Authorization header
//           },
//         }
//       );
//       console.log(response);
//       if (response.statusText === "OK") {
//         setPaymentVerify(true);
//         localStorage.removeItem("referenceId");
//         setVerificationLoading(false);
//         dispatch(setValidate(false));
//       }
//     } catch (error: any) {
//       console.error("Validation error:", error.response.data.status);
//       if (error.response.data.status === "abandoned") {
//         dispatch(setValidate(false));
//         setPaymentNotVerify(true);
//         localStorage.removeItem("referenceId");
//       }
//     } finally {
//       setVerificationLoading(false);
//     }
//   };
//   useEffect(() => {
//     validatePayment();
//   }, []);
//   return (
//     <div className="text-center">
//       {verifiactionLoading ? (
//         <h2>loading...</h2>
//       ) : (
//         <>
//           {paymentVerify && (
//             <>
//               <PaymentValidationText
//                 text={"your payment has been successfuly verified"}
//               />
//               <div
//                 onClick={() => {
//                   setPaymentVerify(false);
//                 }}
//                 className="modal "></div>
//             </>
//           )}
//           {paymentNotVerify && (
//             <>
//               <PaymentValidationText
//                 text={
//                   "Payment status: abandoned. Please contact support if you need assistance."
//                 }
//               />

//               <div
//                 onClick={() => {
//                   setPaymentNotVerify(false);
//                 }}
//                 className="modal"></div>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default PaymentValidation;
