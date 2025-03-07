import React, { useEffect, useState } from "react";
import BusinessCard from "./BusinessCard";

// Import images from assets folder
import Orange from "../assets/Orange.jpg";
import Senelec from "../assets/Senelec.jpg";
import SenEau from "../assets/SenEau.jpg";
import FBank from "../assets/FBank.jpg";
import background from "../assets/backgroung.png"

export default function Home() {
  const [services, setServices] = useState([]);

  // Mapping service names to their images
  const serviceImages = {
    Orange: Orange,
    Senelec: Senelec,
    SenEau: SenEau,
    FBank: FBank,
  };

  useEffect(() => {
    fetch("/api/home") 
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log(services);

  return (
    <div className="p-8"
    style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <h1 className="text-3xl font-bold mb-6">Lequel de nos services souhaitez vous visiter aujourd'hui</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {services.map((service) => (
          <BusinessCard
            key={service.serviceId}
            business={service}
            image={serviceImages[service.serviceName] } // Use default if not found
          />
        ))}
      </div>
    </div>
  );
}
