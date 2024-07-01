// src/components/AdminSetSalary.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import './SetSalary.css';

const SetSalary = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [baseSalary, setBaseSalary] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [deductions, setDeductions] = useState(0);

  useEffect(() => {
    if (user && user.role === 'admin') {
      axios.get('http://localhost:3001/api/users', { withCredentials: true })
        .then(response => setUsers(response.data.data))
        .catch(error => console.error(error));
    }
  }, [user]);

  const handleSubmit = () => {
    axios.post('http://localhost:3001/api/salary/set', {
      userId: selectedUser,
      baseSalary,
      bonus,
      deductions
    })
      .then(response => alert('Salary updated successfully!'))
      .catch(error => console.error(error));
  };

  return (
    <div className="setsalary-container">
      <h2 className="setsalary-header">Set Salary</h2>
      <div className="setsalary-form">
        <div className="form-group">
          <label htmlFor="userSelect">Select User:</label>
          <select id="userSelect" value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
            <option value="" disabled>Select User</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="baseSalary">Base Salary:</label>
          <input
            type="number"
            id="baseSalary"
            placeholder="Base Salary"
            value={baseSalary}
            onChange={e => setBaseSalary(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bonus">Bonus:</label>
          <input
            type="number"
            id="bonus"
            placeholder="Bonus"
            value={bonus}
            onChange={e => setBonus(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deductions">Deductions:</label>
          <input
            type="number"
            id="deductions"
            placeholder="Deductions"
            value={deductions}
            onChange={e => setDeductions(Number(e.target.value))}
          />
        </div>
        <button className="setsalary-button" onClick={handleSubmit}>Set Salary</button>
      </div>
    </div>
  );
};

export default SetSalary;
