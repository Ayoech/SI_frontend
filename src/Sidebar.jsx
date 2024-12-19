import React from 'react';
import { FaClipboardList } from "react-icons/fa";
import {
  BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill,
  BsMenuButtonWideFill, BsFillGearFill
} from 'react-icons/bs';
import { PiStudent } from "react-icons/pi";
import { FaTachometerAlt, FaComment, FaTasks } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { TbFileUpload } from "react-icons/tb";
import logo from '/logo.png';




function Sidebar({ openSidebarToggle, OpenSidebar }) {
 
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
        <li className='sidebar-list-item' style={{color: 'grey'}}>
         
            <BsGrid1X2Fill className='icon' /> Dashboard
         
        </li>
        <li className='sidebar-list-item' style={{color: 'grey'}}>
          <Link to={`/gettasks/${email.email}`}>
            <FaTasks className='icon' /> Resume
          </Link>
        </li>
        <li className='sidebar-list-item' style={{color: 'black'}}>
         
            <Link to="/progress">
            <FaClipboardList  className='icon' /> Offers
            </Link>
          
        </li>
        <li className='sidebar-list-item' style={{color: 'black'}}>
          
          <Link to={`/assignedFeedback/${email.email}`}>
            <FaComment className='icon' /> Feedback
          </Link>
          
        </li>
        <li className='sidebar-list-item' style={{color: 'grey'}}>
          
          <Link to ={`/files/${email.email}`}>
          <TbFileUpload className='icon'/> Files
          
          </Link>
          
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
