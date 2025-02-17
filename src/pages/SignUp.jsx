import React, { useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import logo from "../assets/images/logo.png";
import axiosClient from "../../axios-client";

export const SignUp = () => {
  const { setUser, setToken } = useStateContext();
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const contactRef = useRef(null);
  const nameRef = useRef(null);

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    role: 4,
    status: 0,
  });

  const validate = (loginData) => {
    const errors = {};
    if (!loginData.email) {
      errors.email = "Email is required";
    }
    if (!loginData.password) {
      errors.password = "Password is required";
    }
    if (!loginData.contact) {
      errors.contact = "Phone No is required";
    }
    if (!loginData.name) {
      errors.name = "Name is required";
    }
    setFormErrors(errors);
    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const registerData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      name: nameRef.current.value,
      contact: contactRef.current.value,
      status: 0,
      role: 4,
      branchId: 0,
    };

    const validationErrors = validate(registerData);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const { data } = await axiosClient.post("/User/register", registerData);
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have successfully registered!",
        confirmButtonColor: "#0d6efd",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          setAlertMessage(data?.message || "Invalid email or password");
        } else {
          setAlertMessage("An unexpected error occurred. Please try again.");
        }
      } else {
        setAlertMessage("Network error. Please check your connection.");
      }
      setShowAlert(true);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[600px]">
        <form onSubmit={handleRegister}>
          <CardBody className="flex flex-col gap-4">
            <div className="text-[25px] font-bold mb-10">
              Supplier Registration
            </div>
            {showAlert && (
              <div className="mb-4 rounded bg-red-500 px-4 py-2 text-white">
                {alertMessage}
              </div>
            )}
            <div className="md:flex gap-10">
              <div className="w-full">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="email"
                >
                  Name
                </label>
                <input
                  className="mt-1 p-2 w-full border rounded-md text-[14px]"
                  type="text"
                  id="name"
                  name="name"
                  ref={nameRef}
                />
                {formErrors.name && (
                  <span className="text-xs font-medium text-red-500">
                    {formErrors.name}
                  </span>
                )}
              </div>
              <div className="w-full">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="email"
                >
                  Contact No
                </label>
                <input
                  className="mt-1 p-2 w-full border rounded-md text-[14px]"
                  type="text"
                  id="contact"
                  name="contact"
                  ref={contactRef}
                />
                {formErrors.contact && (
                  <span className="text-xs font-medium text-red-500">
                    {formErrors.contact}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-10">
              <div className="w-full">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="password"
                >
                  Email
                </label>
                <input
                  className="mt-1 p-2 w-full border rounded-md text-[14px]"
                  type="email"
                  id="email"
                  name="email"
                  ref={emailRef}
                />
                {formErrors.email && (
                  <span className="text-xs font-medium text-red-500">
                    {formErrors.email}
                  </span>
                )}
              </div>
              <div className="w-full">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="mt-1 p-2 w-full border rounded-md text-[14px]"
                  type="password"
                  id="password"
                  name="password"
                  ref={passwordRef}
                />
                {formErrors.password && (
                  <span className="text-xs font-medium text-red-500">
                    {formErrors.password}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="w-[100px] py-2  mt-5 font-bold text-white rounded-md hover:opacity-80 bg-[#0d6efd]"
                type="submit"
              >
                Register
              </button>
            </div>
          </CardBody>
        </form>
      </Card>
      <ToastContainer />
    </div>
  );
};
