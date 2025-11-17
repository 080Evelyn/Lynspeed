import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
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
import OnboardingPage from "./Pages/Onboarding/OnboardingPage";
import RegisterEnterprise from "./Pages/Register/RegisterEnterprise";
import EnterpriseSubscription from "./Pages/Home/Dashboard/Profile/EnterpriseSubscription";
import Students from "./Pages/Home/Dashboard/Students/Students";
import StudentSignUp from "./Pages/Home/Dashboard/StudentSignup/StudentSignUp";
import StudentLink from "./Pages/Home/Dashboard/StudentSignup/StudentLink";
import StudentResults from "./Pages/Home/Dashboard/Result/StudentResults";
import Subs from "./Pages/Home/Dashboard/Subs/Subs";
import StudentsBySub from "./Pages/Home/Dashboard/Students/StudentsBySub";
import ViewResult from "./Pages/Home/Dashboard/Result/ViewResult";
import QuickAccess from "./Pages/QuickAccess/QuickAccess";
import PaymentSuccess from "./Pages/SuccessfulPayment/SuccessPayment";

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
        <Route path="/register/student" element={<Register />} />
        <Route path="/register/enterprise" element={<RegisterEnterprise />} />
        <Route path="/careerQuiz" element={<CareerQuiz />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/live" element={<QuickAccess />} />
        <Route path="/sale" element={<PaymentSuccess />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
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
          <Route path="/subs" element={<Subs />} />
          <Route path="/students-by-id" element={<StudentsBySub />} />
          <Route path="/view-result" element={<ViewResult />} />
          <Route
            path="/enterprice-subscription"
            element={<EnterpriseSubscription />}
          />
          <Route path="/registered-students" element={<Students />} />
          <Route path="/register-students" element={<StudentSignUp />} />
          <Route path="/link-existing-student" element={<StudentLink />} />
          <Route path="/students-result" element={<StudentResults />} />
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
