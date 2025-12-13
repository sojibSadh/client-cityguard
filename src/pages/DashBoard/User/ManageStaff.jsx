import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

import { FaFileShield, FaUserShield } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Bars } from 'react-loader-spinner';
import useAxiosS from '../../../hooks/useAxiousS';

function ManageStaff() {
    const axiosS = useAxiosS();
    const [searchText, setSearchText] = useState('');

    const { data: staff = [], refetch, isLoading } = useQuery({
        queryKey: ['staff'],
        queryFn: async () => {
            const res = await axiosS.get(`/admin/staff`);
            return res.data;
        }
    });


    const handleMakeUser = user => {
        const roleInfo = { role: 'staff', workStatus: "available" };
        axiosS.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleRemoveUser = user => {
        const roleInfo = { role: 'citizen', workStatus: "free" };
        console.log(user);
        axiosS.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleMakeBlock = user => {
        const blockInfo = { blocked: true, workStatus: "not-available" };
        axiosS.patch(`/users/${user._id}/block`, blockInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <>
            {
                !isLoading ? (
                    <div>
                        <div className='text-center py-5'>
                            <div className='title'>
                                Staff : <span>  {staff.length}</span>

                            </div>

                        </div>
                        <div className="overflow-x-auto ml-4 border border-primary/50  shadow-md shadow-gray-500">
                            <table className="table">
                                {/* head */}
                                <thead className='tableHead'>
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <th>User </th>
                                        <th>Email</th>
                                        <th>Role </th>
                                        <th>Admin Action</th>
                                        <th>workStatus
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staff.map((user, index) => <tr key={user._id}>
                                        <th>
                                            <label>
                                                {index + 1}
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex jus-c items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={user.photoURL}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <h4>{user.displayName}</h4>

                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-bold">{user.email} </div>
                                        </td>
                                        <td>
                                            <div className="font-bold">{user.role} </div>
                                        </td>
                                        <td>
                                            {
                                                user.role === 'staff' &&
                                                <button onClick={() => handleRemoveUser(user)} className="btn  btn-secondary" ><FaFileShield /> </button>
                                            }
                                        </td>
                                        <td>
                                            <div className="font-bold">
                                                {
                                                    user.workStatus === "available" ?
                                                        <button className="btn btn-dash btn-secondary" > Available  </button> :
                                                        <button className="btn btn-dash btn-error"> Working </button>
                                                }
                                            </div>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) :
                    (
                        <div className='flex justify-center items-center h-screen'><Bars
                            height="40"
                            width="40"
                            color="#4fa94d"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        /></div>
                    )
            }
        </>


    )
}

export default ManageStaff
