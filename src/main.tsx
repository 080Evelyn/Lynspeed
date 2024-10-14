import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Pricing from "./Pages/Pricing/Pricing";
import Contact from "./Pages/Contact/Contact";
import Blog from "./Pages/Blog/Blog";
import Login from "./Pages/Home/Login";
import Register from "./Pages/Register/Register";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "pricing",
    element: <Pricing />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "blog",
    element: <Blog />,
  },
  {
    path: "privacy",
    element: <Privacy />,
  },
  {
    path: "terms",
    element: <Terms />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "signout",
    element: <SignOut />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "subjectselection",
    element: <SubjectSelection />,
  },
  {
    path: "testresult",
    element: <TestResult />,
  },
  {
    path: "test",
    element: <Test />,
  },
  {
    path: "achievement",
    element: <Achievement />,
  },
  {
    path: "notification",
    element: <Notification />,
  },
  {
    path: "resulthistory",
    element: <ResultHistory />,
  },

  {
    path: "performance",
    element: <Performance />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
