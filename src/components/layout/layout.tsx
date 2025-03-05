import { useEffect } from "react";
import Sidebar from "./sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

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
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default Layout;
