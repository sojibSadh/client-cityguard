import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../pages/Shared/NavBar/NavBar'
import Footer from '../pages/Shared/Footer/Footer'
import useAuth from '../hooks/useAuth'
import { Bars } from 'react-loader-spinner'

function RootLayout() {
  const { loading } = useAuth();

  if (loading) {
    return <div className='flex justify-center items-center h-screen'><Bars
      height="40"
      width="40"
      color="#4fa94d"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    /></div>
  }

  return (
    <div className='max-w-[1400px] mx-auto'>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default RootLayout
