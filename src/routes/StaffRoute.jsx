import React from 'react'
import useAuth from '../hooks/useAuth'
import useRole from '../hooks/useRole';
import Forviden from '../components/Forviden';


function StaffRoute({ children }) {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useRole();

    console.log(role);

    if (loading || roleLoading) {
        return <div>
            <span className='loading loading-infinity loading-xl'> </span>
        </div>
    }

    if (role?.role !== 'staff') {
        return <Forviden/>
    }


    return children
}

export default StaffRoute
