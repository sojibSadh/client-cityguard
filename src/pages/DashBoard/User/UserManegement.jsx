import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import useAxiosS from '../../../hooks/useAxiousS'
import { FaUserShield } from 'react-icons/fa';
import { FaFileShield } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Bars } from 'react-loader-spinner';

function UserManegement() {
    const axiosS = useAxiosS()
    const [searchText, setSearchText] = useState('');

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosS.get(`/users?searchText=${searchText}`);
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
        const blockInfo = { blocked: true, workStatus: "not-available"};
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



    // if (isLoading) {
    //   return  <div className='flex justify-center items-center h-screen'><Bars
    //         height="40"
    //         width="40"
    //         color="#4fa94d"
    //         ariaLabel="bars-loading"
    //         wrapperStyle={{}}
    //         wrapperClass=""
    //         visible={true}
    //     /></div>
    // }

    const citizens = users.filter(user => user.role === "citizen");
    // console.log(citizens);


    return (
        <>
            {
                !isLoading ? (
                    <div>
                        <div className='text-center py-5 '>
                            <div className='title py-3'>
                            All Citizens -
                                {citizens.length}
                            </div>
                            <div className='pt-3'>
                                <label className="input w-[50%] bg-gray-300 text-orange-500 font-semibold">
                                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2.5"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <path d="m21 21-4.3-4.3"></path>
                                        </g>
                                    </svg>
                                    <input  onChange={(e) => setSearchText(e.target.value)} type="search" required placeholder="Search" />
                                </label>
                            </div>
                        </div>
                        <div className="overflow-x-auto  ml-4 border border-primary/50  shadow-md shadow-gray-500">
                            <table className="table">
                                {/* head */}
                                <thead className='tableHead '>
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
                                        <th >User Access </th>
                                        <th >User Block </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {citizens.map((user, index) => <tr key={user._id}>
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
                                            <div className="btn btn-dash btn-secondary">{user.role} </div>
                                        </td>
                                        <td>
                                            {
                                                user.role === 'staff' ?
                                                    <button onClick={() => handleRemoveUser(user)} className='btn' ><FaFileShield /> </button> :
                                                    <button onClick={() => handleMakeUser(user)} className="btn btn-secondary" ><FaUserShield /> </button>
                                            }
                                        </td>
                                        <td>
                                            <div className="font-bold">
                                                {
                                                    user.subscription === 'free' ?
                                                    <button className="btn btn-dash btn-error" > Free User </button> :
                                                    <button className="btn btn-dash btn-secondary"> Premium  </button>
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-bold">
                                                {
                                                    user.blocked == false ?
                                                    <button onClick={() => handleMakeBlock(user)} className="btn btn-dash btn-secondary" > Not-Block  </button> :
                                                    <button className="btn btn-dash btn-error"> Block  </button>
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

export default UserManegement
