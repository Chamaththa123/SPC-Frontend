import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import logo from "../../assets/images/logoOne.png";
import hero from "../../assets/images/StockCake-Pharmacist Stocking Shelves_1740068962.jpg";
const Tender = () => {
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    const tenders = () => {
      axiosClient
        .get("Tender/all")
        .then((res) => {
          const filteredTenders = res.data.filter(
            (tender) => tender.status === 1
          );
          setTenders(filteredTenders);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    tenders();
  });
  return (
    <>
      <div className="relative h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500 via-transparent to-transparent opacity-30"></div>
        <img src={hero} className="w-full h-[500px]" alt="Logo" />
        <div className="absolute top-20 left-10 ">
          <div className=" font-bold text-white text-[60px]">
            Secure Your Next Contract <br /> Submit Your Tender Today!
          </div>
          <div className=" font-medium text-white text-[25px] w-[60%] mt-10">
            Explore the latest drug tenders and submit your proposals with ease.
            Join us in ensuring a steady supply of quality pharmaceuticals.
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-8 py-5">
  {tenders.map((tender) => (
    <div
      key={tender.id}
      className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg min-w-80 p-4"
    >
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
        Closing Date : {tender.date}
      </p>
      <div className="flex justify-end p-2">
        <a
          href={`tender-submission/${tender.idTender}`}
          className="bg-[#1b609f] rounded-md p-2 text-white text-[15px]"
        >
          Submit Tender Proposal
        </a>
      </div>
    </div>
  ))}
</div>

    </>
  );
};

export default Tender;
