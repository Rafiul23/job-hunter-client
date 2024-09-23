'use client';
import AdminSideBar from "@/Components/AdminSideBar/AdminSideBar";
import UserSideBar from "@/Components/UserSideBar/UserSideBar";
import useAdmin from "@/hooks/useAdmin";




const Layout = ({ children }) => {

  const isAdmin = useAdmin();

  return (
    <div className="grid md:grid-cols-4 grid-cols-1 gap-4 my-1">
      {isAdmin ? <AdminSideBar></AdminSideBar> : <UserSideBar></UserSideBar>}
      <div className="col-span-3">{children}</div>
    </div>
  );
};

export default Layout;
