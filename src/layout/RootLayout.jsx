import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../pages/Shared/NavBar/NavBar'
import Footer from '../pages/Shared/Footer/Footer'

function RootLayout() {
  return (
    <div className='max-w-[1400px] mx-auto'>
      <NavBar/>
      <Outlet/>
     <Footer/>
    </div>
  )
}

export default RootLayout
