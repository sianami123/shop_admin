import { useNavigate, useLocation } from "react-router";
import {
  ShoppingCart,
  Package,
  Users,
  ClipboardList,
  User,
  LogOut,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      title: "Products",
      path: "/products",
      icon: <ShoppingCart size={20} />,
      section: "main",
    },
    {
      title: "Inventory",
      path: "/inventory",
      icon: <Package size={20} />,
      section: "main",
    },
    {
      title: "Users",
      path: "/users",
      icon: <Users size={20} />,
      section: "main",
    },
    {
      title: "Orders",
      path: "/orders",
      icon: <ClipboardList size={20} />,
      section: "main",
    },
    {
      title: "Profile",
      path: "/profile",
      icon: <User size={20} />,
      section: "account",
    },
    {
      title: "Logout",
      path: "/logout",
      icon: <LogOut size={20} />,
      section: "account",
    },
  ];

  return (
    <div
      className={`h-full bg-slate-800 flex flex-col items-center gap-6 p-5 relative transition-all duration-300 ${
        isCollapsed ? "w-22" : "w-42"
      }`}
    >
      <div className="absolute top-5 right-[-12px] z-10">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="bg-slate-700 text-slate-300 hover:text-white p-1 rounded-full"
        >
          {isCollapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>
      <div className="mt-2 mb-10">
        <img
          src="https://maktabsharif.ir/wp-content/uploads/2024/07/logo-profile-600x600.jpg"
          alt="maktabsharif"
          className="w-12 h-12 rounded-full border-2 border-white"
        />
      </div>
      <nav className="flex flex-col items-center gap-6 w-full">
        <div className="w-full">
          <ul className="flex flex-col gap-1 w-full">
            {menuItems
              .filter((item) => item.section === "main")
              .map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group
                      ${
                        pathName === item.path
                          ? "text-white bg-slate-700"
                          : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                      }`}
                  >
                    <span className="flex items-center justify-center">
                      {item.icon}
                    </span>
                    {!isCollapsed && <span>{item.title}</span>}
                    {!isCollapsed && (
                      <ChevronRight
                        size={16}
                        className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${
                          pathName === item.path ? "opacity-100" : ""
                        }`}
                      />
                    )}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </nav>
      {/* Account Section */}
      <div className="mt-auto w-full">
        {!isCollapsed && (
          <div className="text-slate-400 text-xs font-medium px-2 mb-2 uppercase tracking-wider">
            Account
          </div>
        )}
        <ul className="flex flex-col gap-1 w-full">
          {menuItems
            .filter((item) => item.section === "account")
            .map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group
                      ${
                        pathName === item.path
                          ? "text-white bg-slate-700"
                          : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                      }`}
                >
                  <span className="flex items-center justify-center">
                    {item.icon}
                  </span>
                  {!isCollapsed && <span>{item.title}</span>}
                  {!isCollapsed && (
                    <ChevronRight
                      size={16}
                      className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${
                        pathName === item.path ? "opacity-100" : ""
                      }`}
                    />
                  )}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
