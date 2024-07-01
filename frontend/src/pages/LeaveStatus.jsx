// src/components/LeaveStatus.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import './LeaveStatus.css';

const LeaveStatus = () => {
  const { user } = useContext(UserContext);
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3001/api/leave/requests`, { withCredentials: true })
        .then(response => {
          setLeaveRequests(response.data);
        })
        .catch(error => {
          console.error('Error fetching leave requests:', error);
        });
    }
  }, [user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="leave-status-container">
      <h2 className="leave-status-header">Your Leave Requests</h2>
      <ul className="leave-status-list">
        {leaveRequests.map(request => (
          <li key={request._id} className="leave-status-item">
            <p>Start Date: {formatDate(request.startDate)}</p>
            <p>End Date: {formatDate(request.endDate)}</p>
            <p>Reason: {request.reason}</p>
            <p>Status: {request.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveStatus;
