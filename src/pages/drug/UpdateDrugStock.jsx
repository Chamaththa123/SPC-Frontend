import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { Input } from "@material-tailwind/react";
import Swal from "sweetalert2";

const UpdateDrugStock = () => {
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedDrug = { ...editedDrug, [name]: value };
    setEditedDrug(updatedDrug);
  };

  const validate = (data) => {
    const errors = {};
    if (!data.StockIn || isNaN(data.StockIn))
      errors.stockIn = "Stock quantity is required and must be a number.";
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validateErrors = validate(editedDrug);
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length === 0) {
      setIsSubmitting(true);

      // Calculate the updated stock
      const updatedStock = editedDrug.stockIn + parseInt(editedDrug.StockIn);

      axiosClient
        .put(`/Drug/update-stockin/${id}`, updatedStock)
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "Drug stock updated successfully.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/drugs");
          });
        })
        .catch((error) => {
          console.error("Error updating stock:", error);
          Swal.fire({
            title: "Error",
            text: "Failed to update stock. Please try again.",
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

  return (
    <div>
      <div className="text-[18px] font-semibold mb-10">
        Update {editedDrug.code} - {editedDrug.name} Drug Stock
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-[80%]">
          <div className="text-[15px]">
            Current Stock : {editedDrug.stockIn}
          </div>
          <div className="text-[15px] mb-5">
            Updated Stock :{" "}
            {editedDrug.stockIn + (parseInt(editedDrug.StockIn) || 0)}
          </div>
          <div className="flex gap-10">
            <div className="w-[50%]">
              <label className="block text-sm font-medium">
                Add Stock Quantity
              </label>
              <Input
                className="mt-1 p-2 w-full border rounded-md text-[14px]"
                type="number"
                name="StockIn"
                value={editedDrug.StockIn}
                onChange={handleChange}
              />
              {errors.stockIn && (
                <p className="text-red-500 text-sm mt-3">{errors.stockIn}</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10 text-left">
          <button
            type="submit"
            className="bg-[#1b609f] rounded-md p-2 text-white text-[15px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Stock"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDrugStock;
