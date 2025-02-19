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
import AllSupplierOrders from "../pages/supplierOrders/AllSupplierOrders";
import SupplierOrderList from "../pages/supplierOrders/SupplierOrderList";
import AllTenders from "../pages/tender/AllTenders";
import AddTender from "../pages/tender/AddTender";
import Stocks from "../pages/stock/Stocks";
import AddStock from "../pages/stock/AddStock";
import AddStockOrder from "../pages/stock/AddStockOrder";
import PharmacyOrders from "../pages/pharmacyOrders/PharmacyOrders";
import PharmacyOrderForFarmacy from "../pages/pharmacyOrders/PharmacyOrderForFarmacy";
import ViewTenderSubmissions from "../pages/tender/ViewTenderSubmissions";

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
      {
        path: "/all-supplier-orders",
        element: <PrivateRoute element={<AllSupplierOrders />} />,
      },
      {
        path: "/tenders",
        element: <PrivateRoute element={<AllTenders />} />,
      },
      {
        path: "/add-tender",
        element: <PrivateRoute element={<AddTender />} />,
      },
      {
        path: "/stocks",
        element: <PrivateRoute element={<Stocks />} />,
      },
      {
        path: "/add-stock-order/:id",
        element: <PrivateRoute element={<AddStockOrder />} />,
      },
      {
        path: "/pharmacy-orders",
        element: <PrivateRoute element={<PharmacyOrders />} />,
      },
      {
        path: "/orders",
        element: <PrivateRoute element={<PharmacyOrderForFarmacy />} />,
      },
      {
        path: "/tender-submissions/:id",
        element: <PrivateRoute element={<ViewTenderSubmissions />} />,
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
      {
        path: "supplier-orders",
        element: <PrivateRoute element={<SupplierOrderList />} />,
      },
    ],
  },
]);

export default router;
