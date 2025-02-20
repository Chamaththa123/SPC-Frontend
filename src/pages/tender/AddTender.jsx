import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Input, Textarea } from "@material-tailwind/react";
import axiosClient from "../../../axios-client";

const AddTender = () => {
  const navigate = useNavigate();

  const initialFormData = {
    drugId: "",
    description: "",
    status: 1,
    date: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [drugs, setDrugs] = useState([]);

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
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      drugId: selectedValue,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      drugId: "",
    }));
  };

  // Validate form fields
  const validate = (data) => {
    const errors = {};
    if (!data.drugId) errors.drugId = "Drug is required.";
    if (!data.description) errors.description = "Description is required.";
    if (!data.date) errors.date = "Date is required.";
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
        await axiosClient.post(`/Tender/add`, formData);
        Swal.fire({
          title: "Success!",
          text: "New Tender added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/tenders");
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text:
            error.response?.data?.message ||
            "Failed to add Tender. Please try again.",
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

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const res = await axiosClient.get("/Drug/all");
        setDrugs(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDrugs();
  }, []);

  return (
    <div>
      <div className="text-[18px] font-semibold mb-10">Add New Tender</div>
      <form onSubmit={handleSubmit}>
        <div className="w-[80%]">
          <div className="flex gap-10">
            <div className="w-full">
              <label className="block text-sm font-medium">Select Drug</label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="drugId"
                value={formData.drugId}
                onChange={handleSelectChange}
              >
                <option value="">Choose a drug</option>
                {drugs.map((drug) => (
                  <option key={drug.idDrug} value={drug.idDrug}>
                    {drug.name}
                  </option>
                ))}
              </select>
              {errors.drugId && (
                <p className="text-red-500 text-sm mt-3">{errors.drugId}</p>
              )}
            </div>
            <div className="w-full">
              <div>
                <label className="block text-sm font-medium">Closing Date</label>
                <Input
                  className="mt-1 p-2 w-full border rounded-md text-[14px]"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-3">{errors.date}</p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full mt-5">
            <label className="block text-sm font-medium">Description</label>
            <Textarea
              className="mt-1 p-2 w-full border rounded-md text-[14px]"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
        </div>

        <div className="mt-10 text-left">
          <button
            type="submit"
            className="bg-[#1b609f] rounded-md p-2 text-white text-[15px]"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Add Tender"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTender;
