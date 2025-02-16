import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import Swal from "sweetalert2";

const Drugs = () => {
    const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    const fetchDrugs = () => {
      axiosClient
        .get("Drug/all")
        .then((res) => {
          setDrugs(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchDrugs();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
      <div className="text-[18px] font-semibold">All Drugs</div>
      <a href="/add-drugs"
                  className=" w-fit hidden md:flex gap-1 items-center p-1 px-3 font-inter font-medium bg-[#10806f] border-[#10806f] hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] transition-colors duration-500"
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
                  <span>New Drug</span>
                </a>
      </div>
      <div className="mt-10">
        <div class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max text-slate-800">
            <thead>
              <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
                <th className="p-4">
                  <p className="text-sm leading-none font-semibold">Id</p>
                </th>
                <th className="p-4">
                  <p className="text-sm leading-none font-semibold">Drug Code</p>
                </th>
                <th className="p-4">
                  <p className="text-sm leading-none font-semibold">
                    Name
                  </p>
                </th>
                <th className="p-4">
                  <p className="text-sm leading-none font-semibold">
                  Description
                  </p>
                </th>
                <th className="p-4">
                  <p className="text-sm leading-none font-semibold">Expiry Date</p>
                </th>
                <th className="p-4">
                  <p className="text-sm leading-none font-semibold">Action</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {drugs.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <p className="text-sm">{supplier.idDrug}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">{supplier.code}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">{supplier.name}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">{supplier.description}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">{supplier.expiryDate}</p>
                  </td>
                  <td className="p-4">
                    <a href={`/drugs/${supplier.idDrug}`} className="text-sm text-blue-700">Edit</a>
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

export default Drugs
