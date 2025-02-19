import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../contexts/UserContext";
import AddStock from "./AddStock";
import UpdateStock from "./UpdateStock";

const Stocks = () => {
  const [stock, setStock] = useState([]);
  const { user } = useStateContext();
  const [addStockOpen, setAddStockOpen] = useState(false);
  const [updateStockOpen, setUpdateStockOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockTableLoading, setStockTableLoading] = useState(false);

  useEffect(() => {
    fetchStock();
  }, [stockTableLoading]);

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

  const handleAddStockOpen = () => setAddStockOpen((cur) => !cur);
  const handleUpdateStockOpen = () => setUpdateStockOpen((cur) => !cur);
  const handleStockTableLoading = () => setStockTableLoading((pre) => !pre);

  const openUpdateStock = (stockItem) => {
    setSelectedStock(stockItem);
    handleUpdateStockOpen();
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-[18px] font-semibold">All Pharmacy Stock</div>
        <button
          onClick={handleAddStockOpen}
          className="w-fit hidden md:flex gap-1 items-center p-1 px-3 font-inter font-medium bg-[#10806f] border-[#10806f] hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] transition-colors duration-500"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
          </span>
          <span>New Drug Stock</span>
        </button>
      </div>

      <div className="mt-10">
        <div className="relative flex flex-col w-full h-full overflow-scroll-hidden text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max text-slate-800 text-sm">
            <thead>
              <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
                <th className="p-4">Id</th>
                <th className="p-4">Drug Name</th>
                <th className="p-4">InStock</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((stockItem) => (
                <tr key={stockItem.idStock} className="hover:bg-slate-50">
                  <td className="p-4">S{stockItem.idStock}</td>
                  <td className="p-4">
                    {stockItem.drugCode} - {stockItem.drugName}
                  </td>
                  <td className="p-4">{stockItem.inStock}</td>
                  <td className="p-4">
                    <button
                      onClick={() => openUpdateStock(stockItem)}
                      className="text-blue-600 hover:underline"
                    >
                      Update Stock
                    </button>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <a href={`add-stock-order/${stockItem.idStock}`}>
                    Place Order
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddStock
        handleStockTableLoading={handleStockTableLoading}
        closeAddStock={handleAddStockOpen}
        addStockOpen={addStockOpen}
      />

      {selectedStock && (
        <UpdateStock
          handleStockTableLoading={handleStockTableLoading}
          closeUpdateStock={handleUpdateStockOpen}
          updateStockOpen={updateStockOpen}
          selectedStock={selectedStock}
        />
      )}
    </div>
  );
};

export default Stocks;
