import React from 'react';
import useAxiosS from '../../hooks/useAxiousS';
import { useQuery } from '@tanstack/react-query';
import { Legend, Pie, PieChart, Tooltip } from 'recharts';
import useAuth from '../../hooks/useAuth';

function StaffDashboardHome() {
    const { user } = useAuth();
    const axiosS = useAxiosS();

    const { data: stats = {} } = useQuery({
        queryKey: ['staff-dashboard-stats'],
        queryFn: async () => {
            const res = await axiosS.get(`/issuesStaff/status/stats?email=${user.email}`);
            return res.data;
        }
    });

    const chartData = stats.chart?.map(item => ({
        name: item.status,
        value: item.count
    })) || [];

    return (
        <div>
            <h2 className="title text-center my-6">Staff Dashboard</h2>

            {/* Summary Cards */}
            <div className="shadow grid grid-cols-3 gap-4 my-6 pl-4">
                <div className="stat place-items-center p-4 border border-primary/50 shadow-xl hover:shadow-md shadow-gray-500/50 rounded-lg">
                    <div className="stat-title">Assigned Issues</div>
                    <div className="stat-value">{stats.assignedCount || 0}</div>
                    <div className="stat-desc">Total assigned</div>
                </div>

                <div className="stat place-items-center p-4 border border-primary/50 shadow-xl hover:shadow-md shadow-gray-500/50 rounded-lg">
                    <div className="stat-title">Resolved Issues</div>
                    <div className="stat-value">{stats.resolvedCount || 0}</div>
                    <div className="stat-desc">Completed by you</div>
                </div>

                <div className="stat place-items-center p-4 border border-primary/50 shadow-xl hover:shadow-md shadow-gray-500/50 rounded-lg">
                    <div className="stat-title">Today's Tasks</div>
                    <div className="stat-value">{stats.todaysTaskCount || 0}</div>
                    <div className="stat-desc">Updated Today</div>
                </div>
            </div>

            {/* Charts */}
            <div className="flex justify-center">
                <PieChart width={400} height={300}>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={chartData}
                        cx="50%"
                        cy="80%"
                        outerRadius={120}
                        fill="#8884d8"
                        label
                    />
                    <Legend />
                    <Tooltip />
                </PieChart>
            </div>
        </div>
    );
}

export default StaffDashboardHome;
