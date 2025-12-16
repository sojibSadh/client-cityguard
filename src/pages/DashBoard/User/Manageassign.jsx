import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosS from '../../../hooks/useAxiousS';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';

function AssignIssue() {
    const axiosS = useAxiosS();
    const [selectedStaff, setSelectedStaff] = useState("");

    // Load all issues (pending or unassigned)
    const { data: issues = [], isLoading, refetch: refetchIssues } = useQuery({
        queryKey: ['issues'],
        queryFn: async () => {
            const res = await axiosS.get('/admin/issues');
            return res.data;
        }
    });

    // Load all staff
    const { data: staff = [], refetch: refetchStaff } = useQuery({
        queryKey: ['staff'],
        queryFn: async () => {
            const res = await axiosS.get('/admin/staff');
            return res.data;
        }
    });


    const handleAssign = async (issueId) => {
        if (!selectedStaff) {
            toast.error( "Select a staff first!" );
        }

        const staffInfo = staff.find(s => s._id === selectedStaff);

        const assignData = {
            staffEmail: staffInfo.email,  // backend only needs this!
        };

        const res = await axiosS.patch(`/admin/issues/assign/${issueId}`, assignData);

        if (res.data.success) {
            Swal.fire({
                icon: "success",
                title: "Issue Assigned Successfully!",
                timer: 1500,
                showConfirmButton: false,
            });

            refetchIssues();
            refetchStaff();
        } else {
            toast.error(res.data.message)
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

    return (
        <div className="p-6">
            <h2 className="text-3xl title mb-4 text-center ">Assign Staff To Issue</h2>

            {/* Staff Dropdown */}
            <div className="mb-6 mx-auto text-center">
                <label className="block mb-2 font-semibold uppercase">Select Staff</label>
                <select
                    className="select select-bordered  w-[50%] bg-gray-300 text-orange-500 font-semibold"
                    value={selectedStaff}
                    onChange={(e) => setSelectedStaff(e.target.value)}
                >
                    <option value="">-- Select Staff --</option>
                    {staff.filter(s => s.workStatus === 'available').map(s => (
                        <option key={s._id} value={s._id}>
                            {s.displayName} ({s.email})
                        </option>
                    ))}
                </select>
            </div>

            {/* Issues Table */}
            <div className="overflow-x-auto ml-4 border border-primary/50  shadow-md shadow-gray-500">
                <table className="table w-full">
                    <thead className='tableHead' >
                        <tr>
                            <th className='text-orange-600'>#</th>
                            <th>Issue Title</th>
                            <th>Status</th>
                            <th>Assign</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((issue, index) => (
                            <tr key={issue._id}>
                                <td>{index + 1}</td>
                                <td>{issue.title}</td>
                                <td>
                                    {issue.assignedStaff ? (
                                        <span className="badge badge-success py-4">Assigned</span>
                                    ) : (
                                        <span className="badge badge-warning py-4">Not Assigned</span>
                                    )}
                                </td>
                                <td>
                                    {!issue.assignedStaff ? (
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleAssign(issue._id)}
                                        >
                                            Assign
                                        </button>
                                    ) : (
                                        <button className="btn btn-disabled bg-gray-300 text-black btn-sm">
                                            Already Assigned
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AssignIssue;
