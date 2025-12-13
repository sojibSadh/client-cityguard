import React from 'react'
import useAxiousS from '../../../hooks/useAxiousS';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { FaTrashAlt } from 'react-icons/fa';
import { RiFileEditFill } from 'react-icons/ri';
import { FaMagnifyingGlass } from 'react-icons/fa6';

function PaymentHistoryCitizen() {
  const { user } = useAuth();
  const axiosSecure = useAxiousS();

  const { data: payments = [] } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`)
      return res.data
    }
  })

  console.log(payments);
  return (
    <div>
      <div className="overflow-x-auto border border-base-300 rounded-lg">
        <table className="table w-full table-zebra table-lg">
          {/* Table Head */}
          <thead>
            <tr className="bg-base-200 text-lg text-base-content uppercase">
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
              <tr key={issue._id} className="hover:bg-base-100 transition-colors duration-200">
                <td className=" text-gray-600 ">{issue.trackingId}</td>
                <td>
                  {/* Priority Badge */}

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

export default PaymentHistoryCitizen
