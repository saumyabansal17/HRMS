// src/components/ViewSalary.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import './ViewSalary.css';

const ViewSalary = () => {
  const { user } = useContext(UserContext);
  const [salary, setSalary] = useState(null);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3001/api/salary/user/${user.id}`, { withCredentials: true })
        .then(response => setSalary(response.data))
        .catch(error => console.error(error));
    }
  }, [user]);

  if (!salary) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="employee-details-container">
      <h1 className="title">Salary</h1>
      <div className="details-card">
      <p><strong>Base Salary: </strong>{salary.baseSalary}</p>
      <p><strong>Bonus: </strong>{salary.bonus}</p>
      <p><strong>Deductions: </strong>{salary.deductions}</p>
      <p><strong>Net Salary: </strong>{salary.netSalary}</p>
    </div>
    </div>
    </>
  );
};

export default ViewSalary;
