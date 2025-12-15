import React from 'react'
import useAxiosS from '../../hooks/useAxiousS'
import { useQuery } from '@tanstack/react-query';
import { Legend, Pie, PieChart, Tooltip } from 'recharts';
import useAuth from '../../hooks/useAuth';

function UserDashboardHome() {
    const { user } = useAuth();
    const axiosS = useAxiosS();
    const { data: deliveryStats = [] } = useQuery({
        queryKey: ['delivery-status-stats'],
        queryFn: async () => {
            const res = await axiosS.get(`/issuesCitizen/status/stats?email=${user.email}`);
            return res.data;
        }
    });


    const getPieChartData = data => {
        return data.map(item => {
            return { name: item.status, value: item.count }
        })
    }

    return (
        <div>
            <h2 className="title text-center my-6">Citizen Dashboard</h2>
            <div className="shadow flex  justify-center items-center">
                {
                    deliveryStats.map((stat, index) => <div key={index} className="stat bg-gray-800 place-items-center p-4 border border-primary/50 shadow-xl hover:shadow-md shadow-gray-500/50 rounded-lg">
                        <div className="stat-title text-info"> {stat._id} </div>
                        <div className="stat-value text-orange-600">{stat.count}K  </div>
                        <div className="stat-desc text-gray-100">From January 1st to February 1st</div>
                    </div>)
                }
            </div>
            <div className="flex justify-center">
                <PieChart style={{ width: '50%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={getPieChartData(deliveryStats)}
                        cx="50%"
                        cy="100%"
                        outerRadius="120%"
                        fill="#8884d8"
                        label
                        isAnimationActive={true}
                    />
                    <Legend />
                    <Tooltip />
                </PieChart>
            </div>


        </div>
    )
}

export default UserDashboardHome
