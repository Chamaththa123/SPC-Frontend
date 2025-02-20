import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = () => {
      axiosClient
        .get("User/get-all-users")
        .then((res) => {
          const filteredSuppliers = res.data.filter(
            (supplier) => supplier.role === 4 && supplier.status === 1
          );
          setSuppliers(filteredSuppliers);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchSuppliers();
  }, []);

  return (
    <div>
      <div className="text-[18px] font-semibold">All Suppliers</div>
      <div className="mt-10">
        <div class="relative flex flex-col w-full h-full overflow-scroll-hidden text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
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
                  <p className="text-sm leading-none font-semibold">
                    Contact No
                  </p>
                </th>
                <th className="p-4">
                  <p className="text-sm leading-none font-semibold">Status</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <p className="text-sm">{supplier.name}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">{supplier.email}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">{supplier.contact}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">
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
                    </p>
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

export default Suppliers;
