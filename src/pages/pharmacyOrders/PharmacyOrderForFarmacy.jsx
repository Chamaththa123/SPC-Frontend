import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/UserContext";
import axiosClient from "../../../axios-client";
import Swal from "sweetalert2";

const PharmacyOrderForFarmacy = () => {
  const { user } = useStateContext();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axiosClient
      .get(`PharmacyOrder/get-by-branch/${user.branchId}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const markAsComplete = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to mark this order as Completed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .put(`PharmacyOrder/update-status/${orderId}`, 2)
          .then(() => {
            Swal.fire("Updated!", "Order has been marked as Completed.", "success");
            fetchOrders();
          })
          .catch((error) => {
            console.error("Error updating order status:", error);
          });
      }
    });
  };

  const updateStock = (order) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to update the stock for this order. This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const { stockId, idPharmacyOrder, qty } = order;
  
        axiosClient
          .get(`Stock/get-by-id/${stockId}`)
          .then((res) => {
            const { inStock } = res.data;
            const updatedStock = inStock + qty;
  
            axiosClient
              .put(`Stock/update-instock/${stockId}`, updatedStock)
              .then(() => {
                axiosClient
                  .put(`PharmacyOrder/update-status/${idPharmacyOrder}`, 3)
                  .then(() => {
                    Swal.fire("Success!", "Stock has been updated and order marked as completed.", "success");
                    fetchOrders();
                  })
                  .catch((error) => {
                    Swal.fire("Error!", "Failed to update order status.", "error");
                    console.error("Error updating order status:", error);
                  });
              })
              .catch((error) => {
                Swal.fire("Error!", "Failed to update stock quantity.", "error");
                console.error("Error updating stock:", error);
              });
          })
          .catch((error) => {
            Swal.fire("Error!", "Failed to fetch stock details.", "error");
            console.error("Error fetching stock details:", error);
          });
      }
    });
  };
  

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-[18px] font-semibold">All Orders</div>
        <button className="w-fit hidden md:flex gap-1 items-center p-1 px-3 font-inter font-medium bg-[#10806f] border-[#10806f] hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] transition-colors duration-500">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
          </span>
          <span>Pharmacy Orders</span>
        </button>
      </div>

      <div className="mt-10">
        <div className="relative flex flex-col w-full h-full overflow-scroll-hidden text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max text-slate-800 text-sm">
            <thead>
              <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
                <th className="p-4">Id</th>
                <th className="p-4">Drug Name</th>
                <th className="p-4">Qty</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.idPharmacyOrder} className="hover:bg-slate-50">
                  <td className="p-4">S{order.idPharmacyOrder}</td>
                  <td className="p-4">
                    {order.drugCode} - {order.drugName}
                  </td>
                  <td className="p-4">{order.qty}</td>
                  <td className="p-4">
                    <div
                      className={`text-[12px] text-center w-[70px] h-5 px-2 rounded-full font-bold ${
                        order.status === 0
                          ? "bg-orange-100 text-orange-700"
                          : order.status === 1
                          ? "bg-blue-100 text-blue-700"
                          : order.status === 2 || 3
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
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
                  </td>
                  <td className="p-4">
                    {order.status === 1 && (
                      <button
                        onClick={() => markAsComplete(order.idPharmacyOrder)}
                        className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600"
                      >
                        Mark as Complete
                      </button>
                    )}
                    {order.status === 2 && (
                      <button
                        onClick={() => updateStock(order)}
                        className="bg-green-500 text-white px-3 py-1 text-sm rounded-md hover:bg-green-600 ml-2"
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

export default PharmacyOrderForFarmacy;
