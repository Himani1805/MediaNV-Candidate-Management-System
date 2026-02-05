import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api/axios';
import { Save, ArrowLeft } from 'lucide-react';

const EditCandidate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', age: '', email: '', phone: '', skills: '',
        experience: '', applied_position: '', status: ''
    });

    // Fetch existing data on load
    useEffect(() => {
        const fetchCandidate = async () => {
            try {
                const response = await API.get(`/candidates/${id}`); // Uses GET /api/candidates/:id
                setFormData(response.data);
            } catch (error) {
                toast.error("Error fetching candidate details.");
                navigate('/');
            }
        };
        fetchCandidate();
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/candidates/${id}`, formData); // Uses PUT /api/candidates/:id
            toast.success("Candidate updated successfully!");
            navigate('/');
        } catch (error) {
            const msg = error.response?.data?.message || "Operation failed";
            toast.error(msg);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-600 mb-6">
                <ArrowLeft size={20} /> Back
            </button>
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-xl font-bold mb-6">Edit Candidate</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-1">Full Name *</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Email *</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Age *</label>
                        <input type="number" name="age" required value={formData.age} onChange={handleChange} className="w-full p-2 border rounded" />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-semibold mb-1">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded">
                            <option value="Applied">Applied</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Hired">Hired</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2">
                            <Save size={20} /> Update Candidate
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCandidate;