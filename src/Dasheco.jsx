import React from 'react'
import Header from './Header'
import Sideeco from './Sideeco'
import Homy from './Homy'
import { useState } from 'react'
import EcoleSidebar from './components/ecole/EcoleSidebar'

export default function Dashboard() {
const [openSidebarToggle, setOpenSidebarToggle] = useState(true)

const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
}
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <EcoleSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Homy />
    </div>
  )
}

   
