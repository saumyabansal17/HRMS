import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import './AdminDashboard.css';


const UserDashboard = () => {
  const { user } = useContext(UserContext);
  return (
    <>{user && (
      <div className="welcome-box">
        <h2>Welcome, {user.name}</h2>
      </div>
    )}</>
  )
}

export default UserDashboard