import React from 'react'
import Logo from '../assets/logo.png'
import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png';

function AuthLayout() {
    return (
        <div className='max-w-7xl mx-auto '>

            <div className='flex justify-between mt-12'>
                <div className='flex-1'>
                    <div className='w-[220px] mx-auto'>
                        <img src={Logo} alt="logo" />
                    </div>
                    <Outlet></Outlet> </div>
                <div className='flex-1'> <img src={authImg} alt="" /> </div>
            </div>

        </div>
    )
}

export default AuthLayout
