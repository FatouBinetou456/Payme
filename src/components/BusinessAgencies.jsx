import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AgencyCard from "./AgencyCard";
import background from "../assets/backgroung.png"

export default function BusinessAgencies() {
  const { serviceName } = useParams();
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    fetch(`/api/entity/${serviceName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.agencies) {
          const formattedAgencies = data.agencies.map((location, index) => ({
            agencyId: index, // Use index as a unique ID (better to use actual ID from API if available)
            location,
            serviceName: data.serviceName, // Add serviceName from API
          }));
          setAgencies(formattedAgencies); // Set transformed data
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [serviceName]);

  return (
    <div className="p-8
    "
    style={{
        backgroundImage:`url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <h1 className="text-3xl font-bold mb-4">Bienvenue à {serviceName.replace("-", " ")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agencies.length > 0 ? (
        agencies.map((agency) => (
          <AgencyCard
            key={agency.agencyId} // Use agencyId as the key
            agency={agency} // Pass the entire agency object
          />
        ))
      ) : (
        <p>Chargement des agences...</p>
      )}

</div>
    </div>
  );
}