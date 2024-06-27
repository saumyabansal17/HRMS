import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EmployeeDetails.css';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/udash/employee/${id}`)
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching employee:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading employee: {error}</div>;
  }

  if (!employee) {
    return <div>No employee found</div>;
  }

  return (
    <div className="employee-details-container">
      <h1 className="title">Employee Details</h1>
      <div className="details-card">
        <p><strong>Username:</strong> {employee.username}</p>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Designation:</strong> {employee.designation}</p>
        <p><strong>Contact No:</strong> {employee.contactNo}</p>
        <p><strong>Address:</strong> {employee.address}</p>
        <p><strong>Date of Birth:</strong> {formatDate(employee.dob)}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Blood Group:</strong> {employee.bloodGroup}</p>
      </div>
    </div>
  );
};

export default EmployeeDetails;
