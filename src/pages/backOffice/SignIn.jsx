import React, { useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";

import logo from "../../assets/images/logo.png";
import axiosClient from "../../../axios-client";

const SignIn = () => {
  const { setUser, setToken } = useStateContext();
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const validate = (loginData) => {
    const errors = {};
    if (!loginData.email) {
      errors.email = "Email is required";
    }
    if (!loginData.password) {
      errors.password = "Password is required";
    }
    setFormErrors(errors);
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const validationErrors = validate(loginData);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const { data } = await axiosClient.post("/User/login", loginData);
      console.log(data)
      setUser(data.user);
      console.log(data.user)
      setToken(data.token);
      if(data.user.role == 4){
        navigate("/supplier/tender");
      }else{
        navigate("/");
      }
      
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
      <Card className="w-96">
        <CardHeader className="mb-4 grid h-28 place-items-center">
          <img src={logo} className="w-[95%]" alt="Logo" />
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardBody className="flex flex-col gap-4">
            {showAlert && (
              <div className="mb-4 rounded bg-red-500 px-4 py-2 text-white">
                {alertMessage}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-600" htmlFor="email">
                Email
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md text-[14px]"
                type="text"
                id="email"
                name="email"
                ref={emailRef}
              />
              {formErrors.email && (
                <span className="text-xs font-medium text-red-500">{formErrors.email}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600" htmlFor="password">
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
                <span className="text-xs font-medium text-red-500">{formErrors.password}</span>
              )}
            </div>
            <div className="flex justify-end">
              <button
                className="w-full py-2 font-bold text-white rounded-md hover:opacity-80 bg-gradient-to-r from-[#1b4172] to-[#1b4172]"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Typography variant="small" className="mt-6 flex justify-center">
              Do you want to register as supplier ?
              <Typography
                as="a"
                href="/supplier-register"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Register here
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
