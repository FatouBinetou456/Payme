import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import background from "../assets/backgroung.png";
import { Link } from "react-router-dom";

export default function AgentService() {
    const { serviceName } = useParams();
    const [agencies, setAgencies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/api/entity/${serviceName}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data && data.agencies) {
                    const formattedAgencies = data.agencies.map((location, index) => ({
                        agencyId: index, 
                        location,
                        serviceName: data.serviceName, 
                    }));
                    setAgencies(formattedAgencies); 
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError(error.message);
                setLoading(false);
            });
    }, [serviceName]);

    if (loading) {
        return <p className="text-white text-center">Chargement des agences...</p>;
    }

    if (error) {
        return <p className="text-white text-center">Erreur: {error}</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
            <h1 className="text-3xl font-bold mb-4 text-white text-center">Bienvenue cher agent de {serviceName.replace("-", " ")}</h1>
            <h1 className="text-2xl font-bold mb-8 text-white text-center">Choisissez votre agence</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {agencies.length > 0 ? (
                    agencies.map((agency) => (
                        <Link to={`/agent/${serviceName}/${agency.location}`} key={agency.agencyId}>
                            <div className="cursor-pointer overflow-hidden relative transition-all duration-500 hover:translate-y-2 w-72 h-44 bg-neutral-50 rounded-lg shadow-xl flex flex-row items-center justify-evenly gap-2 p-2 before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 before:bg-purple-200">
                                <div>
                                    <span className="font-bold text-gray-500">{agency.location}</span>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-white">Aucune agence disponible.</p>
                )}
            </div>
        </div>
    );
}