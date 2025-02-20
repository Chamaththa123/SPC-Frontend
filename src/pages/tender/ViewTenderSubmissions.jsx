import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import Swal from "sweetalert2";

const ViewTenderSubmissions = () => {
    const { id } = useParams();
    const [tenderSubmissions, setTenderSubmissions] = useState([]);
    const [supplierDetails, setSupplierDetails] = useState({});

    useEffect(() => {
        fetchTenderSubmissions();
    }, []);

    const fetchTenderSubmissions = () => {
        axiosClient
            .get(`TenderSubmission/by-tender/${id}`)
            .then((res) => {
                setTenderSubmissions(res.data);
                fetchSupplierDetails(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const fetchSupplierDetails = (tenders) => {
        const supplierIds = [...new Set(tenders.map(tender => tender.supplierIdSupplier))];

        supplierIds.forEach(supplierId => {
            axiosClient
                .get(`User/get-user-by-id/${supplierId}`)
                .then((res) => {
                    setSupplierDetails(prev => ({
                        ...prev,
                        [supplierId]: res.data
                    }));
                })
                .catch((error) => {
                    console.log(`Error fetching supplier ${supplierId}:`, error);
                });
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
                <div className="text-[18px] font-semibold">Tender Submission for T{id} Tender</div>
               
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
                            {tenderSubmissions.map((tender) => {
                                const supplier = supplierDetails[tender.supplierIdSupplier];

                                return (
                                    <tr key={tender.idTenderSubmission} className="hover:bg-slate-50">
                                        <td className="p-4">T{tender.idTenderSubmission}</td>
                                        <td className="p-4">
                                            {supplier ? (
                                                <>
                                                    <div className="font-semibold">{supplier.name} - </div>
                                                    <div className="text-gray-500 text-xs">{supplier.contact}</div>
                                                </>
                                            ) : (
                                                "Loading..."
                                            )}
                                        </td>
                                        <td className="p-4">{tender.description}</td>
                                        <td className="p-4">{tender.unitPrice}</td>
                                        <td className="p-4">
                                            <div
                                                className={`text-[12px] text-center w-[70px] h-5 px-2 rounded-full font-bold ${
                                                    tender.status === 0
                                                        ? "bg-orange-100 text-orange-500"
                                                        : tender.status === 2
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
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewTenderSubmissions;
