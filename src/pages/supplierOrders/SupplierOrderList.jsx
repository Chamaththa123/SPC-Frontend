import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/UserContext";
import axiosClient from "../../../axios-client";
import Swal from "sweetalert2";

const SupplierOrderList = () => {
    const { user } = useStateContext();

    const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = () => {
      axiosClient
        .get(`SupplierOrder/supplierOrders/${user.idUser}`)
        .then((res) => {
            setOrders(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchOrders();
  }, []);

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
          .put(`SupplierOrder/status/${orderId}`,1 )
          .then(() => {
            setOrders((prevOrders) =>
              prevOrders.map((order) =>
                order.idSupplierOrder === orderId
                  ? { ...order, status: 2 }
                  : order
              )
            );
            Swal.fire("Updated!", "Order has been marked as delivered.", "success");
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
        <div className="text-[18px] font-semibold">All Orders</div>
       
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
                    <p className="text-sm">{order.drugCode} - {order.drugName}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">{order.qty}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">
                    <div
                        className={`text-[12px] text-center w-[70px] h-5 px-2 rounded-full font-bold ${
                            order.status === 0
                            ? "bg-orange-100 text-orange-700"
                            : order.status === 1
                            ? "bg-blue-100 text-blue-700"
                            : order.status === 2
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status === 0
                          ? "Pending"
                          : order.status === 1
                          ? "Delivered"
                          : order.status === 2
                          ? "Complete"
                          : "Unknown"}
                      </div>
                    </p>
                  </td>
                  <td className="p-4">
                  {order.status == 0 && (
                      <button
                        onClick={() => markAsDelivered(order.idSupplierOrder)}
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
  )
}

export default SupplierOrderList
