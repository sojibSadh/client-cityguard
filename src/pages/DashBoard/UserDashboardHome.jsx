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

            <div className=" shadow grid grid-cols-3">
                {
                    deliveryStats.map((stat, index) => <div key={index} className="stat place-items-center">
                        <div className="stat-title"> {stat._id} </div>
                        <div className="stat-value">{stat.count}K  </div>
                        <div className="stat-desc">From January 1st to February 1st</div>
                    </div>)
                }

            </div>
            <div className='mx-auto text-center'>
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
