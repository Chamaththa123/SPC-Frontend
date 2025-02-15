import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import SignIn from "../pages/backOffice/SignIn";
import { Dashboard } from "../pages/backOffice/Dashboard";
import PrivateRoute from "./PrivateRoute";
import { GuestLayout } from "../components/layouts/GuestLayout";
import { SignUp } from "../pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <PrivateRoute element={<Dashboard />} />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/supplier-register",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
