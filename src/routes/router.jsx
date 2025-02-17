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
import Drugs from "../pages/drug/Drugs";
import EditDrugs from "../pages/drug/EditDrugs";
import AddDrug from "../pages/drug/AddDrug";
import Facility from "../pages/facility/Facility";
import AddFacility from "../pages/facility/AddFacility";
import UpdateDrugStock from "../pages/drug/UpdateDrugStock";
import AddFacilityUsers from "../pages/facility/AddFacilityUsers";
import SupplierOrder from "../pages/drug/SupplierOrder";

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
      {
        path: "/drugs",
        element: <PrivateRoute element={<Drugs />} />,
      },
      {
        path: "/drugs/:id",
        element: <PrivateRoute element={<EditDrugs />} />,
      },
      {
        path: "/add-drugs",
        element: <PrivateRoute element={<AddDrug />} />,
      },
      {
        path: "/add-drugs",
        element: <PrivateRoute element={<AddDrug />} />,
      },
      {
        path: "/drug/stock-update/:id",
        element: <PrivateRoute element={<UpdateDrugStock />} />,
      },
      {
        path: "/drug/order-by-supplier/:id",
        element: <PrivateRoute element={<SupplierOrder />} />,
      },
      {
        path: "/facility",
        element: <PrivateRoute element={<Facility />} />,
      },
      {
        path: "/add-facility",
        element: <PrivateRoute element={<AddFacility />} />,
      },
      {
        path: "/add-facility-users/:id",
        element: <PrivateRoute element={<AddFacilityUsers />} />,
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
