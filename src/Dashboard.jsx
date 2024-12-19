import React from 'react'
import './App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Homy from './Homy'
import { useState } from 'react'

export default function Dashboard() {
const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
}
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Homy />
    </div>
  )
}

   
