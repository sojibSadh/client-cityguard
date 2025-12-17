import axios from 'axios';
import React from 'react'

const axiosS = axios.create({
    baseURL: 'https://city-guard-server.vercel.app'
});

function useAxios() {
  return axiosS

}

export default useAxios
