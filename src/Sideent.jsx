import React from 'react';
import { FaClipboardList } from "react-icons/fa";
import {
  BsGrid1X2Fill,
  BsFillGearFill,
} from 'react-icons/bs';
import { FaTasks } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { TbFileUpload, TbUser } from "react-icons/tb";

function Sideent({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
      style={{
        position: 'fixed', // Fix the sidebar position
        top: 0,           // Start from the top
        left: 0,          // Align it to the left
        height: '100%',   // Full height of the viewport
        width: '250px',   // Sidebar width
        backgroundColor: '#ffffff', // Background color
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', // Optional shadow
        overflowY: 'auto', // Add scroll for overflowing content
        zIndex: 1000,      // Ensure it stays on top
      }}
    >
      <div className='sidebar-title'>
        <div className='sidebar-brand'></div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item' style={{ color: 'black' }}>
          <Link to="/entreprise/create" className="flex items-center">
            <FaClipboardList className='icon mr-2' /> Create Offer
          </Link>
        </li>
        <li className='sidebar-list-item' style={{ color: 'grey' }}>
          <Link to={`/entreprise/edit`} className="flex items-center">
            <FaTasks className='icon mr-2' /> View offers
          </Link>
        </li>
        <li className='sidebar-list-item' style={{ color: 'grey' }}>
          <Link to={'/entreprise/interne'} className="flex items-center">
            <TbFileUpload className='icon mr-2' /> Comptes internes
          </Link>
        </li>
        <li className='sidebar-list-item' style={{ color: 'grey' }}>
          <Link to={`/entreprise/Profile`} className="flex items-center">
            <TbUser className="icon mr-2" /> Profile
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sideent;
