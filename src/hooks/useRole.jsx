import React from 'react';
import useAuth from './useAuth';
import useAxiosS from './useAxiousS';
import { useQuery } from '@tanstack/react-query';


function useRole() {
    const {user }  = useAuth();
    const axiosS = useAxiosS();

    const {roleLoading, data: role = 'user' } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async() => {
            const res = await axiosS.get(`/users/${user.email}/role`);
            return res.data;
        }
    })
    
  return {role, roleLoading };
}

export default useRole
