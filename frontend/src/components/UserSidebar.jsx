// UserSidebar.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './Sidebar.css';

const UserSidebar = () => {
  const [page1Open, setPage1Open] = useState(false);
  const [page2Open, setPage2Open] = useState(false);
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
          <div className="dropdown-heading" onClick={() => setPage2Open(!page2Open)}>Page2</div>
          {page2Open && (
            <ul className="dropdown-list">
              <li>
                <Link to="/page2/feature3">Feature 3</Link>
              </li>
              <li>
                <Link to="/page2/feature4">Feature 4</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
