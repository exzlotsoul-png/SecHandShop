import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import usesechandStore from "../store/sechand-store";
import { ChevronDown, ShoppingCart, Home, ShoppingBag } from "lucide-react";

function MainNav() {
  // Javascript
  const carts = usesechandStore((s) => s.carts);
  const user = usesechandStore((s) => s.user);
  const logout = usesechandStore((s) => s.logout);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#ede7dc] shadow-md">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to={"/"} className="flex items-center gap-2">
              <img
                src="/LOGOSHOP.jpg"
                alt="Logo"
                className="w-12 h-12 rounded-full"
              />
              <span className="text-2xl font-bold text-[#636260]">
                ร้านขายเสื้อผ้ามือสอง
              </span>
            </Link>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-[#ccafa5] px-3 py-2 rounded-md text-sm font-medium text-center text-[#ede7dc]"
                  : "hover:bg-[#dcd2cc] px-3 py-2 rounded-md text-sm font-medium text-center text-[#636260]"
              }
              to={"/"}
            >
              <div className="flex flex-col items-center">
                <Home className="w-5 h-5 mb-1 text-[#636260]" />
                หน้าหลัก
              </div>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-[#ccafa5] px-3 py-2 rounded-md text-sm font-medium text-center text-[#ede7dc]"
                  : "hover:bg-[#dcd2cc] px-3 py-2 rounded-md text-sm font-medium text-center text-[#636260]"
              }
              to={"/shop"}
            >
              <div className="flex flex-col items-center">
                <ShoppingBag className="w-5 h-5 mb-1 text-[#636260]" />
                สินค้า
              </div>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-[#ccafa5] px-3 py-2 rounded-md text-sm font-medium text-center text-[#ede7dc]"
                  : "hover:bg-[#dcd2cc] px-3 py-2 rounded-md text-sm font-medium text-center text-[#636260]"
              }
              to={"/cart"}
            >
              <div className="flex flex-col items-center">
                <ShoppingCart className="w-5 h-5 mb-1 text-[#636260]" />
                ตะกร้า
              </div>
              {carts.length > 0 && (
                <span className="absolute top-0 bg-red-500 rounded-full px-2 text-[#ede7dc]">
                  {carts.length}
                </span>
              )}
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-[#ccafa5] px-3 py-2 rounded-md text-sm font-medium text-center text-[#ede7dc]"
                  : "hover:bg-[#dcd2cc] px-3 py-2 rounded-md text-sm font-medium text-center text-[#636260]"
              }
              to={"/about"}
            >
              <div className="flex flex-col items-center w-auto">
                <span className="text-ellipsis overflow-hidden whitespace-nowrap text-[#636260]">
                  เกี่ยวกับเรา
                </span>
              </div>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-[#ccafa5] px-3 py-2 rounded-md text-sm font-medium text-center text-[#ede7dc]"
                  : "hover:bg-[#dcd2cc] px-3 py-2 rounded-md text-sm font-medium text-center text-[#636260]"
              }
              to={"/contact"}
            >
              <div className="flex flex-col items-center w-auto">
                <span className="text-ellipsis overflow-hidden whitespace-nowrap text-[#636260]">
                  ติดต่อเรา
                </span>
              </div>
            </NavLink>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 hover:bg-[#dcd2cc] px-2 py-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 48 48"
                  viewBox="0 0 48 48"
                  id="profile"
                  className="w-10 h-10"
                >
                  <path
                    id="Layer_1"
                    d="M24,6C14.1,6,6,14.1,6,24s8.1,18,18,18s18-8.1,18-18S33.9,6,24,6z M24,13c2.2,0,4,1.8,4,4c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4C20,14.8,21.8,13,24,13z M14,34c0-5.5,4.5-10,10-10c5.5,0,10,4.5,10,10H14z"
                  ></path>
                </svg>
                <ChevronDown className="text-[#636260]" />
              </button>

              {isOpen && (
                <div className="absolute top-16 bg-white shadow-md z-50">
                  <Link
                    to={"/user/history"}
                    className="block px-4 py-2 hover:bg-[#dcd2cc] text-black"
                  >
                    ประวัติ
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="block px-4 py-2 hover:bg-[#dcd2cc] text-black"
                  >
                    ล็อกเอ้าท์
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#ccafa5] px-3 py-2 rounded-md text-sm font-medium text-[#ede7dc]"
                    : "hover:bg-[#dcd2cc] px-3 py-2 rounded-md text-sm font-medium text-[#636260]"
                }
                to={"/register"}
              >
                สมัครสมาชิก
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#ccafa5] px-3 py-2 rounded-md text-sm font-medium text-[#ede7dc]"
                    : "hover:bg-[#dcd2cc] px-3 py-2 rounded-md text-sm font-medium text-[#636260]"
                }
                to={"/login"}
              >
                เข้าสู่ระบบ
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
