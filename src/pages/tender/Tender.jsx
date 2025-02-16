import React, { useEffect,useState } from "react";
import axiosClient from "../../../axios-client";

const Tender = () => {
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    const tenders = () => {
      axiosClient
        .get("Tender/all")
        .then((res) => {
            const filteredTenders = res.data.filter((tender) => tender.status === 1);
            setTenders(filteredTenders);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    tenders();
  });
  return (
    <div className="flex gap-10 justify-center items-center">
      {tenders.map((tender) => (
        <div key={tender.id} className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
          <div className="p-4">
            <h6 className="mb-2 text-slate-800 text-xl font-semibold text-center">
            State Pharmaceutical Cooperation
            </h6>
            <div className="my-3 text-[16px] font-semibold underline">
            Tender for the quotation of {tender.drugName} drug
            </div>
            <p className="text-[15px] leading-normal font-normal">
              {tender.description}
            </p>
            <p className="text-[15px] leading-normal font-normal">
             Closing Date :  {tender.date}
            </p>
          </div>
          <div className="flex justify-end p-2">
            <a href={`tender-submission/${tender.idTender}`} className="bg-[#0d6efd] rounded-md p-2 text-white text-[15px]">
              Submit Tender Proposal
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tender;
