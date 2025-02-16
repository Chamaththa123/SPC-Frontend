import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import Swal from "sweetalert2";

const PendingSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [supplierTableLoading, setSupplierTableLoading] = useState(false);
  const handleLoading = () => setSupplierTableLoading((pre) => !pre);
  useEffect(() => {
    const fetchSuppliers = () => {
      axiosClient
        .get("User/get-all-users")
        .then((res) => {
          const filteredSuppliers = res.data.filter(
            (supplier) => supplier.role === 4 && supplier.status === 0
          );
          setSuppliers(filteredSuppliers);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchSuppliers();
  }, [supplierTableLoading]);

  const activateUser = (idUser) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to activate this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, activate!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .put(`User/activate-user/${idUser}`)
          .then(() => {
            
            Swal.fire("Activated!", "The user has been activated.", "success");
            handleLoading();
          })
          .catch((error) => {
            console.error("Error activating user:", error);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  return (
    <div>
      <div className="text-[18px] font-semibold">Newly Registered Suppliers</div>
      <div className="mt-10">
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max text-slate-800">
            <thead>
              <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
                <th className="p-4">
                <p className="text-sm leading-none font-semibold">Name</p>
                </th>
                <th className="p-4">
                <p className="text-sm leading-none font-semibold">Email</p>
                </th>
                <th className="p-4">
                <p className="text-sm leading-none font-semibold">Contact No</p>
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
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-slate-50">
                  <td className="p-4 text-sm">{supplier.name}</td>
                  <td className="p-4 text-sm">{supplier.email}</td>
                  <td className="p-4 text-sm">{supplier.contact}</td>
                  <td className="p-4 text-sm">
                    <div
                      className={`text-[12px] text-center w-[70px] h-5 px-2 rounded-full font-bold ${
                        supplier.status === 0
                          ? "bg-red-100 text-red-500"
                          : supplier.status === 1
                          ? "bg-green-100 text-green-500"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {supplier.status === 0
                        ? "Inactive"
                        : supplier.status === 1
                        ? "Active"
                        : "Unknown"}
                    </div>
                  </td>
                  <td className="p-4">
                    {supplier.status === 0 && (
                      <button
                        onClick={() => activateUser(supplier.idUser)}
                        className="text-blue-500  text-sm"
                      >
                        Activate
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

export default PendingSuppliers;
