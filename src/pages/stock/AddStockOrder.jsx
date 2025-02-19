import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { Input } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useStateContext } from "../../contexts/UserContext";

const AddStockOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useStateContext();

  const [stockDetails, setStockDetails] = useState(null);
  const [formData, setFormData] = useState({
    stockId: id,
    drugId: "",
    drugCode: "",
    drugName: "",
    branchId: user.branchId,
    qty: 0,
    status: 0,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    axiosClient
      .get(`Stock/get-by-id/${id}`)
      .then((res) => {
        setStockDetails(res.data);
      })
      .catch((error) => {
        console.error("Error fetching stock details:", error);
      });
  }, [id]);

  useEffect(() => {
    if (stockDetails) {
      setFormData((prevData) => ({
        ...prevData,
        drugId: stockDetails.drugIdDrug,
        drugCode: stockDetails.drugCode,
        drugName: stockDetails.drugName,
      }));
    }
  }, [stockDetails]);

  const validate = (data) => {
    const errors = {};
    if (data.qty <= 0) errors.qty = "Quantity must be greater than 0.";
    return errors;
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateErrors = validate(formData);
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length === 0) {
      setSubmitting(true);
      try {
        await axiosClient.post(`/PharmacyOrder/create`, formData);
        Swal.fire({
          title: "Success!",
          text: "Order Placed Successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/stocks");
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text:
            error.response?.data?.message ||
            "Failed to place order. Please try again.",
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

  if (!stockDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="text-[18px] font-semibold mb-10">
        Place New Order - {stockDetails.drugCode} - {stockDetails.drugName}
      </div>
      <div className="flex">
        <div className="flex w-full overflow-hidden text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max text-slate-800">
            <thead>
              <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
                <th className="p-4">
                  <p className="text-sm leading-none font-semibold">Stock Id</p>
                </th>
                <th className="p-4">
                  <p className="text-sm leading-none font-semibold">Drug</p>
                </th>
                <th className="p-4">
                  <p className="text-sm leading-none font-semibold">
                    Current Stock In
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr key={stockDetails.id} className="hover:bg-slate-50">
                <td className="p-4">
                  <p className="text-sm">S{stockDetails.idStock}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm">
                    {stockDetails.drugCode} - {stockDetails.drugName}
                  </p>
                </td>
                <td className="p-4">
                  <p className="text-sm">{stockDetails.inStock}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-[250px] mt-10">
          <label className="block text-sm font-medium">
            Add Ordered Quantity
          </label>
          <Input
            className="mt-1 p-2 w-full border rounded-md text-[14px]"
            type="number"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
          />
          {errors.qty && (
            <p className="text-red-500 text-sm mt-2">{errors.qty}</p>
          )}
        </div>
        <p className="text-gray-700 text-sm my-5">
          Once the order is placed, it will be sent to the SPC Warehouse.
        </p>
        <div className="mt-1 text-left">
          <button
            type="submit"
            className="bg-[#0d6efd] rounded-md p-2 text-white text-[15px]"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStockOrder;
