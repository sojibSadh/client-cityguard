import React from 'react'
import useAuth from '../hooks/useAuth'
import useRole from '../hooks/useRole';
import Forviden from '../components/Forviden';


function CitizenRoute({ children }) {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useRole();
    if (loading || roleLoading) {
        return <div>
            <span className='loading loading-infinity loading-xl'> </span>
        </div>
    }

    if (role?.role !== 'citizen') {
        return <Forviden/>
    }


    return children
}

export default CitizenRoute
