// src/components/ReviewLeave.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReviewLeave.css';

const ReviewLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/leave/requests/pending', { withCredentials: true })
      .then(response => {
        setLeaveRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching leave requests:', error);
      });
  }, []);

  const handleApprove = (requestId) => {
    updateLeaveRequestStatus(requestId, 'Approved');
  };

  const handleReject = (requestId) => {
    updateLeaveRequestStatus(requestId, 'Rejected');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const updateLeaveRequestStatus = (requestId, status) => {
    axios.put(`http://localhost:3001/api/leave/manage/${requestId}`, { status }, { withCredentials: true })
      .then(response => {
        alert(`Leave request ${status.toLowerCase()} successfully`);
        // Optionally update local state or reload data
        // For simplicity, you can reload the entire list
        axios.get('http://localhost:3001/api/leave/requests/pending', { withCredentials: true })
          .then(response => {
            setLeaveRequests(response.data);
          })
          .catch(error => {
            console.error('Error fetching leave requests:', error);
          });
      })
      .catch(error => {
        console.error('Error updating leave request:', error);
        alert(`Failed to ${status.toLowerCase()} leave request`);
      });
  };

  return (
    <div className="review-leave-container">
      <h2 className="review-leave-header">Leave Requests to Approve/Reject</h2>
      <ul className="review-leave-list">
        {leaveRequests.map(request => (
          <li key={request._id} className="review-leave-item">
            <p className="username">Username: {request.username}</p>
            <p>Start Date: {formatDate(request.startDate)}</p>
            <p>End Date: {formatDate(request.endDate)}</p>
            <p>Reason: {request.reason}</p>
            <p className="status">Status: {request.status}</p>
            <div className="review-leave-buttons">
              <button className="review-leave-button approve" onClick={() => handleApprove(request._id)}>Approve</button>
              <button className="review-leave-button reject" onClick={() => handleReject(request._id)}>Reject</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewLeave;
