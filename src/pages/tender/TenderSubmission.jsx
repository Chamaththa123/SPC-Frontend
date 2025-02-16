import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { Input, Textarea } from "@material-tailwind/react";
import { useStateContext } from "../../contexts/UserContext";
import Swal from "sweetalert2";

const TenderSubmission = () => {
  const { user } = useStateContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [tender, setTender] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    tenderIdTender: id,
    supplierIdSupplier: user.idUser,
    description: "",
    unitPrice: "",
    status: 0,
    date: today,
  });

  const [formErrors, setFormErrors] = useState({
    description: "",
    unitPrice: "",
  });

  useEffect(() => {
    if (!id) return;
    axiosClient
      .get(`Tender/${id}`)
      .then((res) => {
        setTender(res.data);
      })
      .catch((error) => {
        console.error("Error fetching tender details:", error);
      });
  }, [id]);

  if (!tender) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validate = (formData) => {
    const errors = {};
    if (!formData.description) {
      errors.description = "Description is required";
    }
    if (!formData.unitPrice) {
      errors.unitPrice = "Unit Price is required";
    }
    setFormErrors(errors);
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) return;

    axiosClient
      .post("/TenderSubmission/add", formData)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Your tender proposal has been submitted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/supplier/tender");
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Failed to submit proposal. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Error submitting tender:", error);
      });
  };

  return (
    <div>
      <h6 className="mb-2 text-slate-800 text-xl font-semibold text-center">
        State Pharmaceutical Cooperation
      </h6>
      <div className="my-6 text-[16px] font-semibold underline text-center">
        Tender for the quotation of {tender.drugName} drug
      </div>
      <p className="font-semibold text-[18px]">Tender Proposal Submission</p>

      <div className="mt-10">
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium">Drug Unit Price</label>
          <Input
            className="mt-1 p-2 w-full border rounded-md text-[14px]"
            type="text"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
          />
          {formErrors.unitPrice && (
            <p className="text-red-500 text-sm">{formErrors.unitPrice}</p>
          )}

          <label className="block text-sm font-medium mt-5">
            Description (add more information about your proposal)
          </label>
          <Textarea
            className="mt-1 p-2 w-full border rounded-md text-[14px]"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {formErrors.description && (
            <p className="text-red-500 text-sm">{formErrors.description}</p>
          )}

          <div className="mt-10 text-end">
            <button
              type="submit"
              className="bg-[#0d6efd] rounded-md p-2 text-white text-[15px]"
            >
              Submit proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenderSubmission;
