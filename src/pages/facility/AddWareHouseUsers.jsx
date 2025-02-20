import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import axiosClient from "../../../axios-client";

const AddWareHouseUsers = ({ closeUpdateStock, updateStockOpen }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        contact: "",
        role: 5, 
        status: 1,
        branchId: 1,
      });
      const [errors, setErrors] = useState({});
      const [submitting, setSubmitting] = useState(false);
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      };
    
      // Validate form fields
      const validate = (data) => {
        const errors = {};
        if (!data.name) errors.name = "Name is required.";
        if (!data.email) errors.email = "Email is required.";
        if (!data.password) errors.password = "Password is required.";
        if (!data.contact) errors.contact = "Contact No is required.";
        return errors;
      };
    
      // Handle form submission
      const handleSubmit = async (event) => {
        event.preventDefault();
        const validateErrors = validate(formData);
        setErrors(validateErrors);
    
        if (Object.keys(validateErrors).length === 0) {
          setSubmitting(true);
          try {
            await axiosClient.post(`/User/register`, formData);
            closeUpdateStock();
            Swal.fire({
              title: "Success!",
              text: "New User added successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });
          } catch (error) {
            Swal.fire({
              title: "Error",
              text:
                error.response?.data?.message ||
                "Failed to add User. Please try again.",
              icon: "error",
              confirmButtonText: "OK",
            });
          } finally {
            setSubmitting(false);
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Validation Error",
            text: "Please fill all required fields.",
            allowOutsideClick: false,
          });
        }
      };

  return (
    <Dialog
      size="sm"
      open={updateStockOpen}
      handler={closeUpdateStock}
      className="max-h-[90%] overflow-y-scroll-hidden rounded-sm bg-white font-inter shadow-none"
    >
      <DialogHeader className="flex justify-between items-center">
        <div className="text-lg font-bold">Add WareHouse User</div>
        <button
          onClick={closeUpdateStock}
          className="py-1 px-2 rounded-full bg-gray-200 hover:bg-gray-300 transition text-[18px]"
        >
          ✕
        </button>
      </DialogHeader>
      <DialogBody>
        <div>
              <form onSubmit={handleSubmit}>
                <div className="w-full">
                  <div className="flex gap-10">
                    <div className="w-full">
                      <label className="block text-sm font-medium">User Name</label>
                      <Input
                        className="mt-1 p-2 w-full border rounded-md text-[14px]"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                      )}
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium">Email</label>
                      <Input
                        className="mt-1 p-2 w-full border rounded-md text-[14px]"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                      )}
                    </div>
                  </div>
        
                  <div className="flex gap-10 mt-10">
                    <div className="w-[50%]">
                      <label className="block text-sm font-medium">Contact</label>
                      <Input
                        className="mt-1 p-2 w-full border rounded-md text-[14px]"
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                      />
                      {errors.contact && (
                        <p className="text-red-500 text-sm mt-2">{errors.contact}</p>
                      )}
                    </div>
                    <div className="w-[50%]">
                      <label className="block text-sm font-medium">Password</label>
                      <Input
                        className="mt-1 p-2 w-full border rounded-md text-[14px]"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-2">{errors.password}</p>
                      )}
                    </div>
                  </div>
                </div>
        
                <div className="mt-10 text-left">
                  <button
                    type="submit"
                    className="bg-[#1b609f] rounded-md p-2 text-white text-[15px]"
                    disabled={submitting}
                  >
                    {submitting ? "Saving..." : "Add New User"}
                  </button>
                </div>
              </form>
            </div>
      </DialogBody>
    </Dialog>
  );
};

export default AddWareHouseUsers;
