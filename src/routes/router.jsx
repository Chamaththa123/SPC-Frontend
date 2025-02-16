import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import SignIn from "../pages/backOffice/SignIn";
import { Dashboard } from "../pages/backOffice/Dashboard";
import PrivateRoute from "./PrivateRoute";
import { GuestLayout } from "../components/layouts/GuestLayout";
import { SignUp } from "../pages/SignUp";
import { SupplierLayout } from "../components/layouts/SupplierLayout";
import Tender from "../pages/tender/Tender";
import TenderSubmission from "../pages/tender/TenderSubmission";
import SupplierTenderSubmittion from "../pages/supplier/SupplierTenderSubmittion";
import Suppliers from "../pages/supplier/Suppliers";
import PendingSuppliers from "../pages/supplier/PendingSuppliers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <PrivateRoute element={<Dashboard />} />,
      },
      {
        path: "/suppliers",
        element: <PrivateRoute element={<Suppliers />} />,
      },
      {
        path: "/pending-suppliers",
        element: <PrivateRoute element={<PendingSuppliers />} />,
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
  {
    path: "/supplier",
    element: <SupplierLayout />,
    children: [
      {
        path: "tender",
        element: <Tender />,
      },
      {
        path: "tender-submission/:id",
        element: <TenderSubmission />,
      },
      {
        path: "tender-submission",
        element: <SupplierTenderSubmittion />,
      },
    ],
  },
]);

export default router;
