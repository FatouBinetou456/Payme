import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import myLogo from "../assets/bill.png";

export default function Layout() {
    const location = useLocation(); // Récupère l'emplacement actuel

    // Fonction pour déterminer si un lien est actif
    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex flex-col min-h-screen">
            {/* Barre de navigation */}
            <div className="navbar bg-base-100 shadow-md">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link
                                    to="/"
                                    className={`${
                                        isActive("/") ? "bg-purple-600 text-white" : "text-gray-700"
                                    } px-4 py-2 rounded-md transition-colors duration-200`}>
                                    Client
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/agent"
                                    className={`${
                                        isActive("/agent") ? "bg-purple-600 text-white" : "text-gray-700"
                                    } px-4 py-2 rounded-md transition-colors duration-200`}>
                                    Agent
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin"
                                    className={`${
                                        isActive("/admin") ? "bg-purple-600 text-white" : "text-gray-700"
                                    } px-4 py-2 rounded-md transition-colors duration-200`}>
                                    Admin
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="navbar-center">
                    <img src={myLogo} className="w-10 md:w-16" alt="Logo" />
                    <span className="btn btn-ghost text-xl">PayMe</span>
                </div>
            </div>

            {/* Contenu principal */}
            <main className="flex-grow ">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-base-200 text-center p-4 mt-auto">
                <p>© 2025 PayMe. Fatoumata Binetou DRAME Tous droits réservés.</p>
            </footer>
        </div>
    );
}