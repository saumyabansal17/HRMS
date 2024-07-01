// src/components/LeaveRequest.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import './LeaveRequest.css';

const LeaveRequest = () => {
  const { user } = useContext(UserContext);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/leave/request', {
        username: user.username,
        name: user.name,
        startDate,
        endDate,
        reason,
      }, { withCredentials: true });
      alert('Leave request submitted successfully');
      // Optionally, reset form fields
      setStartDate('');
      setEndDate('');
      setReason('');
    } catch (error) {
      console.error('Error submitting leave request:', error);
      alert('Failed to submit leave request');
    }
  };

  return (
    <form className="leave-request-form" onSubmit={handleSubmit}>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      </div>
      <div>
        <label>Reason:</label>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LeaveRequest;
