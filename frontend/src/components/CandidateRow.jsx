import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CandidateRow = ({ candidate, navigate, handleDelete }) => {
    return (
        <tr className="hover:bg-blue-50/20 transition-colors">
            <td className="px-8 py-5">
                <div className="font-bold text-gray-900 text-lg">{candidate.name}</div>
                <div className="text-sm text-gray-500 font-medium">{candidate.email}</div>
            </td>
            <td className="px-8 py-5">
                <div className="text-gray-800 font-bold">{candidate.applied_position || "Not Specified"}</div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-tight">{candidate.experience || "Freshman"}</div>
            </td>
            <td className="px-8 py-5 text-center">
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black tracking-wider border-2 ${candidate.status === 'Hired' ? 'bg-green-50 text-green-700 border-green-100' :
                        candidate.status === 'Interviewing' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                            candidate.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                                'bg-gray-50 text-gray-500 border-gray-100'
                    }`}>
                    {candidate.status.toUpperCase()}
                </span>
            </td>
            <td className="px-8 py-5">
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => navigate(`/edit/${candidate.id}`)}
                        className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm"
                        title="Edit Candidate"
                    >
                        <Edit size={20} />
                    </button>
                    <button
                        onClick={() => handleDelete(candidate.id)}
                        className="p-2.5 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm"
                        title="Delete Record"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default CandidateRow;
