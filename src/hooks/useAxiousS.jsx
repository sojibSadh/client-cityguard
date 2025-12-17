import axios from 'axios';
import React, { useEffect } from 'react'
import useAuth from './useAuth';

const axiosS = axios.create({
    baseURL: 'https://city-guard-server.vercel.app'
});


const useAxiosS = () => {
    const { user, logOut } = useAuth();

    useEffect(() => {
        // request interceptor
        const reqInterceptor = axiosS.interceptors.request.use((config) => {
            if (user?.accessToken) {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        });

        // cleanup interceptor
        // return () => {
        //     axiosS.interceptors.request.eject(interceptor);
        // };
        const resInterceptor = axiosS.interceptors.response.use((response) => {
            return response;
        }, (err) => {
            const statusCode = err.status;
            if (statusCode === 401 || statusCode === 403) {
                logOut();
            }

            return Promise.reject(err);
        });

        return () => {
            axiosS.interceptors.request.eject(reqInterceptor);
            axiosS.interceptors.request.eject(resInterceptor)
        }

    }, [user, logOut]);

    return axiosS;
};

export default useAxiosS;
