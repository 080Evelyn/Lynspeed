import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAuth } from "./State/Auth/Action";
import { AppDispatch } from './State/Store';
import Home from "./Pages/About/About";
import About from "./Pages/Blog/Blog";
import Blog from "./Pages/Blog/Blog";
import Pricing from "./Pages/Pricing/Pricing";
import Contact from "./Pages/Contact/Contact";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Home/Login";
import SubjectSelection from "./Pages/Home/Dashboard/Test/SubjectSelection";
import Dashboard from "./Pages/Home/Dashboard/Dashboard";
import Test from "./Pages/Home/Dashboard/Test/Test";
import TestResult from "./Pages/Home/Dashboard/Result/TestResult/TestResult";
import Performance from "./Pages/Home/Dashboard/Performance/Performance";
import SignOut from "./Pages/Home/SignOut";
import ResultHistory from "./Pages/Home/Dashboard/ResultHistory/ResultHistory";
import Terms from "./Components/ui/Terms/Terms";
import Notification from "./Pages/Home/Dashboard/Notification/Notification";
import Achievement from "./Pages/Home/Dashboard/Achievement/Achievement";
import Privacy from "./Components/ui/Privacy/Privacy";
import ForgotPassword from "./Pages/Home/Dashboard/ForgotPassword";
import ResetPassword from "./Pages/Home/Dashboard/ResetPassword";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import PrivateRoute from "./Components/PrivateRoute"; // Import the PrivateRoute component

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Initialize auth state from localStorage on app load
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signout" element={<SignOut />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/subjectselection" element={<PrivateRoute element={<SubjectSelection />} />} />
        <Route path="/test" element={<PrivateRoute element={<Test />} />} />
        <Route path="/forgotPassword" element={<PrivateRoute element={<ForgotPassword />} />} />
        <Route path="/resetPassword" element={<PrivateRoute element={<ResetPassword />} />} />
        <Route path="/privacy" element={<PrivateRoute element={<Privacy />} />} />
        <Route path="/notification" element={<PrivateRoute element={<Notification />} />} />
        <Route path="/testresult" element={<PrivateRoute element={<TestResult />} />} />
        <Route path="/resulthistory" element={<PrivateRoute element={<ResultHistory />} />} />
        <Route path="/performance" element={<PrivateRoute element={<Performance />} />} />
        <Route path="/achievements" element={<PrivateRoute element={<Achievement />} />} />
      </Routes>
    </Router>
  );
};

export default App;
