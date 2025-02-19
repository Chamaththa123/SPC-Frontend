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

const UpdateStock = ({
  handleStockTableLoading,
  closeUpdateStock,
  handleUpdateStockOpen,
  updateStockOpen,
  selectedStock,
}) => {
  const [formData, setFormData] = useState({
    idStock: "",
    inStock: "", // Keep input field empty when modal opens
  });

  const [currentStock, setCurrentStock] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (selectedStock) {
      setFormData({
        idStock: selectedStock.idStock || "",
        inStock: "", // Reset input to empty when modal opens
      });

      setCurrentStock(selectedStock.inStock || 0);
    }
  }, [selectedStock]);

  const handleChange = (e) => {
    const updatedInStock = e.target.value === "" ? "" : parseInt(e.target.value, 10);

    setFormData({ ...formData, inStock: updatedInStock });
    setErrorMessage("");

    if (updatedInStock !== "" && !isNaN(updatedInStock)) {
      setCurrentStock((selectedStock.inStock || 0) + updatedInStock);
    } else {
      setCurrentStock(selectedStock.inStock || 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.inStock || formData.inStock <= 0) {
      setErrorMessage("Stock In is required and must be greater than 0.");
      return;
    }

    setSubmitting(true);

    try {
      await axiosClient.put(`/Stock/update-instock/${formData.idStock}`, currentStock);

      closeUpdateStock();
      Swal.fire({
        title: "Success!",
        text: "StockIn Updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      handleStockTableLoading();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Update Stock",
        text: error.response?.data?.message || "An error occurred",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      size="sm"
      open={updateStockOpen}
      handler={handleUpdateStockOpen}
      className="max-h-[90%] overflow-y-scroll-hidden rounded-sm bg-white font-inter shadow-none"
    >
      <DialogHeader className="flex justify-between items-center">
        <div className="text-lg font-bold">Update Stock</div>
        <button
          onClick={closeUpdateStock}
          className="py-1 px-2 rounded-full bg-gray-200 hover:bg-gray-300 transition text-[18px]"
        >
          ✕
        </button>
      </DialogHeader>
      <DialogBody>
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <div className="flex gap-10">
              <div className="w-full">
                <label className="text-black text-sm font-medium">
                  Current Stock In
                </label>
                <Typography className="mt-1 font-semibold">{currentStock}</Typography>
                
                <label className="text-black text-sm font-medium mt-4">
                  Stock In
                </label>
                <Input
                  className="mt-1 p-2 w-full border rounded-md text-[14px]"
                  type="number"
                  name="inStock"
                  value={formData.inStock}
                  onChange={handleChange}
                  min="0"
                  placeholder="Enter stock amount" // Placeholder instead of default value
                />
                {errorMessage && (
                  <div className="text-red-500 text-sm mt-2 font-medium">
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 text-left">
            <button
              type="submit"
              className="bg-[#0d6efd] rounded-md p-2 text-white text-[15px] font-medium"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Update Stock"}
            </button>
          </div>
        </form>
      </DialogBody>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
};

export default UpdateStock;
