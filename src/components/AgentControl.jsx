import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import background from "../assets/backgroung.png"; 
export default function AgentControl() {
    const { serviceName, agencyLocation } = useParams(); // Récupère les paramètres de l'URL
    const [agencyData, setAgencyData] = useState(null); // État pour stocker les données de l'API
    const [loading, setLoading] = useState(true); // État pour gérer le chargement
    const [error, setError] = useState(null); // État pour gérer les erreurs

    // Récupère les données de l'API
    useEffect(() => {
        fetchData();
    }, [serviceName, agencyLocation]); // Déclenche l'effet lorsque les paramètres changent

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/agent/${serviceName}/${agencyLocation}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setAgencyData(data); // Stocke les données dans l'état
            setLoading(false); // Désactive le chargement
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message); // Stocke l'erreur
            setLoading(false); // Désactive le chargement
        }
    };

    // Fonction pour passer au client suivant
    const handleNextClient = async () => {
        try {
            const response = await fetch(`/api/agent/${serviceName}/${agencyLocation}/next`, {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Failed to move to next client");
            }

            // Rafraîchit les données après l'action
            await fetchData();
        } catch (error) {
            console.error("Error moving to next client:", error);
        }
    };

    // Fonction pour revenir au client précédent
    const handlePreviousClient = async () => {
        try {
            const response = await fetch(`/api/agent/${serviceName}/${agencyLocation}/previous`, {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Failed to move to previous client");
            }

            // Rafraîchit les données après l'action
            await fetchData();
        } catch (error) {
            console.error("Error moving to previous client:", error);
        }
    };

    // Calcule la taille de la file d'attente
    const queueSize = agencyData ? agencyData.lastTicketNumber - agencyData.currentNumber : 0;

    // Affiche un message de chargement
    if (loading) {
        return <p className="text-white text-center">Chargement des données...</p>;
    }

    // Affiche un message d'erreur
    if (error) {
        return <p className="text-white text-center">Erreur: {error}</p>;
    }

    // Affiche les données de l'API
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
                Agence {agencyData.agencyName} - {agencyData.entityName}
            </h1>

            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className="space-y-4">
                    <div className="text-center">
                        <p className="text-lg font-semibold text-gray-800">
                            Numéro de ticket en cours :
                        </p>
                        <p className="text-2xl font-bold text-purple-600">
                            {agencyData.currentNumber}
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-lg font-semibold text-gray-800">
                            Dernier numéro de ticket attribué :
                        </p>
                        <p className="text-2xl font-bold text-purple-600">
                            {agencyData.lastTicketNumber}
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-lg font-semibold text-gray-800">
                            Taille de la file d'attente :
                        </p>
                        <p className="text-2xl font-bold text-purple-600">
                            {queueSize}
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-lg font-semibold text-gray-800">
                            Numéro de caisse :
                        </p>
                        <p className="text-2xl font-bold text-purple-600">
                            {agencyData.registerNumber}
                        </p>
                    </div>

                    {/* Boutons pour gérer les clients */}
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handlePreviousClient}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                            disabled={agencyData.currentNumber <= 1}
                        >
                            Client précédent
                        </button>
                        <button
                            onClick={handleNextClient}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                            disabled={agencyData.currentNumber >= agencyData.lastTicketNumber}
                        >
                            Client suivant
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}