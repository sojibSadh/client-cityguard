import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosS from "../../../hooks/useAxiousS";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";

const AdminAllIssues = () => {
    const { user } = useAuth();
    const axiosS = useAxiosS();

    const { data: issues, isLoading, refetch } = useQuery({
        queryKey: ["admin-issues"],
        queryFn: async () => {
            const res = await axiosS.get("/admin/issues");
            return res.data; // Ensure you are returning the array of issues
        }
    });

    const handleReject = async (issueId) => {
        try {
            const res = await axiosS.patch(`/admin/issues/reject/${issueId}`);

            if (res.data.success) {
                toast.success("Issue Rejected Completed to server");
                refetch(); // React Query
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to reject issue");
        }
    };



    if (isLoading) return <div className='flex justify-center items-center h-screen'><Bars
        height="40"
        width="40"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
    /></div>

    // Helper function to get badge class based on status/priority
    const getBadgeClass = (value, type) => {
        const lowerCaseValue = value?.toLowerCase();

        if (type === 'status') {
            if (lowerCaseValue === 'pending') return 'badge-warning';
            if (lowerCaseValue === 'resolved') return 'badge-success';
            if (lowerCaseValue === 'rejected') return 'badge-error';
            return 'badge-info'; // Default for any other status
        }

        if (type === 'priority') {
            if (lowerCaseValue === 'high') return 'badge-error ';
            if (lowerCaseValue === 'normal') return 'badge-info';
            if (lowerCaseValue === 'low') return 'badge-info';
            return 'badge-ghost';
        }
    };


    return (
        <div className="p-4 sm:p-6 bg-base-100 rounded-box shadow-xl">
            <h2 className="text-3xl font-extrabold mb-6 text-primary">All Issues Management</h2>

            {/* Responsive Table Container (DaisyUI component) */}
            <div className="overflow-x-auto border border-base-300 rounded-lg">
                <table className="table w-full table-zebra table-lg">
                    {/* Table Head */}
                    <thead>
                        <tr className="bg-base-200 text-lg text-base-content uppercase">
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Author</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {issues?.map(issue => (
                            <tr key={issue._id} className="hover:bg-base-100 transition-colors duration-200">
                                <td className="font-semibold text-gray-600 ">{issue.title}</td>
                                <td><span className="badge badge-outline">{issue.category}</span></td>
                                <td>
                                    {issue.status === "pending" ? (
                                        <button
                                            onClick={() => handleReject(issue._id)}
                                            className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                                        >
                                            Pending
                                        </button>
                                    ) : (
                                        <span className="text-red-500 text-sm px-3 py-1 text-sm bg-gray-200 rounded">Rejected</span>
                                    )}
                                </td>

                                <td>
                                    {/* Priority Badge */}
                                    <span className={`badge  text-sm px-3 py-1  ${getBadgeClass(issue.priority, 'priority')} text-xs`}>
                                        {issue.priority}
                                    </span>
                                </td>
                                <td className="text-sm text-gray-500">{issue.authorEmail}</td>
                                <td className="text-center">
                                    <button className="btn btn-sm btn-primary btn-outline">
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {issues && issues.length === 0 && (
                <div className="p-8 text-center bg-base-200 rounded-lg mt-4">
                    <p className="text-lg font-medium text-gray-500">No issues found.</p>
                </div>
            )}
        </div>
    );
};

export default AdminAllIssues;