import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { Input, Select, Option } from "@material-tailwind/react";
import Swal from "sweetalert2";

const AddFacility = () => {
  const navigate = useNavigate();

  const initialFormData = {
    name: "",
    location: "",
    type: "",
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

  // Handle select change
  const handleSelectChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      type: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      type: "",
    }));
  };

  // Validate form fields
  const validate = (data) => {
    const errors = {};
    if (!data.location) errors.location = "Location is required.";
    if (!data.name) errors.name = "Name is required.";
    if (!data.type || data.type === "0") errors.type = "Type is required.";
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
        await axiosClient.post(`/Facility`, formData);
        Swal.fire({
          title: "Success!",
          text: "New Facility added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/facility");
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text:
            error.response?.data?.message ||
            "Failed to add Facility. Please try again.",
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

  const facilityOptions = [
    { value: 2, label: "Manufacturing Plant" },
    { value: 3, label: "Pharmacy" },
  ];

  return (
    <div>
      <div className="text-[18px] font-semibold mb-10">Add New Facility</div>
      <form onSubmit={handleSubmit}>
        <div className="w-[80%]">
          <div className="flex gap-10">
            <div className="w-full">
              <label className="block text-sm font-medium">Select Type</label>
              <Select
                className="mt-1"
                name="type"
                value={formData.type}
                onChange={handleSelectChange}
                placeholder="Select Facility Type"
              >
                {facilityOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type}</p>
              )}
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
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
          </div>

          <div className="flex gap-10 mt-10">
            <div className="w-[50%]">
              <label className="block text-sm font-medium">Location</label>
              <Input
                className="mt-1 p-2 w-full border rounded-md text-[14px]"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location}</p>
              )}
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

export default AddFacility;
