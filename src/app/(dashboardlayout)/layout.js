"use client";
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar.jsx';
import RecruiterSideBar from "../../components/RecruiterSideBar/RecruiterSideBar.jsx";
import UserSideBar from "../../components/UserSideBar/UserSideBar.jsx";
import useAdmin from "@/hooks/useAdmin";
import AuthProvider from "@/Providers/AuthProvider";

const Layout = ({ children }) => {
  const { isAdmin, loading, isRecruiter } = useAdmin();

  if (loading) {
    return <progress className="progress progress-success w-56"></progress>;
  } else {
    return (
      <div className="grid md:grid-cols-4 grid-cols-1 gap-2 my-1">
        {isAdmin ? (
          <AdminSideBar></AdminSideBar>
        ) : isRecruiter ? (
          <RecruiterSideBar />
        ) : (
          <UserSideBar></UserSideBar>
        )}
        <div className="col-span-3">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </div>
    );
  }
};

export default Layout;
