import React from 'react'
import useRole from '../../hooks/useRole'
import AdminDashboardHome from './AdminDashboardHome';
import UserDashboardHome from './UserDashboardHome';
import StaffDashboardHome from './StaffDashboardHome ';

function DashBoardHome() {
    const { role, roleLoading} = useRole();

    if(role?.role === 'admin') {
        return <AdminDashboardHome/>
    }
    if(role?.role === 'staff') {
        return <StaffDashboardHome/>
    }
    if(role?.role === 'citizen') {
        return <UserDashboardHome/>
    }
}

export default DashBoardHome;
