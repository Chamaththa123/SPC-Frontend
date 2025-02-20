import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { Input } from "@material-tailwind/react";
import Swal from "sweetalert2";

const AddFacilityUsers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [facilityDetails, setFacilityDetails] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    role: 2, // Default role
    status: 1,
    branchId: id,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    axiosClient
      .get(`Facility/${id}`)
      .then((res) => {
        setFacilityDetails(res.data);
      })
      .catch((error) => {
        console.error("Error fetching facility details:", error);
      });
  }, [id]);

  // Update userRole based on facilityDetails
  useEffect(() => {
    if (facilityDetails?.type) {
      setFormData((prevData) => ({
        ...prevData,
        role: facilityDetails.type === 3 ? 3 : 2,
      }));
    }
  }, [facilityDetails]);

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
        Swal.fire({
          title: "Success!",
          text: "New User added successfully.",
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

  if (!facilityDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="text-[18px] font-semibold mb-10">Add New User</div>
      <form onSubmit={handleSubmit}>
        <div className="w-[80%]">
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
  );
};

export default AddFacilityUsers;
