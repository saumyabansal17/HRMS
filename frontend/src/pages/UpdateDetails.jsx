import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './UpdateDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const UpdateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [employeeData, setEmployeeData] = useState({
    bloodGroup: '',
    address: '',
    contactNo: '',
    email: '',
  });

  useEffect(() => {
    // Fetch current employee details
    axios.get(`http://localhost:3001/udash/employee/${id}`, { withCredentials: true })
      .then(response => {
        setEmployeeData(response.data);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/udash/update/${id}`, employeeData, { withCredentials: true })
      .then(response => {
        alert('Employee details updated successfully');
        navigate(`/udash/employee/${id}`);
      })
      .catch(error => {
        console.error('Error updating employee data:', error);
        alert('Failed to update employee details');
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='update-details-container'>
      <h2 className='update-details-title'>Edit Details</h2>
      <form onSubmit={handleSubmit} className='update-details-form'>
        <div className='update-details-field'>
          <label className='update-details-label'>Blood Group:</label>
          <input
            type="text"
            name="bloodGroup"
            value={employeeData.bloodGroup}
            onChange={handleChange}
            className='update-details-input'
            required
          />
        </div>
        <div className='update-details-field'>
          <label className='update-details-label'>Address:</label>
          <input
            type="text"
            name="address"
            value={employeeData.address}
            onChange={handleChange}
            className='update-details-input'
            required
          />
        </div>
        <div className='update-details-field'>
          <label className='update-details-label'>Contact No:</label>
          <input
            type="text"
            name="contactNo"
            value={employeeData.contactNo}
            onChange={handleChange}
            className='update-details-input'
            required
          />
        </div>
        <div className='update-details-field'>
          <label className='update-details-label'>Email:</label>
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
            className='update-details-input'
            required
          />
        </div>
        <button type="submit" className='update-details-button'>Update</button>
      </form>
    </div>
  );
};

export default UpdateDetails;
