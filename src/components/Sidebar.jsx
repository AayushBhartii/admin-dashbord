import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineTruck,
  HiOutlineCurrencyDollar,
  HiOutlineGift,
  HiOutlineCog,
  HiOutlineInformationCircle,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi";
import { MdOutlineDining } from "react-icons/md";
import { outletData } from "../data/dummy"; // Update the path as necessary  // Import dummy data

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();
  

  // Main container: dark gray background, white text, smooth width transitions
  const sidebarClasses = `
    ${expanded ? "w-64" : "w-16"}
    flex flex-col
    border-r border-gray-800
    bg-gray-900
    text-white
    transition-all duration-300 ease-in-out overflow-hidden
  `;

  // Top bar behind the "zomato" text: red accent
  const topBarClasses = `
    w-full py-4 px-4
    bg-red-600
    flex flex-col items-start
  `;

  // "Restaurant dashboard" line fade/slide
  const restaurantDashClasses = `
    transition-all duration-300 ease-in-out overflow-hidden
    ${expanded ? "max-h-10 mt-1 opacity-100" : "max-h-0 mt-0 opacity-0"}
  `;

  // Bottom outlet info: slide/fade in/out

  // Nav items helper: icons + label fade
  function navItem(to, Icon, label) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `
            block rounded-md
            ${isActive ? "bg-gray-700 font-semibold" : "font-medium"}
            hover:bg-gray-700
            text-gray-200
            transition-colors duration-200
          `
        }
      >
        <div className={`
          flex items-center
          ${expanded ? 'gap-2 px-3 py-2' : 'justify-center py-2'}
          transition-all duration-300
        `}>
          <Icon size={expanded ? 20 : 22} className="flex-shrink-0" />
          <span
            className={`
              whitespace-nowrap
              transition-all duration-300 ease-in-out
              ${expanded ? "opacity-100 w-auto" : "opacity-0 w-0"}
              overflow-hidden
            `}
          >
            {label}
          </span>
        </div>
      </NavLink>
    );
  }

  return (
    <div className={sidebarClasses}>
      {/* Top bar with brand + toggle, using bg-red-600 */}
      <div className={topBarClasses}>
        <div className="flex items-center justify-between w-full">
          <div className="font-bold text-2xl">{expanded ? "WYF" : "z"}</div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-white focus:outline-none ml-2"
          >
            {expanded ? "<" : ">"}
          </button>
        </div>
        <div className={restaurantDashClasses}>
          <div className="text-sm font-medium">Restaurant dashboard</div>
        </div>
      </div>

      {/* Navigation links (dark theme) */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          <li>{navItem("/", HiOutlineHome, "Dashboard")}</li>
          <li>{navItem("/delivery-menu", HiOutlineTruck, "Takeaway Menu")}</li>
          <li>{navItem("/dine-in-menu", MdOutlineDining, "Dine-In Menu")}</li>
          <li>
            {navItem(
              "/taxes-charges",
              HiOutlineCurrencyDollar,
              "Taxes & Charges"
            )}
          </li>
          <li>{navItem("/offers", HiOutlineGift, "Offers")}</li>
          {/* <li>
            {navItem("/outlet-settings", HiOutlineCog, "Outlet settings")}
          </li> */}

          <li>
            {navItem(
              "/OrderManag",
              HiOutlineQuestionMarkCircle,
              "OrderManagement"
            )}
          </li>

          <li>
            {navItem("/outlet-info", HiOutlineInformationCircle, "Outlet info")}
          </li>
          <li>{navItem("/help", HiOutlineQuestionMarkCircle, "Help")}</li>
        </ul>
      </nav>

      {/* Bottom outlet info (slide/fade) */}
      <div className={`p-4 bg-gray-800 ${!expanded && 'flex justify-center'}`}>
        <div className={`
          transition-all duration-300 ease-in-out
          ${expanded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden w-0'}
        `}>
          <div className="font-semibold">{outletData.name || "Loading..."}</div>
          <div>{outletData.resId ? `RES ID : ${outletData.resId}` : ""}</div>
          <div>{outletData.address}</div>
        </div>
        <button
          className={`
            mt-3 bg-red-600 text-white rounded 
            hover:bg-red-700 transition-colors duration-200
            ${expanded ? 'w-full px-4 py-2' : 'w-20 h-11 p-3'}
            flex items-center justify-center
            ${!expanded && 'mt-0'}
          `}
          onClick={() => navigate("/outlet-settings")}
        >
          {expanded ? (
            "Outlet Management"
          ) : (
            <HiOutlineCog size={20} className="m-auto" />
          )}
        </button>
      </div>
    </div>
  );
}
