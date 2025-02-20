import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import Swal from "sweetalert2";

const PharmacyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [branchDetails, setBranchDetails] = useState({}); // Stores branch names and locations

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axiosClient.get(`PharmacyOrder/all`);
      const ordersData = res.data;

      // Fetch branch details for each order
      const branchIds = [...new Set(ordersData.map(order => order.branchId))];
      const branchData = await fetchBranchDetails(branchIds);

      setOrders(ordersData);
      setBranchDetails(branchData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBranchDetails = async (branchIds) => {
    const branchData = {};
    await Promise.all(
      branchIds.map(async (id) => {
        try {
          const res = await axiosClient.get(`Facility/${id}`);
          branchData[id] = {
            name: res.data.name,
            location: res.data.location
          };
        } catch (error) {
          console.log(`Error fetching branch ${id}:`, error);
          branchData[id] = { name: "Unknown", location: "Unknown" };
        }
      })
    );
    return branchData;
  };


  const markAsDelivered = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to mark this order as delivered?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .put(`PharmacyOrder/update-status/${orderId}`, 1)
          .then(() => {
            Swal.fire("Updated!", "Order has been marked as delivered.", "success");
            fetchOrders();
          })
          .catch((error) => {
            console.error("Error updating order status:", error);
          });
      }
    });
  };
  

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-[18px] font-semibold">All Pharmacy Orders</div>
      </div>

      <div className="mt-10">
        <div className="relative flex flex-col w-full h-full overflow-scroll-hidden text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max text-slate-800 text-sm">
            <thead>
              <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
                <th className="p-4">Id</th>
                <th className="p-4">Drug Name</th>
                <th className="p-4">Branch</th>
                <th className="p-4">Location</th>
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
                  <td className="p-4">{branchDetails[order.branchId]?.name || "Loading..."}</td>
                  <td className="p-4">{branchDetails[order.branchId]?.location || "Loading..."}</td>
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
                  {order.status == 0 && (
                      <button
                        onClick={() => markAsDelivered(order.idPharmacyOrder)}
                        className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600"
                      >
                        Mark as Delivered
                      </button>
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

export default PharmacyOrders;
