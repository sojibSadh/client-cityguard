import React from 'react'
import img from '../assets/logo.png'


function Logo() {
  return (
    <div className='flex items-end'>
        <img src={img} alt="logo name" />
        <h3 className='text-2xl font-bold -ms-3'>ZapShift</h3>
    </div>
  )
}

export default Logo
