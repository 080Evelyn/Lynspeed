// SignOut.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../State/Auth/Action";
import { AppDispatch } from "../../State/Store"; // Path to where store is defined
import "./SignOut.css";
import { resetSavedSubject } from "../../State/SavedSubjectListSlice";
import { resetSkill } from "../../State/SkillsSlice";
import { resetSubjectList } from "../../State/SubjectListSlice";
import { resetValidate } from "../../State/PaymentValidationSlice";

const SignOut: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch for typed dispatch

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");

    // Dispatch the logout action
    dispatch(logout());
    dispatch(resetSavedSubject());
    dispatch(resetSkill());
    dispatch(resetSubjectList());
    dispatch(resetValidate());
    navigate("/login");
  };

  return (
    <button onClick={handleSignOut} className="sign-out-btn">
      Sign Out
    </button>
  );
};

export default SignOut;
