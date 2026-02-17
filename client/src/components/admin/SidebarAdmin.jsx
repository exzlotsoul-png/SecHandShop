import React from "react";
import { NavLink } from "react-router-dom";
import {
  UserCog,
  SquareChartGantt,
  ShoppingBasket,
  ListOrdered,
} from "lucide-react";

const SidebarAdmin = () => {
  return (
    <div className="w-72 h-screen bg-gradient-to-b from-[#2D336B] to-[#7886C7] text-white shadow-xl border-r border-[#A9B5DF]">
      {/* Header */}
      <div className="h-24 flex items-center justify-center text-3xl font-extrabold text-[#FFFFFF] tracking-wide bg-[#2D336B] shadow-md">
        Admin Panel
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-8 space-y-3">
        {[
          { to: "manage", icon: <UserCog />, label: "Manage" },
          { to: "category", icon: <SquareChartGantt />, label: "Category" },
          { to: "product", icon: <ShoppingBasket />, label: "Product" },
          { to: "orders", icon: <ListOrdered />, label: "Orders" },
        ].map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${
                isActive
                  ? "bg-[#2D336B] text-[#FFFFFF] shadow-md scale-105"
                  : "text-[#FFFFFF] hover:bg-[#A9B5DF] hover:text-[#2D336B] hover:shadow-md"
              }`
            }
          >
            <span className="w-6 h-6">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default SidebarAdmin;
