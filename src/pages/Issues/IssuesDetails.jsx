
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosS from '../../hooks/useAxiousS';
import useAuth from '../../hooks/useAuth';
import { FaX } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { DollarSign, Edit3, Trash2, X } from "lucide-react";

// moment.js import (Ensure you have this installed: npm install moment)
import moment from 'moment';

// Lucide Icons Import (assuming these are available)
import {
    Zap,
    Send,
    User,
    CheckCircle,
    XCircle,
    RotateCw,
    AlertTriangle,
    Clock,
    Briefcase
} from 'lucide-react';
import { Bars } from 'react-loader-spinner';


// --- Helper Functions for Timeline Details ---

/**
 * Provides color, icon, and text based on the timeline entry's type/status.
 * @param {string} type - The type or status of the timeline entry.
 * @returns {{color: string, icon: JSX.Element, text: string, role: string}}
 */
const getTimelineEntryDetails = (type) => {
    switch (type.toLowerCase()) {
        case 'created':
        case 'reported':
            return {
                color: 'bg-blue-600',
                icon: <Send className="w-4 h-4 text-white" />,
                text: 'Issue Reported',
            };
        case 'pending':
            return {
                color: 'bg-indigo-600',
                icon: <Clock className="w-4 h-4 text-white" />,
                text: 'Pending Review',
            };
        case 'assigned':
            return {
                color: 'bg-cyan-600',
                icon: <Briefcase className="w-4 h-4 text-white" />,
                text: 'Staff Assigned',
            };
        case 'in-progress':
        case 'work_started':
            return {
                color: 'bg-yellow-600',
                icon: <RotateCw className="w-4 h-4 text-white" />,
                text: 'Work In-Progress',
            };
        case 'resolved':
            return {
                color: 'bg-green-600',
                icon: <CheckCircle className="w-4 h-4 text-white" />,
                text: 'Issue Resolved',
            };
        case 'closed':
            return {
                color: 'bg-gray-700',
                icon: <CheckCircle className="w-4 h-4 text-white" />,
                text: 'Issue Closed',
            };
        case 'boost':
            return {
                color: 'bg-orange-600',
                icon: <Zap className="w-4 h-4 text-white" />,
                text: 'Priority Boosted',
            };
        case 'rejection':
        case 'admin_rejected':
            return {
                color: 'bg-red-600',
                icon: <XCircle className="w-4 h-4 text-white" />,
                text: 'Admin Rejected',
            };
        default:
            return {
                color: 'bg-purple-600',
                icon: <AlertTriangle className="w-4 h-4 text-white" />,
                text: 'Status Update',
            };
    }
};

/**
 * Determines the user's name/role from the 'by' field.
 */
const getUpdaterNameAndRole = (by, issueAuthorEmail) => {
    if (by === issueAuthorEmail) {
        return { name: 'Citizen/Reporter', roleClass: 'bg-gray-200 text-gray-800' };
    }
    // Real implementation would check user roles from a database/context
    if (by.toLowerCase().includes('admin')) {
        return { name: 'Admin', roleClass: 'bg-red-200 text-red-800' };
    }
    if (by.toLowerCase().includes('staff') || by.toLowerCase().includes('user')) {
        return { name: 'Staff/Other', roleClass: 'bg-blue-200 text-blue-800' };
    }
    // Fallback to the provided email/ID
    return { name: by.split('@')[0], roleClass: 'bg-gray-100 text-gray-700' };
};


// --- React Component ---

export default function IssuesDetails() {
    const [editingData, setEditingData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosS = useAxiosS();
    const { user } = useAuth();

    // Fetch issue details
    const { data: issue, isLoading, refetch } = useQuery({
        queryKey: ['issue-details', id],
        queryFn: async () => {
            const res = await axiosS.get(`/issues/${id}`);
            return res.data;
        },
        enabled: !!user // private route
    });

    if (!user) {
        return <p className="text-center mt-10">Please login to view this issue.</p>;
    }

    if (isLoading) return <div className='flex justify-center items-center h-screen'><Bars
        height="40"
        width="40"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
    /></div>
    if (!issue) return <p className="text-center mt-10">Issue not found.</p>;

    const isOwner = user.email === issue.authorEmail;

    // Reverse the timeline array to show the latest update on top
    const reversedTimeline = issue.timeline ? [...issue.timeline].reverse() : [];


    const handleUpdatePost = (dataEdit) => {
        setEditingData(dataEdit);
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        if (!editingData) return;

        const form = e.target;
        const updatedData = {
            title: form.title.value,
            category: form.category.value,
            description: form.description.value,
            image: form.image.value,
            // Assuming location and priority are not editable by default user
        };

        axiosS
            .patch(`/issues/${editingData._id}?email=${user?.email}`, updatedData)
            .then((res) => {
                if (res.data.modifiedCount) {
                    Swal.fire('Updated!', 'Issue updated successfully!', 'success');
                    setEditingData(null);
                    refetch();
                }
            })
            .catch(() => {
                Swal.fire('Error', 'Failed to update issue.', 'error');
            });

    }


    const handleBoost = async (issue) => {
        try {
            const res = await axiosS.post('/create-payment-intent', {
                amount: 100, // Amount in lowest denomination (e.g., BDT Taka)
                issueId: issue._id,
                email: issue.authorEmail,
                issue: issue.title
            });

            window.location.href = res.data.url; // Redirect to payment gateway
        } catch (err) {
            console.error(err);
            Swal.fire('Payment Error', 'Could not initiate payment.', 'error');
        }
    };


    // --- Delete
    const handleDelete = async (issueId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosS
                    .delete(`/issues/${issueId}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire("Removed!", "Your issue has been deleted.", "success");
                            navigate('/dashboard/my-issue'); // Redirect after deletion
                        }
                    })
                    .catch(() => Swal.fire("Error", "Failed to remove issue.", "error"));
            }
        });
    };


    return (
        <>
            <div className="mx-auto p-4">
                {/* --- Issue Summary --- */}
                <div className="bg-black/60 shadow-xl rounded-lg p-2 mb-6">
                    <div>
                        <img src={issue.image} alt={issue.title} className="w-full h-120 object-cover rounded-lg mb-6 shadow-md" />
                    </div>
                    <div className='p-5'>
                        <div className='flex justify-between'>
                            <p className=' btn btn-dash btn-error text-white hover:text-primary hover:bg-transparent'><strong>Category:</strong> <span className='text-orange-600'>{issue.category} </span> </p>
                            <p className=' btn btn-dash btn-error text-white hover:text-primary hover:bg-transparent'>
                                <strong>Status : </strong>
                                <span >
                                    <span className='text-success'> {issue.status}</span>
                                </span>
                            </p>
                        </div>
                        <h1 className="title font-extrabold text-gray-900 text-center my-4">{issue.title}</h1>
                        <div className="my-5">
                            <p className="text-gray-300 border-l-4 text-center border-blue-400 pl-3">{issue.description}</p>
                        </div>
                        <div className="flex justify-between content-center gap-4 text-center text-white">

                            <p className='border-b-2 border-primary py-2 px-3  text-sm'><strong>Priority : </strong> <span className='text-info'>{issue.priority}</span>  </p>
                            <p className='border-b-2 border-primary py-2 px-3  text-sm'><strong>Location : </strong> <span className='text-cyan-400'> {issue.location}</span>  </p>
                        </div>

                    </div>
                </div>



                {/* --- Issue Timeline Section --- */}
                <div className="bg-black/60 shadow-xl rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-8 text-gray-400 border-b pb-3">
                        Issue Life Cycle Timeline 📜
                    </h2>

                    {reversedTimeline.length > 0 ? (
                        <div className="relative border-l-4 border-gray-600 ml-4 pl-4 space-y-8">
                            {reversedTimeline.map((entry, index) => {
                                // Determine the type for detail fetching (use 'status' if available, otherwise 'type')
                                const entryType = entry.status || entry.type;
                                const { color, icon, text } = getTimelineEntryDetails(entryType);
                                const { name: updaterName, roleClass } = getUpdaterNameAndRole(entry.by, issue.authorEmail);

                                return (
                                    <div key={index} className="relative">
                                        {/* Timeline Marker (Colored Dot/Icon) */}
                                        <div className={`absolute -left-7 top-0 p-2 rounded-full shadow-lg ${color} ring-4 ring-white`}>
                                            {icon}
                                        </div>

                                        {/* Timeline Content */}
                                        <div className=" p-4 bg-orange-950/30 rounded-lg shadow-xl shadow-gray-700">

                                            {/* Primary Action/Status */}
                                            <h3 className="text-lg font-bold text-orange-600 mb-1 flex justify-between items-center">
                                                {text}
                                                {/* Status Badge - Highlight the status if provided */}
                                                {entry.status && (
                                                    <span className={`ml-3 px-2 py-0.5 text-xs font-medium rounded-full text-white ${color}`}>
                                                        {entry.status}
                                                    </span>
                                                )}
                                            </h3>

                                            {/* Note/Message */}
                                            {entry.note && (
                                                <p className="text-sm text-gray-300 mt-1 italic border-l-2 border-gray-300 pl-2">
                                                    **Note/Message:** {entry.note}
                                                </p>
                                            )}

                                            {/* Updater Info and Date */}
                                            <div className="flex justify-between items-center mt-3 text-xs">
                                                <p className="font-medium text-gray-400">
                                                    Updated by:
                                                    <span className={`ml-1 px-2 py-0.5 rounded-full ${roleClass} font-semibold`}>
                                                        {updaterName}
                                                    </span>
                                                </p>
                                                <time className="text-orange-500 text-right">
                                                    {moment(entry.date).format('MMM D, YYYY')}
                                                    <br />
                                                    {moment(entry.date).format('hh:mm:ss A')}
                                                </time>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 italic">No timeline history found for this issue.</p>
                    )}
                </div>
                {/* --- End of Issue Timeline Section --- */}
                {/* --- Action Buttons --- */}
                <div className="flex flex-wrap justify-between gap-4 mt-6 mb-10">
                    {/* Edit */}
                    {isOwner && issue.status === 'pending' && (
                        <button
                            onClick={() => handleUpdatePost(issue)}
                            className=" px-4 py-2 btn-cusPrimary flex gap-2 items-center rounded-md"
                        >
                            <Edit3 className="w-4 h-4" />
                            Edit
                        </button>
                    )}

                    {/* Delete */}
                    {isOwner && (
                        <button
                            onClick={() => handleDelete(issue._id)}
                            className="px-4 py-2 text-sm rounded-md text-white bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2 font-medium shadow-md transition duration-150"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </button>
                    )}

                    {/* Boost */}
                    {isOwner && (
                        <button
                            onClick={() => handleBoost(issue)}
                            className="px-4 py-2 btn-cusPrimary  rounded-md  flex items-center gap-2 "
                        >
                            <DollarSign className="w-4 h-4" />
                            Boost 100tk
                        </button>
                    )}
                </div>

            </div>

            {/* Update Modal */}
            {editingData && (
                <div className="fixed inset-0 bg-black   flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-xl p-6 relative">
                        <button
                            onClick={() => setEditingData(null)}
                            className="absolute top-3 right-3 text-orange-500 hover:text-gray-800"
                        >
                            <FaX size={20} />
                        </button>

                        <h2 className=" title mb-4 text-center">Update Your Issue</h2>

                        <form onSubmit={handleUpdateSubmit} className="space-y-3">
                            <div>
                                <label className=" font-semibold text-gray-300">Title</label>
                                <input
                                    name="title"
                                    defaultValue={editingData.title}
                                    className="input text-black font-medium input-bordered w-full mt-1 border-orange-500 bg-gray-400 rounded-md p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className=" font-semibold text-gray-300">Category</label>
                                <input
                                    name="category"
                                    defaultValue={editingData.category}
                                    className="input text-black font-medium input-bordered w-full mt-1 border-orange-500 bg-gray-400 rounded-md p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className=" font-semibold text-gray-300">Image URL</label>
                                <input
                                    name="image"
                                    defaultValue={editingData.image}
                                    className="input text-black font-medium input-bordered w-full mt-1 border-orange-500 bg-gray-400 rounded-md p-2"
                                />
                            </div>

                            <div>
                                <label className=" font-semibold text-gray-300">Description</label>
                                <textarea
                                    name="description"
                                    defaultValue={editingData.description}
                                    className="textarea textarea-bordered text-black font-medium w-full mt-1 border-orange-500 bg-gray-400 rounded-md p-2"
                                    rows="3"
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingData(null)}
                                    className="px-4 py-2 text-red-500 border border-red-500 rounded-md hover:bg-black hob transition"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 btn-cusPrimary rounded-md">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}