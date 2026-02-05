import { Link } from 'react-router-dom';
import { Users, UserPlus } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-200 py-4 px-8 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-blue-600 font-black text-xl tracking-tight">
                    <Users size={28} fill="currentColor" />
                    <span>CANDIDATE<span className="text-gray-800">FLOW</span></span>
                </Link>

                <div className="flex gap-4">
                    <Link to="/" className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition">Dashboard</Link>
                    <Link to="/add" className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-700 shadow-md transition transform hover:scale-105">
                        <UserPlus size={18} /> Add Candidate
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;