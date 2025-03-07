import React from "react";
import { Link } from "react-router-dom";

export default function AgencyCard({ agency }) {
  if (!agency || !agency.serviceName) {
    return <p>Loading agency data...</p>;
  }

  return (
    <Link to={`/${agency.serviceName}/${agency.location}`} className="flex-grid">
      <div className="w-full relative drop-shadow-xl h-64 overflow-hidden rounded-xl bg-[#f09df0] justify-center transition-transform transform hover:scale-105">
        <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132]">
          <h3 className="text-lg font-semibold text-center">{agency.location}</h3>
        </div>
        <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2" />
      
      </div>
    </Link>
  );
}