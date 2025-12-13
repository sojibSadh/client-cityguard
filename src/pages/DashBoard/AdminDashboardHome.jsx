import React from 'react'
import useAxiosS from '../../hooks/useAxiousS'
import { useQuery } from '@tanstack/react-query';
import { Legend, Pie, PieChart, Tooltip } from 'recharts';

function AdminDashboardHome() {
    const axiosS = useAxiosS();
    const { data: deliveryStats = [] } = useQuery({
        queryKey: ['delivery-status-stats'],
        queryFn: async () => {
            const res = await axiosS.get('/issues/status/stats');
            return res.data;
        }
    });


    const getPieChartData = data => {
        return data.map(item => {
           return { name: item.status, value: item.count  }})
    }

    return (
        <div>

            <div className="mt-5 md:ml-5 grid gap-6  md:grid-cols-3">
                {
                    deliveryStats.map((stat, index) => <div key={index} className="stat bg-gray-700 place-items-center rounded-2xl shadow-md shadow-primary ">
                        <div className="stat-title text-info"> {stat._id} </div>
                        <div className="stat-value text-orange-600">{stat.count}K  </div>
                        <div className="stat-desc text-gray-300">From January 1st to February 1st</div>
                    </div>)
                }

            </div>
            <div className='md:ml-[30%] text-center'>
                <PieChart style={{  maxWidth: '500px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
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
                    <Legend/>
                    <Tooltip/>
                </PieChart>
            </div>


        </div>
    )
}

export default AdminDashboardHome
