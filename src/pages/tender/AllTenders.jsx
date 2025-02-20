import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import Swal from "sweetalert2";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { ChangeIcon, ViewIcon } from "../../utils/icons";

const AllTenders = () => {
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = () => {
    axiosClient
      .get("Tender/all")
      .then((res) => {
        setTenders(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeStatus = (idTender, currentStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to change the status of this tender!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .put(`Tender/toggle-status/${idTender}`)
          .then(() => {
            Swal.fire("Updated!", "Tender status has been changed.", "success");
            fetchTenders();
          })
          .catch((error) => {
            console.log(error);
            Swal.fire("Error!", "Failed to update status.", "error");
          });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-[18px] font-semibold">All Tenders</div>
        <a
          href="/add-tender"
          className="w-fit hidden md:flex gap-1 items-center p-1 px-3 font-inter font-medium bg-[#0ddf4e] border-[#0ddf4e] hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] transition-colors duration-500"
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
          <span>New Tender</span>
        </a>
      </div>
      <div className="mt-10">
        <div className="relative flex flex-col w-full h-full overflow-scroll-hidden text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max text-slate-800 text-sm">
            <thead>
              <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
                <th className="p-4">Id</th>
                <th className="p-4">Drug Name</th>
                <th className="p-4">Description</th>
                <th className="p-4">Status</th>
                <th className="p-4">Closing Date</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {tenders.map((tender) => (
                <tr key={tender.idTender} className="hover:bg-slate-50">
                  <td className="p-4">T{tender.idTender}</td>
                  <td className="p-4">{tender.drugName}</td>
                  <td className="p-4">{tender.description}</td>
                  <td className="p-4">
                    <div
                      className={`text-[12px] text-center w-[70px] h-5 px-2 rounded-full font-bold ${
                        tender.status === 0
                          ? "bg-red-100 text-red-500"
                          : "bg-green-100 text-green-500"
                      }`}
                    >
                      {tender.status === 0 ? "Inactive" : "Active"}
                    </div>
                  </td>
                  <td className="p-4">{tender.date}</td>
                  <td className="p-4 text-sm">
                    <button
                      onClick={() =>
                        changeStatus(tender.idTender, tender.status)
                      }
                     
                    >
                      <Tooltip content="Change Status">
                                              <IconButton
                                                variant="text"
                                                className="mx-2 bg-gray-100"
                                              >
                                                <ChangeIcon />
                                              </IconButton>
                                            </Tooltip>
                    </button>

                    <a href={`/tender-submissions/${tender.idTender}`}>
                     <Tooltip content="View Tender Submissions">
                                              <IconButton
                                                variant="text"
                                                className="mx-2 bg-gray-100"
                                              >
                                                <ViewIcon />
                                              </IconButton>
                                            </Tooltip></a>
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

export default AllTenders;
