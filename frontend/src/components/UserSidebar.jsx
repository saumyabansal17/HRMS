// UserSidebar.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './Sidebar.css';

const UserSidebar = () => {
  const [page1Open, setPage1Open] = useState(false);
  const [page2Open, setPage2Open] = useState(false);
  const [page3Open, setPage3Open] = useState(false);
  const { user } = useContext(UserContext);

  if (!user) {
    return <div>Error: No user data found.</div>;
  }

  return (
    <div className="sidebar">
      <h2>User Dashboard</h2>
      <ul>
        <li>
          <div className="dropdown-heading" onClick={() => setPage1Open(!page1Open)}>Personal Details</div>
          {page1Open && (
            <ul className="dropdown-list">
              <li>
                <Link to={`/udash/employee/${user.id}`}>View Details</Link>
              </li>
              <li>
                <Link to={`/udash/update/${user.id}`}>Edit Details</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <div className="dropdown-heading" onClick={() => setPage2Open(!page2Open)}>Leave</div>
          {page2Open && (
            <ul className="dropdown-list">
              <li>
                <Link to={"/api/leave/request"}>Leave Request</Link>
              </li>
              <li>
                <Link to={"/api/leave/requests"}>Request Status</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <div className="dropdown-heading" onClick={() => setPage3Open(!page3Open)}>Attendance</div>
          {page3Open && (
            <ul className="dropdown-list">
              <li>
                <Link to={`/api/attendance/view`}>View Attendance</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
