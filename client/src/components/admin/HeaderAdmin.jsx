import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import usesechandStore from "../../store/sechand-store";

const HeaderAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const logout = usesechandStore((s) => s.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-[#2D336B] to-[#7886C7] h-16 flex items-center justify-between px-6 shadow-md border-b border-[#A9B5DF]">
      {/* Title */}
      <div className="text-2xl font-bold text-[#FFFFFF]">Admin Panel</div>

      {/* Welcome Message */}
      <div className="text-lg text-[#FFFFFF] mx-auto">Welcome, Admin!</div>

      {/* User Profile and Current Time */}
      <div className="flex items-center gap-4">
        <div className="text-sm text-[#FFFFFF]">{currentTime}</div>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 bg-[#7886C7] px-4 py-2 rounded-lg text-[#2D336B] hover:bg-[#A9B5DF] transition duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 48 48" viewBox="0 0 48 48" id="profile" className="w-10 h-10">
              <path id="Layer_1" d="M24,6C14.1,6,6,14.1,6,24s8.1,18,18,18s18-8.1,18-18S33.9,6,24,6z M24,13c2.2,0,4,1.8,4,4c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4C20,14.8,21.8,13,24,13z M14,34c0-5.5,4.5-10,10-10c5.5,0,10,4.5,10,10H14z"></path>
            </svg>
            <ChevronDown />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-14 right-0 bg-white shadow-lg rounded-lg w-40 border border-[#A9B5DF]">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-sm text-[#2D336B] text-left hover:bg-[#A9B5DF] hover:text-[#FFFFFF] rounded-md transition duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
