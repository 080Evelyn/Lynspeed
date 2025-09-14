import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
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
import NotAuthorized from "./Components/NotAuthorized";
import Lynogpanel from "./Pages/AdminPanel/Lynogpanel";
// Import InstallPWA component
import InstallPWA from "./Components/InstallPWA";
import ChatButton from "./Components/ChatBtn";
import CareerQuiz from "./Pages/CareerQuiz/CareerQuiz";
import Quiz from "./Pages/Home/Dashboard/CareerQuiz/Quiz";
import Mentorship from "./Pages/Home/Dashboard/Mentorship/Mentorship";
import Skills from "./Pages/Skills/Skills";
import InAppSkill from "./Pages/Home/Dashboard/InAppSkill/InAppSkill";
import Verify from "./Pages/Home/Dashboard/veriffy/Verify";
import PaymentValidation from "./Pages/Home/Dashboard/Profile/PaymentValidation";
import Adsense from "./Components/Adsense";


const PublicLayout = () => {
  return (
    <>
      <Outlet />
      <Adsense slot="2346071390" /> {/* Replace with your Ad Slot ID */}
    </>
  );
};
const App = () => {
  return (
    <Router>
      <InstallPWA /> {/* Add this line to make the prompt appear globally */}
      {/* Add Chat Button Globally */}
      <ChatButton />
      <Routes>
        {/* ✅ Public Routes with Adsense */}
        <Route element={<PublicLayout />}></Route>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/careerQuiz" element={<CareerQuiz />} />
        <Route path="/skills" element={<Skills />} />
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
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/inappskill" element={<InAppSkill />} />
          <Route path="/resulthistory" element={<ResultHistory />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/achievement" element={<Achievement />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/testresult" element={<TestResult />} />
          <Route path="/test" element={<Test />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/validate" element={<PaymentValidation />} />
          <Route path="/correctionPage" element={<CorrectionPage />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/lynogpanel" element={<Lynogpanel />} />
          <Route path="/notAuthorized" element={<NotAuthorized />} />
        </Route>

        {/* Admin Authentication Routes */}
        {/* <Route
          path="/adminPanel"
          element={
            <AdminProtectedRoute is_admin={true}>
              <AdminPanel />
            </AdminProtectedRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
