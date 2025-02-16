import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { Input } from "@material-tailwind/react";
import Swal from "sweetalert2";

const AddDrug = () => {
  const navigate = useNavigate();

  const initialFormData = {
    code: "",
    name: "",
    description: "",
    expiryDate: "",
    status: 1,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Handle input changes
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
    if (!data.code) errors.code = "Drug code is required.";
    if (!data.name) errors.name = "Name is required.";
    if (!data.expiryDate) errors.expiryDate = "Expiry date is required.";
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
        await axiosClient.post(`/Drug/add`, formData);
        Swal.fire({
          title: "Success!",
          text: "New drug added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/drugs");
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "Failed to add drug. Please try again.",
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
    <div>
      <div className="text-[18px] font-semibold mb-10">Add New Drug</div>
      <form onSubmit={handleSubmit}>
        <div className="w-[80%]">
          <div className="flex gap-10">
            <div className="w-full">
              <label className="block text-sm font-medium">Drug Code</label>
              <Input
                className="mt-1 p-2 w-full border rounded-md text-[14px]"
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
              />
              {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium">Name</label>
              <Input
                className="mt-1 p-2 w-full border rounded-md text-[14px]"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
          </div>

          <div className="flex gap-10 mt-10">
            <div className="w-full">
              <label className="block text-sm font-medium">Description</label>
              <Input
                className="mt-1 p-2 w-full border rounded-md text-[14px]"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium">Expiry Date</label>
              <Input
                className="mt-1 p-2 w-full border rounded-md text-[14px]"
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
              />
              {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
            </div>
          </div>
        </div>

        <div className="mt-10 text-left">
          <button
            type="submit"
            className="bg-[#0d6efd] rounded-md p-2 text-white text-[15px]"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Add New Drug"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDrug;
