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




function Sideent({ openSidebarToggle, OpenSidebar }) {
 
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
        
       
        <li className='sidebar-list-item' style={{color: 'black'}}>
         
            <Link to="/ecole/sign" className="flex items-center">
            <FaClipboardList  className='icon mr-2' /> Inscrire Etudiant
            </Link>
          
        </li>
        <li className='sidebar-list-item ' style={{color: 'grey'}}>
          <Link to={`/student/postulations`} className="flex items-center">
            <FaTasks className='icon mr-2' /> Conventions 
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

export default Sideent;
