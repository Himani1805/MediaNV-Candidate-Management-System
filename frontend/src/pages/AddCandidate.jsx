import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api/axios';
import { UserPlus, ArrowLeft, Save } from 'lucide-react';

const AddCandidate = () => {
    const navigate = useNavigate();

    // Initial state matching our database schema
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        phone: '',
        skills: '',
        experience: '',
        applied_position: '',
        status: 'Applied' // Defaults to 'Applied' as per backend logic
    });

    const [loading, setLoading] = useState(false);

    // Dynamic change handler for all fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // POST request to our validated backend endpoint
            await API.post('/candidates', formData);
            toast.success("New candidate added to the pipeline!");
            navigate('/'); // Redirect to Home
        } catch (error) {
            // Error handling for validation or unique email constraints
            const errorMsg = error.response?.data?.message || "Operation failed";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition"
            >
                <ArrowLeft size={20} /> Back to Dashboard
            </button>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-blue-600 p-6 flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-lg text-white">
                        <UserPlus size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Add New Candidate</h2>
                        <p className="text-blue-100 text-sm">Enter essential information to start the recruitment process</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="e.g. Rahul Sharma" />
                    </div>

                    {/* Email */}
                    <div className="md:col-span-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="rahul@example.com" />
                    </div>

                    {/* Age */}
                    <div className="md:col-span-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Age *</label>
                        <input type="number" name="age" required min="18" value={formData.age} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Min 18" />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="+91 ..." />
                    </div>

                    {/* Applied Position */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Applied Position</label>
                        <input type="text" name="applied_position" value={formData.applied_position} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="e.g. Node.js Developer" />
                    </div>

                    {/* Skills */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Technical Skills</label>
                        <textarea name="skills" rows="2" value={formData.skills} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="React, Node.js, PostgreSQL..." />
                    </div>

                    {/* Experience */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Work Experience</label>
                        <input type="text" name="experience" value={formData.experience} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="e.g. 3 Years at TechCorp" />
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 mt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 disabled:bg-gray-400"
                        >
                            {loading ? "Adding..." : <><Save size={20} /> Save Candidate</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCandidate;