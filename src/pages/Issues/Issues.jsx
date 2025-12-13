import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosS from '../../hooks/useAxiousS';
import useAuth from '../../hooks/useAuth';
import { Bars } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { GiSelfLove } from "react-icons/gi";

export default function Issues() {
    const axiosS = useAxiosS();
    const { user } = useAuth();

    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['all-issues', category, status, priority, search, page],
        queryFn: async () => {
            const res = await axiosS.get('/issues', {
                params: { category, status, priority, search, page }
            });

            const data = res.data.data;
            return data
        }

    });


    const handleUpvote = async (issueId, reporterEmail, hasUpvoted) => {
        if (!user) return window.location.href = '/login';
        if (user.email === reporterEmail) return toast.success("You can't upvote your own issue.");
        if (hasUpvoted) return; // user already upvoted

        await axiosS.patch(`/issues/upvote/${issueId}`);

        refetch();  // refresh UI
    };

    // Helper function to get status badge styling
    const getStatusStyle = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-gray-900 text-gray-300 border border-orange-600';
            case 'in-progress':
                return 'bg-gray-900 text-gray-300 border border-orange-600';
            case 'resolved':
                return 'bg-gray-900 text-gray-300 border border-orange-600';
            default:
                return 'bg-gray-900 text-gray-300 border border-orange-600';
        }
    };

    // Helper function to get priority badge styling
    const getPriorityStyle = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-gray-900 text-orange-500 border  border-info-600';
            case 'Normal':
                return 'bg-gray-900 text-success border  border-info-600';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8  min-h-screen">
            <h1 className="text-center pb-8">
                <span  className='md:text-4xl' role="img" aria-label="issues">🚨 </span>
                <span className='title'>  All Community Issues </span>
            </h1>

            {/* --- Filters --- */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 p-4 bg-[#171717] shadow-2xl shadow-gray-600 rounded-xl shadow-lg">
                <input
                    className="col-span-1 md:col-span-2 p-3 border border-primary rounded-lg outline-0 focus:ring-orange-500 focus:border-orange-500  transition duration-150 ease-in-out"
                    placeholder="Search issues by title or keyword..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="p-3 border border-primary rounded-lg bg-gray-900 outline-0 focus:ring-orange-500 focus:border-orange-500 appearance-none transition duration-150 ease-in-out"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                >
                    <option value="">All Categories</option>
                    <option value="Sanitation">Sanitation</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Traffic">Traffic</option>
                    <option value="Noise Pollution">Noise Pollution</option>
                </select>

                <select
                    className="p-3 border border-primary rounded-lg bg-gray-900 outline-0 focus:ring-orange-500 focus:border-orange-500 appearance-none transition duration-150 ease-in-out"
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                </select>

                <select
                    className="p-3 border border-primary rounded-lg bg-gray-900 outline-0 focus:ring-orange-500 focus:border-orange-500 appearance-none transition duration-150 ease-in-out"
                    onChange={(e) => setPriority(e.target.value)}
                    value={priority}
                >
                    <option value="">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Normal">Normal</option>
                </select>
            </div>

            {/* --- Issue Cards --- */}
            {
                !isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {data.map((issue) => {
                            const hasUpvoted = issue.upvotedUsers?.includes(user?.email);

                            return (
                                <div
                                    key={issue._id}
                                    className="bg-dark2 rounded-xl shadow-xl shadow-gray-950 hover:shadow-gray-600 overflow-hidden transform hover:scale-[1.02] transition duration-300 ease-in-out"
                                >
                                    <img
                                        src={issue.image || 'https://via.placeholder.com/600x400.png?text=Issue+Image'}
                                        alt={issue.title}
                                        className="h-48 w-full object-cover"
                                    />

                                    <div className="p-5 ">
                                        <h2 className="text-2xl text-center font-bold text-primary truncate mb-1" title={issue.title}>
                                            {issue.title}
                                        </h2>
                                        <p className="text-md text-gray-300 text-center font-medium my-3">
                                            {issue.category} in {issue.location}
                                        </p>

                                        <div className="flex flex-wrap justify-center gap-2 my-5">
                                            <span className={`text-xs px-3 py-1 rounded-full ${getStatusStyle(issue.status)} font-medium`}>
                                                {issue.status}
                                            </span>
                                            <span className={`text-xs px-3 py-1 rounded-full ${getPriorityStyle(issue.priority)}`}>
                                                {issue.priority}
                                            </span>
                                            {issue.boosted && <span className="text-xs px-3 py-1 rounded-full bg-gray-900 text-info border  border-orange-600">⭐ Boosted</span>}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-between pt-3 border-t border-primary">
                                            {/* Upvote Button */}
                                            <button
                                                onClick={() => handleUpvote(issue._id, issue.authorEmail, hasUpvoted)}
                                                className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition duration-150 ease-in-out
                                            ${hasUpvoted ? "bg-orange-800 text-white hover:bg-orange-500" : "bg-orange-700 text-white hover:bg-orange-500"}`}
                                                disabled={hasUpvoted && user?.email !== issue.authorEmail}
                                            >
                                                <span role="img" aria-label="upvote">
                                                    {hasUpvoted ? '✅' : <GiSelfLove />}
                                                </span>
                                                <span className="text-base">{issue.upvotes}</span>
                                            </button>

                                            <Link
                                                to={`/issues/${issue._id}`}
                                                className="text-sm font-medium btn-cusPrimary py-2 px-3 rounded-full"
                                            >
                                                View Details →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {data?.data?.length === 0 && (
                            <p className="col-span-full text-center py-12 text-gray-500 text-lg">
                                No issues found matching the current criteria.
                            </p>
                        )}
                    </div>) :
                    <div className='flex justify-center items-center h-screen'><Bars
                        height="40"
                        width="40"
                        color="#4fa94d"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    /></div>
            }

            {/* --- Pagination --- */}
            <div className="flex justify-center items-center gap-6 mt-12">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                >
                    &larr; Previous
                </button>
                <span className="text-lg font-medium text-gray-700">Page {page}</span>
                <button
                    // A proper implementation would check if data.totalPages exists and if page < data.totalPages
                    onClick={() => setPage(page + 1)}
                    className="flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out"
                >
                    Next &rarr;
                </button>
            </div>
        </div>
    );
}