import React, { useState } from "react";

const AvatarWithMenu = ({lastName, email, onSignOut,toggleMenuOpen,menuOpen }) => {

  const getInitials = (lastName) => {
    return lastName ? lastName[0].toUpperCase() : "";
  };

  return (
    <div className="relative inline-block">
      {/* Avatar */}
      <div
        onClick={toggleMenuOpen}
        className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white text-lg font-bold rounded-full cursor-pointer select-none"
      >
        {getInitials(lastName)}
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-14 right-0 bg-white shadow-md rounded-lg z-10">
          <div className="p-2 border-b border-gray-200 text-gray-800 font-medium">
            {lastName} 
          </div>
          <div className="p-2 border-b border-gray-200 text-gray-500 text-sm">
            {email}
          </div>
          <button
            onClick={() => {
              toggleMenuOpen();
              onSignOut();
            }}
            className="w-full p-2 bg-blue-600 text-white rounded-b-lg hover:bg-blue-700"
          >
            Sign Out
          </button>
        </div>
      )}
      {/* Close menu when clicking outside */}
      {menuOpen && (
        <div
          onClick={() => toggleMenuOpen()}
          className="fixed inset-0"
        ></div>
      )}
    </div>
  );
};

export default AvatarWithMenu;
