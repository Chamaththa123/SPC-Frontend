/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../../contexts/UserContext";

export const GuestLayout = () => {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <section className="bg-gray-100 flex min-h-screen w-full">
      <Outlet />
    </section>
  );
};