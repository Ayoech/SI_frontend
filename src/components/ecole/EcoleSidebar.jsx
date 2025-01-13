import React from 'react';
import { FaClipboardList } from "react-icons/fa";
import { FaTasks, FaComment } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { TbFileUpload } from "react-icons/tb";

function EcoleSidebar({ openSidebarToggle, OpenSidebar }) {
  const email = useParams();
  console.log("Email value in Sidebar:", email.email);

  return (
    <aside
      id="sidebar"
      className={`fixed top-0 left-0 h-full w-[240px] bg-gray-100 shadow-lg ${openSidebarToggle ? "sidebar-responsive" : ""}`}
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        height: "100vh", // Ensure it takes full viewport height
        overflowY: "auto", // Allow scrolling if needed
        zIndex: 1000, // Keep it on top
      }}
    >
      <div
        className="sidebar-title p-4 border-b"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="sidebar-brand font-bold text-lg">
          <Link to="/" className="text-decoration-none text-[#111827]">
            Ecole Dashboard
          </Link>
        </div>
        <span
          className="icon close_icon cursor-pointer"
          onClick={OpenSidebar}
          style={{ fontSize: "1.2rem", color: "#6b7280" }}
        >
          X
        </span>
      </div>

      <ul className="sidebar-list mt-4" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li className="sidebar-list-item p-3 hover:bg-gray-200">
          <Link
            to="/ecole/etudiants"
            className="flex items-center text-decoration-none text-[#111827]"
          >
            <FaClipboardList className="mr-2" />
            Etudiants
          </Link>
        </li>
        <li className="sidebar-list-item p-3 hover:bg-gray-200">
          <Link
            to="/ecole/entreprises"
            className="flex items-center text-decoration-none text-[#111827]"
          >
            <FaTasks className="mr-2" />
            Entreprises
          </Link>
        </li>
        <li className="sidebar-list-item p-3 hover:bg-gray-200">
          <Link
            to="/ecole/statistics"
            className="flex items-center text-decoration-none text-[#111827]"
          >
            <FaComment className="mr-2" />
            Statistics
          </Link>
        </li>
        <li className="sidebar-list-item p-3 hover:bg-gray-200">
          <Link
            to="/ecole/conventions"
            className="flex items-center text-decoration-none text-[#111827]"
          >
            <TbFileUpload className="mr-2" />
            Conventions
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default EcoleSidebar;
