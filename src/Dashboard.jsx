import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Homy from './Homy'
import { useState } from 'react'

export default function Dashboard() {
const [openSidebarToggle, setOpenSidebarToggle] = useState(true)

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

   
