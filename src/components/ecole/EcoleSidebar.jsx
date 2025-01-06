import React from 'react';
import { FaClipboardList } from "react-icons/fa";
import {
  BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill,
  BsMenuButtonWideFill, BsFillGearFill
} from 'react-icons/bs';
import { PiStudent } from "react-icons/pi";
import { FaTachometerAlt, FaComment, FaTasks } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { TbFileUpload, TbUser  } from "react-icons/tb";




function EcoleSidebar({ openSidebarToggle, OpenSidebar }) {
 
  const email = useParams();
  console.log("Email value in Sidebar:", email.email);

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
       
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item flex items-center' style={{color: 'grey'}}>
         
            <BsGrid1X2Fill className='icon mr-2' /> Dashboard
         
        </li>
       
        <li className='sidebar-list-item' style={{color: 'black'}}>
         
            <Link to="/ecole/etudiants" className="flex items-center">
            <FaClipboardList  className='icon mr-2' /> Etudiants
            </Link>
          
        </li>
        <li className='sidebar-list-item ' style={{color: 'grey'}}>
          <Link to={`/ecole/entreprises`} className="flex items-center">
            <FaTasks className='icon mr-2' /> Entreprises
          </Link>
        </li>
        <li className='sidebar-list-item' style={{color: 'black'}}>
          
          <Link to={'/ecole/statistics'} className="flex items-center">
            <FaComment className='icon mr-2' /> Statistics
          </Link>
          
        </li>
        <li className='sidebar-list-item ' style={{color: 'grey'}} >
          
          <Link to ={`/ecole/conventions`} className="flex items-center">
          <TbFileUpload className='icon mr-2'/> Conventions
          
          </Link>
          
        </li>
        <li className='sidebar-list-item ' style={{color: 'grey'}}>
          
          <Link to ={`/student/Profile`} className="flex items-center">
          <TbUser className="icon mr-2" /> Profile
          
          </Link>
          
        </li>
      </ul>
    </aside>
  );
}

export default EcoleSidebar;
