import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api/axios';
import {
    Loader2,
    Users,
    CheckCircle,
    Clock,
    Search,
    Filter,
    XCircle
} from 'lucide-react';
import CandidateRow from '../components/CandidateRow';

const Home = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const navigate = useNavigate();

    // Fetch candidates from Backend
    const fetchCandidates = async () => {
        try {
            setLoading(true);
            const response = await API.get('/candidates');
            setCandidates(response.data);
        } catch (error) {
            toast.error("Failed to load candidates from server");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    // 2. Debounce Search Effect
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 300); // 300ms delay

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Logic for Stats Section
    const stats = useMemo(() => ({
        total: candidates.length,
        hired: candidates.filter(c => c.status === 'Hired').length,
        pending: candidates.filter(c => c.status === 'Applied' || c.status === 'Interviewing').length
    }), [candidates]);

    // Logic for Delete with Toast and UI Update
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this candidate? This action is permanent.")) {
            try {
                await API.delete(`/candidates/${id}`);
                setCandidates(candidates.filter(c => c.id !== id));
                toast.success("Candidate record deleted successfully");
            } catch (error) {
                toast.error("Error deleting candidate");
            }
        }
    };

    // 1. Memoized Filtering Logic
    const filteredCandidates = useMemo(() => {
        return candidates.filter((candidate) => {
            const matchesSearch =
                candidate.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                candidate.email.toLowerCase().includes(debouncedSearch.toLowerCase());

            const matchesStatus = statusFilter === 'All' || candidate.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [candidates, debouncedSearch, statusFilter]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
                <p className="text-gray-500 font-medium italic">Connecting to database...</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">

            {/* 1. Stats Dashboard Section */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-blue-500 flex items-center gap-5">
                    <div className="bg-blue-100 p-4 rounded-xl text-blue-600"><Users size={28} /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Talent</p>
                        <h3 className="text-3xl font-black text-gray-800">{stats.total}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-green-500 flex items-center gap-5">
                    <div className="bg-green-100 p-4 rounded-xl text-green-600"><CheckCircle size={28} /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Hired</p>
                        <h3 className="text-3xl font-black text-gray-800">{stats.hired}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-yellow-500 flex items-center gap-5">
                    <div className="bg-yellow-100 p-4 rounded-xl text-yellow-600"><Clock size={28} /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">In Process</p>
                        <h3 className="text-3xl font-black text-gray-800">{stats.pending}</h3>
                    </div>
                </div>
            </div>

            {/* 2. Search and Filter Control Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative w-full md:w-1/2">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Filter className="text-gray-400" size={20} />
                    <select
                        className="w-full md:w-56 px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition font-semibold text-gray-700"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* 3. Candidate Table Section */}
            {filteredCandidates.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center flex flex-col items-center">
                    <XCircle className="text-gray-200 mb-4" size={64} />
                    <p className="text-gray-500 text-xl font-bold">No results found</p>
                    <p className="text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
                    <button
                        onClick={() => { setSearchTerm(''); setStatusFilter('All'); }}
                        className="mt-6 px-6 py-2 bg-blue-50 text-blue-600 rounded-full font-bold hover:bg-blue-100 transition"
                    >
                        Reset All Filters
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Candidate Info</th>
                                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Target Position</th>
                                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Current Status</th>
                                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredCandidates.map((candidate) => (
                                    <CandidateRow
                                        key={candidate.id}
                                        candidate={candidate}
                                        navigate={navigate}
                                        handleDelete={handleDelete}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;