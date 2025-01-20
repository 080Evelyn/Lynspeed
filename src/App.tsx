import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Blog from "./Pages/Blog/Blog";
import Pricing from "./Pages/Pricing/Pricing";
import Contact from "./Pages/Contact/Contact";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Home/Login";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./Pages/Home/Dashboard/Dashboard";
import SubjectSelection from "./Pages/Home/Dashboard/Test/SubjectSelection";
import ResultHistory from "./Pages/Home/Dashboard/ResultHistory/ResultHistory";
import Performance from "./Pages/Home/Dashboard/Performance/Performance";
import Achievement from "./Pages/Home/Dashboard/Achievement/Achievement";
import Notification from "./Pages/Home/Dashboard/Notification/Notification";
import ForgotPassword from "./Pages/Home/Dashboard/ForgotPassword";
import ResetPassword from "./Pages/Home/Dashboard/ResetPassword";
import TestResult from "./Pages/Home/Dashboard/Result/TestResult/TestResult";
import Test from "./Pages/Home/Dashboard/Test/Test";
import Subscription from "./Pages/Home/Dashboard/Profile/Subscription";
import FAQ from "./Components/ui/FAQ/FAQ";
import Privacy from "./Components/ui/Privacy/Privacy";
import Terms from "./Components/ui/Terms/Terms";
import CorrectionPage from "./Pages/Home/Dashboard/Result/CorrectionPage";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subjectselection" element={<SubjectSelection />} />
          <Route path="/resulthistory" element={<ResultHistory />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/achievement" element={<Achievement />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/testresult" element={<TestResult />} />
          <Route path="/test" element={<Test />} />
          <Route path="/correctionPage" element={<CorrectionPage />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/adminPanel" element={<AdminPanel />} />
        </Route>

       
      </Routes>
    </Router>
  );
};

export default App;
