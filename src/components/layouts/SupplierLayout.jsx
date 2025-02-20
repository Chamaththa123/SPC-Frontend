import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, Outlet, Navigate, useLocation } from "react-router-dom";
import { Burger } from "../../utils/icons";
import { SideBar } from "./SideBar";
import { Card, Tooltip, IconButton } from "@material-tailwind/react";
import { BellIcon, UserIcon } from "@heroicons/react/24/solid";
import { useStateContext } from "../../contexts/UserContext";
import axiosClient from "../../../axios-client";
import logo from "../../assets/images/logoOne.png";
import hero from "../../assets/images/StockCake-Pharmacist Stocking Shelves_1740068962.jpg";
import heroTwo from "../../assets/images/logoOne-removebg-preview.png";
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
        <Card className="h-20 rounded-none w-full p-3 pl-3 flex flex-row justify-between items-center bg-white">
          <a href="/supplier/tender">
            <img src={logo} className="w-[20%]" alt="Logo" />
          </a>
          <div>
            <div className="flex items-center justify-between">
              <div
                className="relative flex gap-5 justify-center items-center"
                ref={dropdownRef}
              >
                <a
                  className="bg-[#1b609f] p-3 text-white text-center text-[14px] rounded-lg w-[120px]"
                  href="/supplier/supplier-orders"
                >
                  My Orders
                </a>
                <a
                  className="bg-[#1b609f] p-3 text-white text-center text-[14px] rounded-lg w-[150px]"
                  href="/supplier/tender-submission"
                >
                  My Tender Proposal
                </a>
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
        <div className="bg-white mt-[-20px] min-h-screen">
          
          <div className="relative">
            <Outlet />
           
          </div>
          
        </div>
        <div className="bg-[#1b609f]  w-full p-3 text-sm text-white font-medium">2025 - Supplier Portal</div>
      </section>
      
    </section>
  );
};
