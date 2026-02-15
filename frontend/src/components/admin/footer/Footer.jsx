import React from 'react'
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div>
            <div className="text-center mt-16 mb-3 bg-[#F5F2EB]">
                <p className="text-orange-500 font-medium mb-3">
                    Menu Management
                </p>
                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-2 rounded-lg shadow hover:scale-105 transition">
                    <Link to="/admin/dashboard">Back to Dashboard</Link>
                </button>
            </div>

        </div>
    )
}

export default Footer
