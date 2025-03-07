import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import background from "../assets/backgroung.png";

export default function AdminControlPage() {
    const { serviceName } = useParams();
    const [adminData, setAdminData] = useState(null);
    const [homeData, setHomeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Récupérer les données de l'API /api/home
    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const response = await fetch("/api/home");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setHomeData(data);
            } catch (error) {
                console.error("Error fetching home data:", error);
                setError(error.message);
            }
        };

        fetchHomeData();
    }, []);

    // Récupérer les données de l'API /api/admin/${serviceName}
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await fetch(`/api/admin/${serviceName}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("API Response:", data); // Log pour déboguer
                if (!data.myBusinessTickets || !data.entityName) {
                    throw new Error("Invalid data received from API");
                }
                setAdminData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching admin data:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAdminData();
    }, [serviceName]);

    // Combiner les données pour obtenir la localisation de l'agence
    const getAgencyLocation = (ticketId) => {
        const agency = homeData
            .flatMap((service) => service.agencies)
            .find((agency) => agency.ticket.id === ticketId);
        return agency ? agency.location : "Localisation inconnue";
    };

    if (loading) {
        return <p className="text-white text-center">Chargement des données...</p>;
    }

    if (error) {
        return <p className="text-white text-center">Erreur: {error}</p>;
    }

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-4"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <h1 className="text-3xl font-bold mb-8 text-white text-center">
                Tableau de bord Admin - {adminData.entityName}
            </h1>

            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
                <table className="w-full">
                    <thead>
                        <tr className="bg-purple-600 text-white">
                            <th className="py-2 px-4 text-left">Localisation de l'agence</th>
                            <th className="py-2 px-4 text-left">Numéro en cours</th>
                            <th className="py-2 px-4 text-left">Taille de la file</th>
                            <th className="py-2 px-4 text-left">Numéro de caisse</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminData.myBusinessTickets.map((ticket) => (
                            <tr key={ticket.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4">{getAgencyLocation(ticket.id)}</td>
                                <td className="py-3 px-4">{ticket.currentNumber}</td>
                                <td className="py-3 px-4">{ticket.queueSize}</td>
                                <td className="py-3 px-4">{ticket.registerNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}