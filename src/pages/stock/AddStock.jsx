import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  Dialog,
  Card,
  Typography,
  Radio,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../contexts/UserContext";

const AddStock = ({
  handleStockTableLoading,
  closeAddStock,
  handleAddStockOpen,
  addStockOpen,
}) => {
  const { user } = useStateContext();

  const initialFormData = {
    drugIdDrug: "",
    drugCode: "",
    drugName: "",
    inStock: 0,
    branchId: user.branchId,
    expireDate: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [drugs, setDrugs] = useState([]);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = () => {
    axiosClient
      .get(`Stock/get-by-branch/${user.branchId}`)
      .then((res) => {
        setStock(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const handleSelectChange = (event) => {
    const selectedDrug = drugs.find(
      (drug) => drug.idDrug.toString() === event.target.value
    );
    if (selectedDrug) {
      setFormData((prevData) => ({
        ...prevData,
        drugIdDrug: selectedDrug.idDrug,
        drugCode: selectedDrug.code,
        drugName: selectedDrug.name,
      }));
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      drugIdDrug: "",
    }));
  };

  // Validate form fields
  const validate = (data) => {
    const errors = {};
    if (!data.drugIdDrug) errors.drugIdDrug = "Drug is required.";
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
        await axiosClient.post(`/Stock/create`, formData);
        closeAddStock();
        Swal.fire({
          title: "Success!",
          text: "New stock added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          handleStockTableLoading();
          setFormData(initialFormData);
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text:
            error.response?.data?.message ||
            "Failed to add stock. Please try again.",
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
    <>
      <Dialog
        size="sm"
        open={addStockOpen}
        handler={handleAddStockOpen}
        className="max-h-[90%] overflow-y-scroll-hidden rounded-sm bg-white font-inter shadow-none"
      >
        <DialogHeader className="flex justify-between items-center">
          <div className=" text-lg font-bold">Add New Drug Stock</div>
          <button
            onClick={closeAddStock}
            className="py-1 px-2 rounded-full bg-gray-200 hover:bg-gray-300 transition text-[18px]"
          >
            ✕
          </button>
        </DialogHeader>
        <DialogBody className="">
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <div className="flex gap-10">
                <div className="w-full">
                  <label className="text-black text-sm font-medium">
                    Select Drug
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg h-[45px] focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 font-medium"
                    name="drugIdDrug"
                    value={formData.drugIdDrug}
                    onChange={handleSelectChange}
                  >
                    <option value="">Choose a drug</option>
                    {drugs
                      .filter(
                        (drug) =>
                          !stock.some((s) => s.drugIdDrug === drug.idDrug)
                      )
                      .map((drug) => (
                        <option key={drug.idDrug} value={drug.idDrug}>
                          {drug.name}
                        </option>
                      ))}
                  </select>

                  {errors.drugIdDrug && (
                    <p className="text-red-500 text-sm mt-3">
                      {errors.drugIdDrug}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <div>
                    <label className="text-black text-sm font-medium">
                      Stock In
                    </label>
                    <Input
                      className="mt-1 p-2 w-full border rounded-md text-[14px]"
                      type="number"
                      name="inStock"
                      value={formData.inStock}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          inStock: e.target.value
                            ? parseInt(e.target.value, 10)
                            : 0,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 text-left">
              <button
                type="submit"
                className="bg-[#1b609f] rounded-md p-2 text-white text-[15px] font-medium"
                disabled={submitting}
              >
                {submitting ? "Saving..." : "Add New Drug Stock"}
              </button>
            </div>
          </form>
        </DialogBody>
        <DialogFooter></DialogFooter>
      </Dialog>
    </>
  );
};

export default AddStock;
