import { useQuery } from '@tanstack/react-query';
import React from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxiosS from '../../../hooks/useAxiousS';
import { Link } from 'react-router';
import { GiSelfLove } from 'react-icons/gi';


function Latest() {
    const { user } = useAuth();
    const axiosS = useAxiosS();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['feature-issues'],
        queryFn: async () => {
            const res = await axiosS.get('/feature-issues');
            const data = res.data;
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

    console.log(data);
    return (
        <div className='bg-orange-600/10 rounded-2xl md:py-20 py-8'>
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="md:text-4xl text-[22px] font-bold text-orange-600 mb-4">
                        Latest Resolved Issues
                    </h2>
                    <p className="sub-title max-w-2xl mx-auto">
                        Our smart city issue management system is designed to ensure faster
                        response, transparency, and better communication between citizens,
                        staff, and administrators.
                    </p>
                </div>

                <div className="grid md:grid-cols-3  gap-8">
                    {data?.map((issue) => {
                        const hasUpvoted = issue.upvotedUsers?.includes(user?.email);

                        return (
                            <div
                                key={issue._id}
                                className="bg-gray-900 rounded-xl shadow-xl shadow-gray-600 hover:shadow-gray-600 overflow-hidden transform hover:scale-[1.02] transition duration-300 ease-in-out"
                            >
                                <img
                                    src={issue.image || 'https://via.placeholder.com/600x400.png?text=Issue+Image'}
                                    alt={issue.title}
                                    className="h-48 w-full object-cover"
                                />

                                <div className="p-5 ">
                                    <h2 className="text-2xl text-center font-bold text-orange-600 truncate mb-1" title={issue.title}>
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
                </div>
            </div>

        </div>
    )
}

export default Latest
