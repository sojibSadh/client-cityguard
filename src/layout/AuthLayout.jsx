import React from 'react'
import Logo from '../assets/logo.png'
import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png';

function AuthLayout() {
    return (
        <div className='max-w-[1400px] mx-auto '>
            <div className=''>
                <div >
                    <Outlet></Outlet>
                </div>
            </div>

        </div>
    )
}

export default AuthLayout
