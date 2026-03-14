import React from "react";
import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import ProtectedLayout from "./components/ProtectedLayout";

// Pages Imports
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/Home";
import AddNote from "./pages/AddNote";

const router = createBrowserRouter([
  // Public routes
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  // Protected Routes
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-note",
        element: <AddNote />,
      },
    ],
  },
]);

export default router;
