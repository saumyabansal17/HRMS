import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Feature1 = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [designation, setDesignation] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [department, setDepartment] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const userData = {
      name,
      email,
      password,
      designation,
      contactNo,
      address,
      dob,
      department,
      bloodGroup
    };

    axios.post('http://localhost:3001/addemp', userData)
      .then(res => {
        navigate('/');
      })
      .catch(err => {
        setError(err.response.data.error);
      });
  };

  return (
    <div className="form-containers">
      <h2>Add Employee</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="designation">Designation:</label>
          <input
            type="text"
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNo">Contact No:</label>
          <input
            type="text"
            id="contactNo"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />
        </div>
        <div className="form-group full-width">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bloodGroup">Blood Group:</label>
          <input
            type="text"
            id="bloodGroup"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          />
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default Feature1;
