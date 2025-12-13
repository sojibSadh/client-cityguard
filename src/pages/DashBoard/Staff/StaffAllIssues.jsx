
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosS from "../../../hooks/useAxiousS";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import { useState } from "react";

const StaffAllIssues = () => {
    const { user } = useAuth();
    const axiosS = useAxiosS();

    const [filterStatus, setFilterStatus] = useState("");
    const [filterPriority, setFilterPriority] = useState("");

    const { data: issues = [], isLoading, refetch } = useQuery({
        queryKey: ["staff-issues", filterStatus, filterPriority],
        queryFn: async () => {
            let url = `/staff/issues?email=${user?.email}`;
            if (filterStatus) url += `&status=${filterStatus}`;
            if (filterPriority) url += `&priority=${filterPriority}`;

            const res = await axiosS.get(url);
            return res.data;
        }
    });

    const handleStatusUpdate = async (issue) => {
        const validNext = {
            pending: "in-progress",
            "in-progress": "working",
            working: "resolved",
            resolved: "closed"
        };

        const nextStatus = validNext[issue.status];

        if (!nextStatus) {
            toast.error("No further actions allowed!");
            return;
        }

        try {
            const res = await axiosS.patch(`/staff/issues/status/${issue._id}`, {
                newStatus: nextStatus,
                staffName: user.displayName
            });

            if (res.data.success) {
                toast.success(`Status updated to ${nextStatus}`);
                refetch();
            }
        } catch (err) {
            toast.error("Update failed");
        }
    };

    if (isLoading)
        return (
            <div className='flex justify-center items-center h-screen'>
                <Bars height="40" width="40" color="#4fa94d" visible={true} />
            </div>
        );

    const getBadgeClass = (value, type) => {
        const v = value?.toLowerCase();

        if (type === 'priority') {
            if (v === 'high') return 'badge-error text-white';
            if (v === 'low') return 'badge-info';
            return 'badge-ghost';
        }
        if (type === 'status') {
            if (v === 'pending') return 'badge-warning';
            if (v === 'resolved') return 'badge-success';
            return 'badge-info';
        }
    };

    return (
        <div className="p-5 bg-base-100 rounded-box shadow-xl">

            <h2 className="text-3xl font-bold mb-5">Assigned Issues</h2>

            {/* Filters */}
            <div className="flex gap-4 mb-4">
                <select
                    className="select select-bordered"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">Filter by Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="working">Working</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                </select>

                <select
                    className="select select-bordered"
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                >
                    <option value="">Filter by Priority</option>
                    <option value="high">High</option>
                    <option value="normal">Normal</option>
                    <option value="low">Low</option>
                </select>

                <button className="btn btn-warning" onClick={() => { setFilterPriority(""); setFilterStatus(""); }}>
                    Clear Filters
                </button>
            </div>

            <div className="overflow-x-auto border rounded-lg">
                <table className="table w-full table-zebra">
                    <thead>
                        <tr className="bg-base-200 text-lg">
                            <th>Title</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Boosted</th>
                            <th>Author</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {issues.map(issue => (
                            <tr key={issue._id}>
                                <td>{issue.title}</td>
                                <td><span className={`badge ${getBadgeClass(issue.priority, "priority")}`}>{issue.priority}</span></td>

                                <td><span className={`badge ${getBadgeClass(issue.status, "status")}`}>{issue.status}</span></td>

                                <td>{issue.boosted ? "🔥 Boosted" : "—"}</td>

                                <td>{issue.authorEmail}</td>

                                <td className="text-center">
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => handleStatusUpdate(issue)}
                                    >
                                        Change → {issue.status === "resolved" ? "closed" : ""}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {issues.length === 0 && (
                <div className="text-center p-8">No assigned issues found.</div>
            )}

        </div>
    );
};

export default StaffAllIssues;
