// src/components/AdminMarkAttendance.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

const MarkAttendance = () => {
    const { user } = useContext(UserContext);
    const [date, setDate] = useState('');
    const [users, setUsers] = useState([]);
    const [attendances, setAttendances] = useState([]);

    useEffect(() => {
        if (user && user.role === 'admin') {
            axios.get('http://localhost:3001/api/users')
                .then(response => {
                    setUsers(response.data.data);
                    setAttendances(response.data.data.map(u => ({ userId: u._id, status: 'Absent', leaveType: 'None' })));
                })
                .catch(error => console.error(error));
        }
    }, [user]);

    const handleAttendanceChange = (userId, field, value) => {
        setAttendances(prev => 
            prev.map(att => att.userId === userId ? { ...att, [field]: value } : att)
        );
    };

    const handleSubmit = () => {
        axios.post('http://localhost:3001/api/attendance/mark', { date, attendances })
            .then(response => alert('Attendance marked successfully!'))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Mark Attendance</h2>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Leave Type</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>
                                <select
                                    value={attendances.find(att => att.userId === user._id).status}
                                    onChange={e => handleAttendanceChange(user._id, 'status', e.target.value)}
                                >
                                    <option value="Present">Present</option>
                                    <option value="Absent">Absent</option>
                                    <option value="Leave">Leave</option>
                                </select>
                            </td>
                            <td>
                                <select
                                    value={attendances.find(att => att.userId === user._id).leaveType}
                                    onChange={e => handleAttendanceChange(user._id, 'leaveType', e.target.value)}
                                    disabled={attendances.find(att => att.userId === user._id).status !== 'Leave'}
                                >
                                    <option value="None">None</option>
                                    <option value="Sick">Sick</option>
                                    <option value="Casual">Casual</option>
                                    <option value="Paid">Paid</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default MarkAttendance;
