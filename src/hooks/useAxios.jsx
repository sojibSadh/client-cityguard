import axios from 'axios';
import React from 'react'

const axiosS = axios.create({
    baseURL: 'http://localhost:3000'
});

function useAxios() {
  return axiosS

}

export default useAxios
