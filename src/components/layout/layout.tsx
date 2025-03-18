import { useEffect, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    // const token = localStorage.getItem("accessToken");
    // if (!token) {
    //   window.location.href = "/login";
    // }
  }, []);

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex-1 overflow-auto">{children || <Outlet />}</div>
    </div>
  );
};

export default Layout;
