import React from "react";
import SignUp from "./Signup.js";
import Admin from "./Admin.js";
import Borrower from "./Borrower.js";
import Lender from "./Lender.js";
import Lender_history from "./Lender_history.js";
import Lender_main from "./Lender_main.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "/Admin",
    element: <Admin />,
  },
  {
    path: "/Borrower",
    element: <Borrower />,
  },
  {
    path: "/Lender",
    element: <Lender />,
  },
  {
    path: "/Lender_history",
    element: <Lender_history />,
  },
  {
    path: "Lender_main",
    element: <Lender_main />,
  },
]);

export const App = () => (
  <div>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </div>
);
