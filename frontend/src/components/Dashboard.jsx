// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Navbar from './Navbar';
// import UserSidebar from './UserSidebar';
// import AdminSidebar from './AdminSidebar';
// import './Dashboard.css';

// const Dashboard = ({ children, role }) => {
//   return (
//     <div className="dashboard-layout">
//       <div className="main-container">
//         {role === 'admin' ? <AdminSidebar /> : <UserSidebar />}
//         <div className="content">
//           <Navbar />
//           {children}
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import UserSidebar from './UserSidebar';
import AdminSidebar from './AdminSidebar';
import './Dashboard.css';

const Dashboard = ({ children, role }) => {
  // Retrieve userData from location state
  const userData = children.props?.location?.state?.userData;

  return (
    <div className="dashboard-layout">
      <div className="main-container">
        {role === 'admin' ? <AdminSidebar userData={userData} /> : <UserSidebar userData={userData} />}
        <div className="content">
          <Navbar />
          {children}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

