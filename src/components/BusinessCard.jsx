import React from "react";
import { Link } from "react-router-dom";

export default function BusinessCard({ business, image }) {
  return (
    <Link to={`/${business.serviceName}`} className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer overflow-hidden">
    <div className="bg-white">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={business.serviceName} 
          className="w-full h-full object-cover rounded-t-lg transition-transform transform hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-0 transition-opacity"></div>
      </div>
      <h2 className="text-xl font-semibold mt-4 mb-4 text-center text-gray-800">{business.serviceName}</h2>
    </div>
 
    </Link>
  );
}
