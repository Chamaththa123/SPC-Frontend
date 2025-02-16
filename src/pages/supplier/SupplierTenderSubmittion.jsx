import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/UserContext";
import axiosClient from "../../../axios-client";

const SupplierTenderSubmittion = () => {
  const { user } = useStateContext();
  const [tenderSubmission, setTenderSubmission] = useState([]);

  useEffect(() => {
    const tenders = async () => {
      try {
        const res = await axiosClient.get(
          `TenderSubmission/by-supplier/${user.idUser}`
        );
        const tendersData = res.data;

        // Fetch drug name for each tender
        const tendersWithDrugName = await Promise.all(
          tendersData.map(async (tender) => {
            const drugDetails = await axiosClient.get(
              `Tender/${tender.tenderIdTender}`
            );
            return {
              ...tender,
              drugName: drugDetails.data.drugName,
            };
          })
        );

        setTenderSubmission(tendersWithDrugName);
      } catch (error) {
        console.log(error);
      }
    };

    tenders();
  }, [user.idUser]);

  return (
    <div>
      <div className="font-bold text-[18px]">Submitted Tender Proposals</div>

      <div>
        {tenderSubmission.map((tender) => (
          <div
            key={tender.id}
            className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full"
          >
            <div className="p-4">
              <div className="flex justify-between">
                <div className="my-3 text-[16px] font-semibold underline">
                  Tender for the quotation of {tender.drugName}
                </div>
                <div
                  className={`text-[12px] h-4 px-2 rounded-full font-bold ${
                    tender.status === 0
                      ? "bg-orange-100 text-orange-500"
                      : tender.status === 1
                      ? "bg-green-100 text-green-500"
                      : tender.status === 3
                      ? "bg-red-100 text-red-500"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {tender.status === 0
                    ? "Pending"
                    : tender.status === 1
                    ? "Complete"
                    : tender.status === 3
                    ? "Rejected"
                    : "Unknown"}
                </div>
              </div>
              <p className="text-[14px] leading-normal font-normal">
                Unit Price : {tender.unitPrice}
              </p>
              <p className="text-[14px] leading-normal font-normal">
                Description : {tender.description}
              </p>
              <p className="text-[14px] leading-normal font-normal">
                Submitted Date : {tender.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierTenderSubmittion;
