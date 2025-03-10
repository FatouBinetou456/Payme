import React, { useState, useEffect } from 'react';
import background from "../assets/backgroung.png";
import { useParams } from "react-router-dom";

export default function ClientCard() {
    const { serviceName, agencyLocation } = useParams();
    const [agencyData, setAgencyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    const fetchData = async () => {
        try {
            const response = await fetch(`/api/agency/${serviceName}/${agencyLocation}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAgencyData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Appel initial des données
        fetchData();

        // Mise à jour régulière des données toutes les 5 secondes
        const intervalId = setInterval(fetchData, 5000);

        // Nettoyage de l'intervalle lorsque le composant est démonté
        return () => clearInterval(intervalId);
    }, [serviceName, agencyLocation]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>
            <p className="text-white text-2xl font-bold mb-8">Vous êtes à l'agence {agencyLocation} de {serviceName}</p>
            <div className="bg-sky-700 rounded-2xl shadow-lg shadow-sky-500 outline outline-slate-400 -outline-offset-8">
                <div className="group overflow-hidden relative after:duration-500 before:duration-500 duration-500 hover:after:duration-500 hover:after:translate-x-24 hover:before:translate-y-12 hover:before:-translate-x-32 hover:duration-500 after:absolute after:w-24 after:h-24 after:bg-sky-700 after:rounded-full after:blur-xl after:bottom-32 after:right-16 after:w-12 after:h-12 before:absolute before:w-20 before:h-20 before:bg-sky-400 before:rounded-full before:blur-xl before:top-20 before:right-16 before:w-12 before:h-12 hover:rotate-12 flex justify-center items-center h-56 w-80 bg-neutral-900 rounded-2xl outline outline-slate-400 -outline-offset-8">
                    <div className="z-10 flex flex-col items-center gap-2">
                        <span className="text-slate-400 text-6xl font-bold"></span>
                        <p className="text-gray-50 text-lg"></p>
                        {agencyData && (
                            <div className="text-white text-center">
                                <span className='flex'><p className='font-bold mr-1'> Votre eTicket :  </p>{agencyData.eTicketNumber}
                                </span>
                                
                                <span className='flex'><p className='font-bold mr-1'>Position dans la file: </p> {agencyData.positionInQueue}
                                </span>

                                
                                <span className='flex'><p className='font-bold mr-1 '>Taille de la file: </p>{agencyData.peopleAhead} </span>

                                
                                <span className='flex'><p className='font-bold mr-1'>Ticket Traité:
                                </p> {agencyData.currentNumber} </span>
                                
                                <span className='flex'><p className='font-bold mr-1'>A la caisse: </p>{agencyData.register}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}