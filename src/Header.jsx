import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'

function Header({OpenSidebar}) {
  return (
    <header className='header1'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div className='header-right flex justify-between'>
            <BsFillBellFill className='icon mr-4'/>
            <BsFillEnvelopeFill className='icon mr-4'/>
            <BsPersonCircle className='icon mr-4'/>
        </div>
    </header>
  )
}

export default Header