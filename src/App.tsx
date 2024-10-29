import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/Pages/About/About";
import About from "../src/Pages/Blog/Blog";
import Blog from "../src/Pages/Blog/Blog";
import Pricing from "../src/Pages/Pricing/Pricing";
import Contact from "../src/Pages/Contact/Contact";
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subjectselection" element={<SubjectSelection />} />
        <Route path="/test" element={<Test />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/testresult" element={<TestResult />} />
        <Route path="/resulthistory" element={<ResultHistory />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/achievements" element={<Achievement />} />
      </Routes>
    </Router>
  );
};

export default App;
