import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import Swal from "sweetalert2";

const AllSupplierOrders = () => {
  const [orders, setOrders] = useState([]);
  const [drugDetails, setDrugDetails] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosClient.get("SupplierOrder/all");
        setOrders(res.data);

        res.data.forEach((order) => fetchDrugDetails(order.drugId));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const fetchDrugDetails = async (drugId) => {
    if (drugDetails[drugId]) return;

    try {
      const res = await axiosClient.get(`Drug/${drugId}`);
      setDrugDetails((prev) => ({ ...prev, [drugId]: res.data }));
    } catch (error) {
      console.error(`Error fetching drug details for ${drugId}:`, error);
    }
  };

  const markAsDelivered = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to mark this order as completed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .put(`SupplierOrder/status/${orderId}`, 2)
          .then(() => {
            setOrders((prevOrders) =>
              prevOrders.map((order) =>
                order.idSupplierOrder === orderId
                  ? { ...order, status: 2 }
                  : order
              )
            );
            Swal.fire(
              "Updated!",
              "Order has been marked as completed.",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error updating order status:", error);
          });
      }
    });
  };

  const updateStock = (order) => {
    const { drugId, qty, idSupplierOrder } = order;
    const drug = drugDetails[drugId];

    if (!drug) return;

    const newStockIn = drug.stockIn + qty;

    Swal.fire({
      title: "Update Stock?",
      text: `Current Stock: ${drug.stockIn}, Ordered Qty: ${qty}. New Stock: ${newStockIn}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .put(`Drug/update-stockin/${drugId}`, newStockIn)
          .then(() => {
            return axiosClient.put(
              `SupplierOrder/status/${idSupplierOrder}`,
              3
            );
          })
          .then(() => {
            setDrugDetails((prev) => ({
              ...prev,
              [drugId]: { ...drug, stockIn: newStockIn },
            }));
            setOrders((prevOrders) =>
              prevOrders.map((o) =>
                o.idSupplierOrder === idSupplierOrder ? { ...o, status: 3 } : o
              )
            );

            Swal.fire(
              "Success!",
              "Stock updated and order marked as Stock Updated.",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error updating stock or order status:", error);
          });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-[18px] font-semibold">All Supplier Orders</div>
      </div>
      <div className="mt-10">
        <div class="relative flex flex-col w-full h-full overflow-scroll-hidden text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max text-slate-800">
            <thead>
              <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
                <th className="p-4">
                  <p className="text-sm leading-none font-semibold">Order Id</p>
                </th>

                <th className="p-4">
                  <p className="text-sm leading-none font-semibold">Drug</p>
                </th>

                <th className="p-4">
                  <p className="text-sm leading-none font-semibold">Qty</p>
                </th>
                <th className="p-4">
                  <p className="text-sm leading-none font-semibold">Status</p>
                </th>

                <th className="p-4">
                  <p className="text-sm leading-none font-semibold">Action</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <p className="text-sm">OR{order.idSupplierOrder}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">
                      {order.drugCode} - {order.drugName}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">{order.qty}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">
                      <div
                        className={`text-[12px] text-center w-[70px] h-5 px-2 rounded-full font-bold ${
                          order.status === 0
                            ? "bg-orange-100 text-orange-500"
                            : order.status === 1
                            ? "bg-blue-100 text-blue-500"
                            : order.status === 2 || 3
                            ? "bg-green-100 text-green-500"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {order.status === 0
                          ? "Pending"
                          : order.status === 1
                          ? "Delivered"
                          : order.status === 2 || 3
                          ? "Complete"
                          : "Unknown"}
                      </div>
                    </p>
                  </td>
                  <td className="p-4">
                    {order.status == 1 && (
                      <button
                        onClick={() => markAsDelivered(order.idSupplierOrder)}
                        className="bg-green-500 text-white px-3 py-1 text-sm rounded-md hover:bg-green-600"
                      >
                        Mark as Complete
                      </button>
                    )}
                    {order.status === 2 && (
                      <button
                        onClick={() => updateStock(order)}
                        className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600"
                      >
                        Update Stock
                      </button>
                    )}
                    {order.status === 3 && (
                      <div className="text-[14px] text-green-700 font-semibold">
                        Stock Updated
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllSupplierOrders;
