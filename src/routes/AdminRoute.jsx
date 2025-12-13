import React from 'react'
import useAuth from '../hooks/useAuth'
import useRole from '../hooks/useRole';
import Forviden from '../components/Forviden';


function AdminRoute({ children }) {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useRole();

    console.log(role);

    if (loading || roleLoading) {
        return <div>
            <span className='loading loading-infinity loading-xl'> </span>
        </div>
    }

    if (role?.role !== 'admin') {
        return <Forviden/>
    }


    return children
}

export default AdminRoute
