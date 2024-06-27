import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const AdminSidebar = () => {
  const [page1Open, setPage1Open] = useState(false);
  const [page2Open, setPage2Open] = useState(false);

  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <div className="dropdown-heading" onClick={() => setPage1Open(!page1Open)}>Manage Employee</div>
          {page1Open && (
            <ul className="dropdown-list">
              <li>
                <Link to="/addemp">Add Employee</Link>
              </li>
              <li>
                <Link to="/editemp">Edit Employee</Link>
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

export default AdminSidebar;
