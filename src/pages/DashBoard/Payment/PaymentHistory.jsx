import React from 'react'
import useAxiousS from '../../../hooks/useAxiousS';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';


function PaymentHistory() {
  const { user } = useAuth();
  const axiosSecure = useAxiousS();

  const { data: payments = [] } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`)
      return res.data
    }
  })

  return (
    <div>
      <h2 className="title my-6 text-center">All Payments History</h2>

      <div className="overflow-x-auto">
        <table className="table w-full  table-lg">
          {/* Table Head */}
          <thead className='tableHead'>
            <tr className="text-lg">
              <th>trackingId</th>
              <th>issueEmail</th>
              <th>transactionId</th>
              <th>amount</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {payments?.map(issue => (
              <tr key={issue._id} className="hover:bg-gray-600 transition-colors duration-200">
                <td className="font-medium text-[16px] ">{issue.trackingId}</td>
                <td className='text-gray-300'>
                  {issue.issueEmail}
                </td>
                <td className=" text-gray-500">{issue.transactionId}</td>
                <td><span className="badge badge-outline">{issue.amount_total}</span></td>

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
    </div>
  )
}

export default PaymentHistory
