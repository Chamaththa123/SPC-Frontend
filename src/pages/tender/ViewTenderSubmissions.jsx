import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import Swal from "sweetalert2";

const ViewTenderSubmissions = () => {
    const { id } = useParams();
    const [tenderSubmissions, setTenderSubmissions] = useState([]);

    useEffect(() => {
        fetchTenderSubmissions();
    }, []);

    const fetchTenderSubmissions = () => {
        axiosClient
            .get(`TenderSubmission/by-tender/${id}`)
            .then((res) => {
                setTenderSubmissions(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changeStatus = (tenderSubmissionId, currentStatus) => {
        Swal.fire({
            title: "Change Status",
            text: "Do you want to approve or reject this submission?",
            icon: "question",
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: "Approve",
            denyButtonText: "Reject",
            cancelButtonText: "Cancel",
        }).then((result) => {
            let newStatus = null;
            if (result.isConfirmed) {
                newStatus = 1; // Approve
            } else if (result.isDenied) {
                newStatus = 2; // Reject
            }

            if (newStatus !== null) {
                axiosClient
                    .put(`TenderSubmission/status/${tenderSubmissionId}/${newStatus}`)
                    .then(() => {
                        Swal.fire("Success", "Status updated successfully", "success");
                        fetchTenderSubmissions(); // Refresh list
                    })
                    .catch(() => {
                        Swal.fire("Error", "Failed to update status", "error");
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
                    <span>New Tender</span>
                </a>
            </div>
            <div className="mt-10">
                <div className="relative flex flex-col w-full h-full overflow-scroll-hidden text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                    <table className="w-full text-left table-auto min-w-max text-slate-800 text-sm">
                        <thead>
                            <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
                                <th className="p-4">Id</th>
                                <th className="p-4">Supplier</th>
                                <th className="p-4">Description</th>
                                <th className="p-4">Unit Price</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tenderSubmissions.map((tender) => (
                                <tr key={tender.idTender} className="hover:bg-slate-50">
                                    <td className="p-4">T{tender.idTenderSubmission}</td>
                                    <td className="p-4">{tender.supplierIdSupplier}</td>
                                    <td className="p-4">{tender.description}</td>
                                    <td className="p-4">{tender.unitPrice}</td>
                                    <td className="p-4">
                                        <div
                                            className={`text-[12px] text-center w-[70px] h-5 px-2 rounded-full font-bold ${
                                                tender.status === 0
                                                    ? "bg-orange-100 text-orange-500" :
                                                     tender.status === 2
                                                    ? "bg-red-100 text-red-500"
                                                    : "bg-green-100 text-green-500"
                                            }`}
                                        >
                                            {tender.status === 0 ? "Pending" : tender.status === 1 ? "Approved" : "Rejected"}
                                        </div>
                                    </td>
                                    <td className="p-4">{tender.date}</td>
                                    <td className="p-4 text-sm">
                                        <button
                                            onClick={() => changeStatus(tender.idTenderSubmission, tender.status)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Approve or Reject
                                        </button>
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

export default ViewTenderSubmissions;
