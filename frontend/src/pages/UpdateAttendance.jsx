// src/components/AdminUpdateAttendance.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import './UpdateAttendance.css';

const UpdateAttendance = () => {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('Absent');
    const [leaveType, setLeaveType] = useState('None');

    useEffect(() => {
        if (user && user.role === 'admin') {
            axios.get('http://localhost:3001/api/users')
                .then(response => setUsers(response.data.data))
                .catch(error => console.error(error));
        }
    }, [user]);

    const handleSubmit = () => {
        axios.put(`http://localhost:3001/api/attendance/update/${selectedUser}`, { date, status, leaveType })
            .then(response => alert('Attendance updated successfully!'))
            .catch(error => console.error(error));
    };

    return (
        <div className="update-attendance-container">
            <h2 className="update-attendance-header">Update Attendance</h2>
            <select 
                className="update-attendance-select" 
                value={selectedUser} 
                onChange={e => setSelectedUser(e.target.value)}
            >
                <option value="" disabled>Select User</option>
                {users.map(user => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                ))}
            </select>
            <input 
                type="date" 
                className="update-attendance-date" 
                value={date} 
                onChange={e => setDate(e.target.value)} 
            />
            <select 
                className="update-attendance-status" 
                value={status} 
                onChange={e => setStatus(e.target.value)}
            >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Leave">Leave</option>
            </select>
            <select 
                className="update-attendance-leave" 
                value={leaveType} 
                onChange={e => setLeaveType(e.target.value)} 
                disabled={status !== 'Leave'}
            >
                <option value="None">None</option>
                <option value="Sick">Sick</option>
                <option value="Casual">Casual</option>
                <option value="Paid">Paid</option>
            </select>
            <button 
                className="update-attendance-button" 
                onClick={handleSubmit}
            >
                Update
            </button>
        </div>
    );
};

export default UpdateAttendance;
