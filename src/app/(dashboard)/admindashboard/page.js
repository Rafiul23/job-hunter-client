import React from "react";

const AdminDashboard = () => {
  return (
    <div className="grid md:grid-cols-4 grid-cols-1 gap-6 my-4">
      <div className="col-span-1 bg-[#033f63] h-[600px] w-full text-center text-white">
        <div className="grid grid-cols-1 gap-5 mt-4">
          <button>Admin Profile</button>
          <hr />
          <button>Edit Admin Profile</button>
          <hr />
          <button>Manage Users</button>
          <hr />
          <button>Add Job</button>
          <hr />
          <button>Manage Jobs</button>
          <hr />
          <button>Home</button>
          <hr />
        </div>
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};

export default AdminDashboard;
