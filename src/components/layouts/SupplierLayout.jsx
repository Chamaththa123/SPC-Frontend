import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, Outlet, Navigate, useLocation } from "react-router-dom";
import { Burger } from "../../utils/icons";
import { SideBar } from "./SideBar";
import { Card, Tooltip, IconButton } from "@material-tailwind/react";
import { BellIcon, UserIcon } from "@heroicons/react/24/solid";
import { useStateContext } from "../../contexts/UserContext";
import axiosClient from "../../../axios-client";

export const SupplierLayout = () => {
  const [signOutVisible, setSignOutVisible] = useState(false);
  const dropdownRef = useRef(null);

  const { token, setUser, setToken, user } = useStateContext();
  const handleLogout = () => {
    setUser(null);
    setToken(null);
  };

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userString = queryParams.get("user");
    const token = queryParams.get("token");
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
      setToken(token);
    }
  }, [location.search]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleUserIconClick = () => {
    setSignOutVisible(!signOutVisible);
  };

  return (
    <section className="bg-white w-full min-h-screen flex">
      <section className="w-[100%] md:w-full flex flex-col gap-5 ">
        <Card className="h-16 rounded-none w-full p-3 pl-3 flex flex-row justify-between items-center bg-white">
          <a href="/supplier/tender">SPC Supplier Portal</a>
          <div>
            <div className="flex items-center justify-between">
              <div
                className="relative flex gap-5 justify-center items-center"
                ref={dropdownRef}
              >
                <div>
                  <a
                    className="bg-[#1b4172] p-3 text-white text-[14px] rounded-lg"
                    href="/supplier/supplier-orders"
                  >
                    My Orders
                  </a>
                </div>
                <div>
                  <a
                    className="bg-[#1b4172] p-3 text-white text-[14px] rounded-lg"
                    href="/supplier/tender-submission"
                  >
                    My Tender Proposal
                  </a>
                </div>
                <IconButton
                  variant="text"
                  className="bg-gray-500 mx-2 rounded-full"
                  onClick={handleUserIconClick}
                >
                  <UserIcon className="h-4 w-4 text-white" />
                </IconButton>

                {signOutVisible && (
                  <div className="absolute top-12 right-5 bg-white w-[150px] flex flex-col items-start p-3 z-10 shadow-md border-[1px] border-grey-800">
                    <div className="w-full" onClick={handleLogout}>
                      <div className="font-inter py-2 cursor-pointer">
                        Sign Out
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
        <div className="bg-white ml-8 mr-4 rounded-lg p-5 mb-4">
          <Outlet />
        </div>
      </section>
    </section>
  );
};
