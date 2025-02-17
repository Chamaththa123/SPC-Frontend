import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { Input } from "@material-tailwind/react";
import Swal from "sweetalert2";

const EditDrugs = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editedDrug, setEditedDrug] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    axiosClient
      .get(`Drug/${id}`)
      .then((res) => {
        setEditedDrug(res.data);
      })
      .catch((error) => {
        console.error("Error fetching drug details:", error);
      });
  }, [id]);

  if (!editedDrug) {
    return <div>Loading...</div>;
  }

  const validate = (data) => {
    const errors = {};
    if (!data.code) errors.code = "Code is required.";
    if (!data.name) errors.name = "Name is required.";
    if (!data.description) errors.description = "Description is required.";
    if (!data.expiryDate) errors.expiryDate = "Expiry Date is required.";
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validateErrors = validate(editedDrug);
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length === 0) {
      setIsSubmitting(true);

      axiosClient
        .put(`/Drug/update`, editedDrug)
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "Drug details updated successfully.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/drugs");
          });
        })
        .catch((error) => {
          console.error("Error updating drug:", error);
          Swal.fire({
            title: "Error",
            text: "Failed to update drug details. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      let errorMessage = Object.values(validateErrors).join("\n");
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: errorMessage,
        allowOutsideClick: false,
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedDrug((prevDrug) => ({
      ...prevDrug,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <div>
      <div className="text-[18px] font-semibold mb-10">Edit Drug Details</div>
      <form onSubmit={handleSubmit}>
        <div className="w-[80%]">
          <div className="flex gap-10">
            <div className="w-full">
              <label className="block text-sm font-medium">Drug Code</label>
              <Input
                className="mt-1 p-2 w-full border rounded-md text-[14px]"
                type="text"
                name="code"
                value={editedDrug.code}
                onChange={handleChange}
              />
              {errors.code && (
                <p className="text-red-500 text-sm">{errors.code}</p>
              )}
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium">Name</label>
              <Input
                className="mt-1 p-2 w-full border rounded-md text-[14px]"
                type="text"
                name="name"
                value={editedDrug.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
          </div>
          <div className="flex gap-10 mt-10">
            <div className="w-full">
              <label className="block text-sm font-medium">Description</label>
              <Input
                className="mt-1 p-2 w-full border rounded-md text-[14px]"
                type="text"
                name="description"
                value={editedDrug.description}
                onChange={handleChange}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium">Expiry Date</label>
              <Input
                className="mt-1 p-2 w-full border rounded-md text-[14px]"
                type="date"
                name="expiryDate"
                value={editedDrug.expiryDate}
                onChange={handleChange}
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm">{errors.expiryDate}</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10 text-left">
          <button
            type="submit"
            className="bg-[#0d6efd] rounded-md p-2 text-white text-[15px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Edit Drug Details"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDrugs;
