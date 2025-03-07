import React, { useEffect, useState } from 'react';

import { Link } from "react-router-dom";

import background from "../assets/backgroung.png";
import Orange from "../assets/Orange.jpg";
import Senelec from "../assets/Senelec.jpg";
import SenEau from "../assets/SenEau.jpg";
import FBank from "../assets/FBank.jpg";


export default function AdminService() {

    const [services, setServices] = useState([]);
    
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
  return (
   <div className='text-white min-h-screen flex flex-col items-center justify-center p-4' style={{
               backgroundImage: `url(${background})`,
               backgroundSize: "cover",
               backgroundPosition: "center",
               backgroundRepeat: "no-repeat",
           }}>
            
            <h1 className="text-3xl font-bold mb-4 text-white text-center">Bienvenue cher admin </h1>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                   {services.map((service) => (
                       <Link to={`/admin/${service.serviceName}`} >
                       <div key={service.serviceName} className="cursor-pointer overflow-hidden relative transition-all duration-500 hover:translate-y-2 w-72 h-44 bg-neutral-50 rounded-lg shadow-xl flex flex-row items-center justify-evenly gap-2 p-2 before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 before:bg-purple-200">
                           {/* Cercle avec l'image */}
                           <div className="w-20 h-16 rounded-full overflow-hidden shrink-0 border-2 border-purple-200">
                               <img
                                   src={serviceImages[service.serviceName] || DefaultImage} // Utilisez l'image par défaut si service.serviceName n'est pas trouvé
                                   alt={service.serviceName}
                                   className="w-full h-full object-cover"
                               />
                           </div>
                           {/* Contenu texte */}
                           <div>
                               <span className="font-bold text-purple-200">{service.serviceName}</span>
                           </div>
                           
                       </div>
                       </Link>
                   ))}
               </div>
           </div>
  )
}
